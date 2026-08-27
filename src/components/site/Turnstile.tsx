import { useEffect, useId, useRef, useState } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile-config";

const SITE_KEY = TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

/** Loads the Turnstile script once per page, however many widgets ask for it. */
function loadTurnstile(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget.
 *
 * Renders nothing when VITE_TURNSTILE_SITE_KEY is unset, so the forms keep
 * working before Turnstile is configured; the server skips verification in
 * exactly the same case. `onToken` receives the solved token, or null when it
 * expires and the visitor needs to solve it again.
 */
export function Turnstile({
  onToken,
  action,
}: {
  onToken: (token: string | null) => void;
  action: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const instance = useId();

  useEffect(() => {
    if (!SITE_KEY || !container.current) return;
    let widgetId: string | undefined;
    let cancelled = false;
    const el = container.current;

    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          action,
          theme: "light",
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => {
            onToken(null);
            setFailed(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
    // onToken is redefined on every render by callers; re-rendering the widget
    // would discard a solved challenge, so it is deliberately not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, instance]);

  if (!SITE_KEY) return null;

  return (
    <div className="mt-6">
      <div ref={container} />
      {failed && (
        <p className="mt-2 text-sm text-destructive">
          The verification challenge could not load. Please check your connection and refresh.
        </p>
      )}
    </div>
  );
}
