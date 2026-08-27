/**
 * Shared guard for the public forms: a Turnstile check plus a per-IP throttle.
 *
 * Server-only — it reads the service-role key and the Turnstile secret, so it
 * must never be imported from a route file or a component. Server functions
 * pull it in with a dynamic import inside their handler, the same way the repo
 * already loads client.server.ts.
 */
import { getRequest } from "@tanstack/react-start/server";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type GuardScope = "contact" | "application" | "newsletter";

/** Attempts allowed from one IP, per scope. */
const LIMITS: Record<GuardScope, { perHour: number; perDay: number }> = {
  contact: { perHour: 5, perDay: 20 },
  application: { perHour: 5, perDay: 15 },
  newsletter: { perHour: 3, perDay: 10 },
};

/** Thrown for anything the visitor should see verbatim. */
export class GuardError extends Error {}

/**
 * The client IP, as the edge saw it.
 *
 * cf-connecting-ip is set by Cloudflare and cannot be spoofed by the client;
 * x-forwarded-for can be, so its first entry is only a fallback for other
 * hosts. An unknown IP is treated as one shared subject rather than waved
 * through, so a proxy that hides it throttles as a group instead of not at all.
 */
export function clientIp(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const real = headers.get("x-real-ip");
  if (real) return real.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

/**
 * A stable, non-reversible subject for the throttle ledger.
 *
 * The pepper makes the digest useless to anyone who only has the table: without
 * it an IP can be recovered from a hash by brute force, since the address space
 * is small. Falls back to an unpeppered digest with a warning rather than
 * failing, so a missing secret degrades privacy but never availability.
 */
export async function throttleSubject(ip: string): Promise<string> {
  const pepper = process.env.THROTTLE_IP_PEPPER;
  if (!pepper) {
    console.warn("THROTTLE_IP_PEPPER is not set — throttle subjects are unpeppered");
  }
  const data = new TextEncoder().encode(`${pepper ?? ""}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type TurnstileResult = { success: boolean; "error-codes"?: string[] };

/**
 * Verifies a Turnstile token with Cloudflare.
 *
 * With no secret configured this logs and passes: the site has to keep working
 * before Turnstile is set up, and the per-IP throttle below still applies. Once
 * TURNSTILE_SECRET_KEY is set, a missing or rejected token is fatal.
 */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY is not set — skipping captcha verification");
    return;
  }

  if (!token) {
    throw new GuardError("Please complete the verification challenge and try again.");
  }

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip !== "unknown") body.append("remoteip", ip);

  let result: TurnstileResult;
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    result = (await response.json()) as TurnstileResult;
  } catch (error) {
    // Cloudflare being unreachable must not silently open the door.
    console.error("Turnstile verification could not be reached", error);
    throw new GuardError("We could not verify your request just now. Please try again shortly.");
  }

  if (!result.success) {
    console.warn("Turnstile rejected a submission", result["error-codes"]);
    throw new GuardError("Verification failed. Please refresh the page and try again.");
  }
}

/**
 * Runs both checks for one submission. Throws GuardError with a message meant
 * for the visitor; anything else is an unexpected fault.
 */
export async function guardPublicSubmission(
  scope: GuardScope,
  turnstileToken: string | undefined,
): Promise<void> {
  const ip = clientIp(getRequest().headers);
  await verifyTurnstile(turnstileToken, ip);

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { perHour, perDay } = LIMITS[scope];
  // `as never`: src/integrations/supabase/types.ts is generated and predates
  // this function, the same reason the CMS queries cast their table names.
  const { data, error } = await supabaseAdmin.rpc(
    "register_throttle_hit" as never,
    {
      _scope: scope,
      _subject: await throttleSubject(ip),
      _per_hour: perHour,
      _per_day: perDay,
    } as never,
  );

  if (error) {
    // Failing closed here would take the forms down with the database; the
    // per-address triggers and the captcha still stand.
    console.error("Throttle check failed, allowing the request", error.message);
    return;
  }

  if (data === false) {
    throw new GuardError(
      "You have made several submissions recently. Please try again a little later.",
    );
  }
}
