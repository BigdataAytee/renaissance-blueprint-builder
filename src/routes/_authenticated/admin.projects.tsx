import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, textareaCls, useCollection } from "@/components/admin/CrudPage";
import type { Project } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/projects")({ component: Page });

const empty: Partial<Project> = {
  slug: "", title: "", category: "", location: "", timeline: "", client: "", value: "",
  summary: "", image_url: "", overview: "", scope: [], outcomes: [], is_published: false, sort_order: 0,
};

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const toLines = (arr?: string[] | null) => (arr ?? []).join("\n");
const fromLines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<Project>("projects", "sort_order", true);

  const editor = () => ({ values, set }: { values: Partial<Project>; set: <K extends keyof Project>(k: K, v: Project[K]) => void }) => (
    <>
      <Field label="Title">
        <input className={inputCls} value={values.title ?? ""} onChange={(e) => {
          set("title", e.target.value);
          if (!values.slug) set("slug", slugify(e.target.value));
        }} />
      </Field>
      <Field label="Slug" hint="URL path, e.g. central-business-tower">
        <input className={inputCls} value={values.slug ?? ""} onChange={(e) => set("slug", slugify(e.target.value))} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category" hint="e.g. Construction, Oil & Gas">
          <input className={inputCls} value={values.category ?? ""} onChange={(e) => set("category", e.target.value)} />
        </Field>
        <Field label="Location">
          <input className={inputCls} value={values.location ?? ""} onChange={(e) => set("location", e.target.value)} />
        </Field>
        <Field label="Timeline">
          <input className={inputCls} value={values.timeline ?? ""} onChange={(e) => set("timeline", e.target.value)} />
        </Field>
        <Field label="Client">
          <input className={inputCls} value={values.client ?? ""} onChange={(e) => set("client", e.target.value)} />
        </Field>
        <Field label="Value">
          <input className={inputCls} value={values.value ?? ""} onChange={(e) => set("value", e.target.value)} />
        </Field>
        <Field label="Sort order">
          <input type="number" className={inputCls} value={values.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} />
        </Field>
      </div>
      <Field label="Cover image URL"><input className={inputCls} value={values.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)} /></Field>
      <Field label="Summary" hint="Shown on the projects list card">
        <textarea className={textareaCls} value={values.summary ?? ""} onChange={(e) => set("summary", e.target.value)} />
      </Field>
      <Field label="Overview" hint="Full paragraph on the detail page">
        <textarea className={textareaCls} value={values.overview ?? ""} onChange={(e) => set("overview", e.target.value)} />
      </Field>
      <Field label="Scope" hint="One item per line">
        <textarea className={textareaCls} value={toLines(values.scope)} onChange={(e) => set("scope", fromLines(e.target.value))} />
      </Field>
      <Field label="Outcomes" hint="One item per line">
        <textarea className={textareaCls} value={toLines(values.outcomes)} onChange={(e) => set("outcomes", fromLines(e.target.value))} />
      </Field>
      <label className="flex items-center gap-3">
        <Switch checked={values.is_published ?? false} onCheckedChange={(v) => set("is_published", v)} />
        <span className="text-sm">Published</span>
      </label>
    </>
  );

  return (
    <div>
      <AdminHeader
        title="Projects" subtitle="Toggle Published to show a project on /projects. Draft projects stay hidden from the public site so you can preview edits first."
        action={<EditorDialog<Project> triggerLabel="New project" title="New project" initial={empty}
          onSave={(v) => create.mutateAsync(v)}>{editor()}</EditorDialog>}
      />
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
          !data?.length ? <div className="p-10 text-center text-muted-foreground">No projects yet.</div> :
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left"><tr>
                <th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3 w-56">Visibility</th><th className="p-3 w-32"></th>
              </tr></thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="p-3 font-medium">
                      <div>{v.title}</div>
                      <div className="text-xs text-muted-foreground">{v.location}</div>
                    </td>
                    <td className="p-3 text-muted-foreground">{v.category}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${v.is_published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {v.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => update.mutate({ id: v.id, values: { is_published: !v.is_published } })}
                          disabled={update.isPending}
                          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold border transition-colors ${
                            v.is_published
                              ? "border-border bg-background text-foreground hover:bg-secondary"
                              : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                          }`}
                          title={v.is_published ? "Hide from public site" : "Show on public site"}
                        >
                          {v.is_published ? (<><EyeOff className="size-3.5" /> Hide</>) : (<><Eye className="size-3.5" /> Publish</>)}
                        </button>
                        {!v.is_published && (
                          <Link
                            to="/projects/$slug"
                            params={{ slug: v.slug }}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                            title="Preview draft"
                          >
                            <ExternalLink className="size-3.5" /> Preview
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="p-3 flex justify-end gap-1">
                      <EditorDialog<Project>
                        triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                        title="Edit project" initial={v} editing
                        onSave={(values) => update.mutateAsync({ id: v.id, values })}
                      >{editor()}</EditorDialog>
                      <DeleteButton onConfirm={() => remove.mutate(v.id)} label={`"${v.title}"`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}
