import { createServerFn } from "@tanstack/react-start";

/**
 * Submission endpoints for the public forms.
 *
 * These exist so the writes pass through something that can see the client IP.
 * Each one verifies a Turnstile token, records a per-IP attempt, then writes
 * with the service role — anon lost its INSERT grant in the migration that
 * introduced this, so the browser cannot reach these tables any other way.
 *
 * Everything server-only is behind a dynamic import inside the handler: this
 * module ships to the client bundle, so a top-level import of the service-role
 * client or the Turnstile secret would leak them.
 */

const str = (value: unknown, max = 2000) =>
  String(value ?? "")
    .trim()
    .slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  department?: string;
  message: string;
  turnstileToken?: string;
  /** Honeypot; a filled one means a bot. */
  website?: string;
};

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => {
    const name = str(input?.name, 200);
    const email = str(input?.email, 320);
    const message = str(input?.message, 5000);
    if (!name || !message) throw new Error("Please fill in your name and message.");
    if (!EMAIL.test(email)) throw new Error("Please enter a valid email address.");
    return {
      name,
      email,
      message,
      company: str(input?.company, 200),
      phone: str(input?.phone, 60),
      department: str(input?.department, 120) || "General Enquiry",
      turnstileToken: str(input?.turnstileToken, 4000) || undefined,
      website: str(input?.website, 200),
    };
  })
  .handler(async ({ data }) => {
    // Bots fill the hidden field; tell them nothing and write nothing.
    if (data.website) return { ok: true };

    const { guardPublicSubmission } = await import("./request-guard.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await guardPublicSubmission("contact", data.turnstileToken);

    const { website: _honeypot, turnstileToken: _token, ...row } = data;
    const { error } = await supabaseAdmin.from("contact_messages" as never).insert(row as never);
    if (error) throw new Error(error.message);

    // Best-effort notification: the message is already stored, so a mail
    // failure must not fail the submission. sendContactNotification never
    // throws — it reports what happened and we log it.
    const { sendContactNotification } = await import("./contact-notification");
    const result = await sendContactNotification(row, {
      apiKey: process.env.RESEND_API_KEY,
      to: process.env.CONTACT_NOTIFICATION_TO ?? "admin@dynamicrenaissance.org",
      from: process.env.CONTACT_NOTIFICATION_FROM ?? "Website <onboarding@resend.dev>",
    });
    if ("failed" in result) console.error("Contact notification failed", result.failed);
    if ("skipped" in result) console.warn("RESEND_API_KEY is not set — no notification sent");

    return { ok: true };
  });

type NewsletterInput = { email: string; turnstileToken?: string; website?: string };

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: NewsletterInput) => {
    const email = str(input?.email, 320);
    if (!EMAIL.test(email)) throw new Error("Please enter a valid email address.");
    return {
      email,
      turnstileToken: str(input?.turnstileToken, 4000) || undefined,
      website: str(input?.website, 200),
    };
  })
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, duplicate: false };

    const { guardPublicSubmission } = await import("./request-guard.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await guardPublicSubmission("newsletter", data.turnstileToken);

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email });

    // Already subscribed is a success from the visitor's point of view, and
    // reporting it differently would confirm whether an address is on the list.
    if (error?.code === "23505") return { ok: true, duplicate: true };
    if (error) throw new Error(error.message);

    return { ok: true, duplicate: false };
  });

type ApplicationInput = {
  vacancyId: string;
  name: string;
  email: string;
  phone?: string;
  coverNote?: string;
  /** Extension of the CV the browser is about to upload, if any. */
  cvExtension?: string;
  vacancyTitle?: string;
  turnstileToken?: string;
  website?: string;
};

const SLUG = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "application";
const CV_EXTENSIONS = ["pdf", "doc", "docx"];

/**
 * Reserves an application: runs the guard, mints a one-shot signed upload URL
 * for the CV, and returns it. The row is written by completeJobApplication once
 * the browser reports the upload finished.
 *
 * A signed upload URL carries its own authorisation for exactly one path, which
 * is why the bucket no longer needs an anonymous INSERT policy.
 */
export const startJobApplication = createServerFn({ method: "POST" })
  .inputValidator((input: ApplicationInput) => {
    const name = str(input?.name, 200);
    const email = str(input?.email, 320);
    if (!name) throw new Error("Please tell us your name.");
    if (!EMAIL.test(email)) throw new Error("Please enter a valid email address.");
    const extension = str(input?.cvExtension, 10)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (extension && !CV_EXTENSIONS.includes(extension)) {
      throw new Error("Please attach a PDF, DOC or DOCX file.");
    }
    return {
      vacancyId: str(input?.vacancyId, 64),
      name,
      email,
      phone: str(input?.phone, 60),
      coverNote: str(input?.coverNote, 5000),
      cvExtension: extension,
      vacancyTitle: str(input?.vacancyTitle, 200),
      turnstileToken: str(input?.turnstileToken, 4000) || undefined,
      website: str(input?.website, 200),
    };
  })
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const, accepted: false as const };

    const { guardPublicSubmission } = await import("./request-guard.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await guardPublicSubmission("application", data.turnstileToken);

    let upload: { path: string; token: string } | null = null;
    if (data.cvExtension) {
      const path = `${SLUG(data.vacancyTitle || "application")}/${crypto.randomUUID()}.${data.cvExtension}`;
      const { data: signed, error } = await supabaseAdmin.storage
        .from("applications")
        .createSignedUploadUrl(path);
      if (error || !signed) {
        throw new Error(error?.message || "Could not prepare the CV upload. Please try again.");
      }
      upload = { path: signed.path, token: signed.token };
    }

    const { error } = await supabaseAdmin.from("job_applications" as never).insert({
      vacancy_id: data.vacancyId || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      cover_note: data.coverNote,
      cv_path: upload?.path ?? null,
    } as never);
    if (error) throw new Error(error.message);

    return { ok: true as const, accepted: true as const, upload };
  });
