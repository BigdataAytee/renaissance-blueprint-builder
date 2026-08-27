import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/CrudPage";
import type { JobApplication, Vacancy } from "@/lib/cms/types";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/applications")({ component: Page });

function Page() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["job_applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_applications" as never)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as JobApplication[];
    },
  });

  const { data: vacancies } = useQuery({
    // Not ["vacancies"] — that key belongs to useCollection() on the Vacancies
    // CRUD page, whose query orders rows differently.
    queryKey: ["vacancies", "titles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vacancies" as never).select("*");
      if (error) throw error;
      return (data ?? []) as Vacancy[];
    },
  });

  const titleFor = (id: string | null) =>
    vacancies?.find((v) => v.id === id)?.title ?? "Unspecified role";

  // Group by vacancy id, not by title: two vacancies can share a title, and
  // until the vacancies query resolves every title reads "Unspecified role".
  // Insertion order preserves the newest-first order of the flat list.
  const groups = new Map<string, JobApplication[]>();
  for (const application of applications ?? []) {
    const key = application.vacancy_id ?? "";
    groups.set(key, [...(groups.get(key) ?? []), application]);
  }

  return (
    <div>
      <AdminHeader title="Applications" subtitle="Submissions from the Careers page. Read-only." />
      {isLoading ? (
        <div className="p-6 text-muted-foreground">Loading…</div>
      ) : !applications?.length ? (
        <div className="rounded-lg border border-border bg-background p-10 text-center text-muted-foreground">
          No applications yet.
        </div>
      ) : (
        <div className="space-y-8">
          {[...groups.entries()].map(([vacancyId, rows]) => (
            <section key={vacancyId}>
              <h2 className="mb-3 font-extrabold">
                {titleFor(vacancyId || null)}{" "}
                <span className="text-muted-foreground font-normal">({rows.length})</span>
              </h2>
              <div className="rounded-lg border border-border bg-background overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-left">
                    <tr>
                      <th className="p-3">Applicant</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Cover note</th>
                      <th className="p-3">Received</th>
                      <th className="p-3 w-28">CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((a) => (
                      <tr key={a.id} className="border-t border-border align-top">
                        <td className="p-3 font-medium">{a.name}</td>
                        <td className="p-3">
                          <a href={`mailto:${a.email}`} className="hover:text-primary">
                            {a.email}
                          </a>
                          {a.phone && <div className="text-muted-foreground">{a.phone}</div>}
                        </td>
                        <td className="p-3 max-w-md whitespace-pre-wrap text-muted-foreground">
                          {a.cover_note || "—"}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(a.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          {a.cv_path ? (
                            <CvDownloadButton path={a.cv_path} />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The applications bucket is private, so a CV is fetched through a short-lived
 * signed URL minted on demand rather than a stored public link.
 */
function CvDownloadButton({ path }: { path: string }) {
  const download = async () => {
    const { data, error } = await supabase.storage.from("applications").createSignedUrl(path, 60);
    if (error || !data?.signedUrl) {
      toast.error(error?.message || "Could not open that CV.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-1.5 text-primary hover:underline"
    >
      <Download className="size-4" /> Download
    </button>
  );
}
