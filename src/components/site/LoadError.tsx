import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Shown when a page's data could not be loaded.
 *
 * The point is to be distinguishable from an empty result. A page that renders
 * "nothing here yet" on a failed query hides the failure: a broken RLS policy,
 * an expired key and a genuinely empty table all look identical, so nobody
 * notices anything is wrong. That is exactly how the anonymous-read policy bug
 * went unseen — five pages reported "no content" while their queries were
 * erroring.
 *
 * The visitor-facing text stays generic on purpose: the underlying message can
 * name database functions and policies, which is not something to print on a
 * public page. The detail goes to the console, and is shown inline only in dev.
 */
export function LoadError({
  detail,
  onRetry,
  className,
  what = "this",
}: {
  /** The underlying error text — logged, and shown inline only during development. */
  detail?: string;
  onRetry?: () => void;
  className?: string;
  /** Names what failed, e.g. "the open roles". */
  what?: string;
}) {
  if (detail) console.error("Failed to load %s: %s", what, detail);

  return (
    <div className={cn("p-8 text-center", className)}>
      <AlertTriangle className="mx-auto size-6 text-destructive" aria-hidden="true" />
      <p className="mt-3 font-extrabold text-foreground">We could not load {what} right now.</p>
      <p className="mt-1 text-sm text-muted-foreground">
        This is a problem on our side, not with your connection. Please try again in a moment.
      </p>
      {import.meta.env.DEV && detail && (
        <p className="mt-3 text-xs font-mono text-muted-foreground break-words">{detail}</p>
      )}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
