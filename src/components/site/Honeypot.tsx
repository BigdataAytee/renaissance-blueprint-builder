/**
 * Visually hidden decoy field for public forms. Browsers never render it and
 * screen readers skip it, so anything that arrives filled in came from a bot —
 * the submit handler should silently pretend the submission succeeded.
 */
export function Honeypot({ name = "website" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={`hp-${name}`}>Leave this field empty</label>
      <input
        id={`hp-${name}`}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
