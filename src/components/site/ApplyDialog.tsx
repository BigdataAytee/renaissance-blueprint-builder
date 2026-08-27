import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Honeypot } from "@/components/site/Honeypot";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MAX_CV_BYTES = 5 * 1024 * 1024;
const DOCX_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ACCEPTED_CV_TYPES = ["application/pdf", "application/msword", DOCX_TYPE];
// Mirrors allowed_mime_types on the `applications` bucket.
const TYPE_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: DOCX_TYPE,
};

const extensionOf = (fileName: string) =>
  fileName.includes(".") ? (fileName.split(".").pop() ?? "").toLowerCase() : "";

/**
 * The MIME type to upload a CV as, or null when it is not an accepted format.
 * Browsers report an empty type for some .doc files, so the extension decides
 * when the browser will not.
 */
function contentTypeFor(file: File): string | null {
  if (file.type) return ACCEPTED_CV_TYPES.includes(file.type) ? file.type : null;
  return TYPE_BY_EXTENSION[extensionOf(file.name)] ?? null;
}

/** crypto.randomUUID is unavailable outside secure contexts (plain-http hosts). */
const randomId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

// Matches the field styling on the contact form.
const fieldCls =
  "mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 hover:bg-background hover:border-primary/30 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10";
const labelCls = "text-xs font-bold uppercase tracking-wider text-muted-foreground";

/** Turns "Senior QS Engineer" into "senior-qs-engineer" for the storage path. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "application";

export function ApplyDialog({
  vacancyId,
  vacancyTitle,
}: {
  vacancyId: string;
  vacancyTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") || "").trim()) {
      setOpen(false);
      toast.success("Application received. Thank you.");
      return;
    }

    const cv = data.get("cv");
    const file = cv instanceof File && cv.size > 0 ? cv : null;
    if (file) {
      if (file.size > MAX_CV_BYTES) {
        toast.error("Your CV must be 5 MB or smaller.");
        return;
      }
      // Browsers sometimes report an empty type for .doc, so fall back to the
      // extension. The storage bucket enforces the same allowlist, and letting
      // an unknown type through would surface its raw error instead of this one.
      if (contentTypeFor(file) === null) {
        toast.error("Please attach a PDF, DOC or DOCX file.");
        return;
      }
    }

    setSubmitting(true);
    try {
      let cvPath: string | null = null;

      if (file) {
        const extension = extensionOf(file.name) || "pdf";
        // randomId keeps applicants from guessing or overwriting each other's
        // uploads, since the bucket accepts anonymous writes.
        cvPath = `${slugify(vacancyTitle)}/${randomId()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("applications")
          .upload(cvPath, file, { contentType: contentTypeFor(file) ?? undefined, upsert: false });
        if (uploadError) {
          toast.error(uploadError.message || "Could not upload your CV. Please try again.");
          return;
        }
      }

      const { error } = await supabase.from("job_applications" as never).insert({
        vacancy_id: vacancyId,
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        cover_note: String(data.get("cover_note") || "").trim(),
        cv_path: cvPath,
      } as never);

      if (error) {
        toast.error(error.message || "Could not send your application. Please try again.");
        return;
      }

      form.reset();
      setOpen(false);
      toast.success("Application received. We will be in touch if there is a match.");
    } catch (err) {
      // Without this the button would stay stuck on "Sending" with no
      // explanation if anything above threw unexpectedly.
      console.error("Application submission failed", err);
      toast.error("Could not send your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="btn-green shrink-0">
          Apply
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply — {vacancyTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="relative space-y-5">
          <Honeypot name="website" />
          <div>
            <label htmlFor="apply-name" className={labelCls}>
              Full name *
            </label>
            <input id="apply-name" name="name" type="text" required className={fieldCls} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="apply-email" className={labelCls}>
                Email *
              </label>
              <input id="apply-email" name="email" type="email" required className={fieldCls} />
            </div>
            <div>
              <label htmlFor="apply-phone" className={labelCls}>
                Phone
              </label>
              <input id="apply-phone" name="phone" type="tel" className={fieldCls} />
            </div>
          </div>
          <div>
            <label htmlFor="apply-cover-note" className={labelCls}>
              Cover note
            </label>
            <textarea
              id="apply-cover-note"
              name="cover_note"
              rows={4}
              className={`${fieldCls} min-h-[110px] resize-none`}
            />
          </div>
          <div>
            <label htmlFor="apply-cv" className={labelCls}>
              CV (PDF or Word, max 5 MB)
            </label>
            <input
              id="apply-cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className={`${fieldCls} file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground`}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-green w-full justify-center disabled:opacity-60"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
            {submitting ? "Sending" : "Send application"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
