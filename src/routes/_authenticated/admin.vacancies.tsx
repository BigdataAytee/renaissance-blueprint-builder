import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, textareaCls, useCollection } from "@/components/admin/CrudPage";
import type { Vacancy } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/vacancies")({ component: Page });

const empty: Partial<Vacancy> = { title: "", location: "", employment_type: "Full-time", description: "", is_published: true, sort_order: 0 };

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<Vacancy>("vacancies", "sort_order", true);

  const editor = (initial: Partial<Vacancy>) => ({ values, set }: { values: Partial<Vacancy>; set: <K extends keyof Vacancy>(k: K, v: Vacancy[K]) => void }) => (
    <>
      <Field label="Title"><input className={inputCls} value={values.title ?? ""} onChange={(e) => set("title", e.target.value)} /></Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Location"><input className={inputCls} value={values.location ?? ""} onChange={(e) => set("location", e.target.value)} /></Field>
        <Field label="Type"><input className={inputCls} value={values.employment_type ?? ""} onChange={(e) => set("employment_type", e.target.value)} placeholder="Full-time / Contract / Graduate" /></Field>
      </div>
      <Field label="Description"><textarea className={textareaCls} value={values.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <Field label="Sort order" hint="Lower first"><input type="number" className={inputCls} value={values.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></Field>
        <label className="flex items-center gap-3 pt-6"><Switch checked={values.is_published ?? true} onCheckedChange={(v) => set("is_published", v)} /> <span className="text-sm">Published</span></label>
      </div>
      <input type="hidden" value={initial.id ?? ""} />
    </>
  );

  return (
    <div>
      <AdminHeader
        title="Job vacancies" subtitle="These appear on the public Careers page."
        action={<EditorDialog<Vacancy> triggerLabel="New vacancy" title="New vacancy" initial={empty}
          onSave={(v) => create.mutateAsync(v)}>{editor(empty)}</EditorDialog>}
      />
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
          !data?.length ? <div className="p-10 text-center text-muted-foreground">No vacancies yet.</div> :
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left"><tr>
                <th className="p-3">Title</th><th className="p-3">Location</th><th className="p-3">Type</th><th className="p-3">Status</th><th className="p-3 w-24"></th>
              </tr></thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="p-3 font-medium">{v.title}</td>
                    <td className="p-3">{v.location}</td>
                    <td className="p-3">{v.employment_type}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${v.is_published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{v.is_published ? "Published" : "Draft"}</span></td>
                    <td className="p-3 flex justify-end gap-1">
                      <EditorDialog<Vacancy>
                        triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                        title="Edit vacancy" initial={v} editing
                        onSave={(values) => update.mutateAsync({ id: v.id, values })}
                      >{editor(v)}</EditorDialog>
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
