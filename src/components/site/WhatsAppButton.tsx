import { useState } from "react";
import { X } from "lucide-react";
import { company } from "@/lib/site-data";

// wa.me expects digits only — no plus sign, spaces or dashes.
const whatsAppNumber = company.phone.replace(/\D/g, "");
const whatsAppHref = `https://wa.me/${whatsAppNumber}`;

/**
 * Floating click-to-chat button, shown on the public site only. Dismissible,
 * because a permanently pinned button gets in the way on small screens.
 */
export function WhatsAppButton() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || !whatsAppNumber) return null;

  return (
    <div className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 print:hidden">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Hide the WhatsApp chat button"
        className="grid size-7 place-items-center rounded-full border border-border bg-background text-muted-foreground opacity-0 transition-opacity duration-200 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
      <a
        href={whatsAppHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-95"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7" fill="currentColor">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          <path d="M12.04 2A9.9 9.9 0 0 0 2.13 11.9c0 1.75.46 3.46 1.33 4.96L2 22.5l5.78-1.51a9.86 9.86 0 0 0 4.26.97h.01a9.9 9.9 0 0 0 9.9-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.43.9.92-3.34-.2-.31a8.21 8.21 0 1 1 7.2 4.08Z" />
        </svg>
      </a>
    </div>
  );
}
