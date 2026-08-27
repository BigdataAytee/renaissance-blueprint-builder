import { createServerFn } from "@tanstack/react-start";

/**
 * Whether the site already has an administrator.
 *
 * The first account to sign up is promoted to admin by a database trigger, so
 * public sign-up must close as soon as that has happened. user_roles is only
 * readable by admins under RLS, so the check runs server-side with the service
 * role and returns nothing but a boolean.
 *
 * Fails open — reporting "no admin yet" — if the check itself cannot run, so a
 * missing service-role key or a database hiccup can never lock the owner out of
 * creating their first account. That is safe: the trigger only grants admin
 * when no admin row exists, and /admin independently checks for the role, so a
 * sign-up that slips through gets an account with no access.
 */
export const adminExists = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id", { count: "exact", head: true })
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return (count ?? 0) > 0;
  } catch (err) {
    console.error("adminExists check failed", err instanceof Error ? err.message : err);
    return false;
  }
});
