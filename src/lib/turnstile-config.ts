/**
 * Turnstile's public site key, and whether it is configured at all.
 *
 * Separate from the widget component so the forms can import the flag without
 * pulling a component into a module that only needs a boolean.
 */
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

/** True when Turnstile is configured — forms use it to require a token or not. */
export const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY);
