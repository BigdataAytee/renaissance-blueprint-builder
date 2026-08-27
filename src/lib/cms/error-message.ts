/**
 * Pulls a human-readable message out of whatever a Supabase call rejected with.
 *
 * PostgREST and Storage report failures as plain objects — `{ message, details,
 * hint, code }` — not Error instances, so an `e instanceof Error` guard silently
 * discards the reason and shows a generic fallback instead. That matters most
 * for the errors an admin most needs to read: RLS refusals, constraint
 * violations and the rate-limit messages raised by the database triggers.
 *
 * Auth and server-function failures *are* real Errors, so both shapes are
 * handled here.
 */
export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message: unknown };
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}
