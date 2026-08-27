import { useId } from "react";

/**
 * Visually hidden decoy field for public forms. Browsers never render it and
 * screen readers skip it, so anything that arrives filled in came from a bot —
 * the submit handler should silently pretend the submission succeeded.
 */
export function Honeypot({ name = "website" }: { name?: string }) {
  // Unique per instance: the footer's honeypot shares a page with the contact
  // form's and the apply dialog's, and duplicate DOM ids break label targeting.
  const id = `hp-${name}-${useId()}`;
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name={name} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
