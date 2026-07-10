import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, textareaCls, useCollection } from "@/components/admin/CrudPage";
import type { EventItem } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/events")({ component: Page });

const empty: Partial<EventItem> = { slug: "", title: "", location: "", description: "", starts_at: new Date().toISOString().slice(0, 16), is_published: true };
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const toLocal = (iso?: string | null) => iso ? new Date(iso).toISOString().slice(0, 16) : "";
const toIso = (local: string) => local ? new Date(local).toISOString() : "";

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<EventItem>("events", "starts_at", false);

  const editor = () => ({ values, set }: { values: Partial<EventItem>; set: <K extends keyof EventItem>(k: K, v: EventItem[K]) => void }) => (
    <>
      <Field label="Title"><input className={inputCls} value={values.title ?? ""} onChange={(e) => { set("title", e.target.value); if (!values.slug) set("slug", slugify(e.target.value)); }} /></Field>
      <Field label="Slug"><input className={inputCls} value={values.slug ?? ""} onChange={(e) => set("slug", slugify(e.target.value))} /></Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Starts at"><input type="datetime-local" className={inputCls} value={toLocal(values.starts_at)} onChange={(e) => set("starts_at", toIso(e.target.value))} /></Field>
        <Field label="Ends at (optional)"><input type="datetime-local" className={inputCls} value={toLocal(values.ends_at)} onChange={(e) => set("ends_at", toIso(e.target.value) || null)} /></Field>
      </div>
      <Field label="Location"><input className={inputCls} value={values.location ?? ""} onChange={(e) => set("location", e.target.value)} /></Field>
      <Field label="Cover image URL"><input className={inputCls} value={values.cover_url ?? ""} onChange={(e) => set("cover_url", e.target.value)} /></Field>
      <Field label="Description"><textarea className={textareaCls} value={values.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field>
      <label className="flex items-center gap-3"><Switch checked={values.is_published ?? true} onCheckedChange={(v) => set("is_published", v)} /> <span className="text-sm">Published</span></label>
    </>
  );

  return (
    <div>
      <AdminHeader title="Events" subtitle="Published events appear on /events."
        action={<EditorDialog<EventItem> triggerLabel="New event" title="New event" initial={empty} onSave={(v) => create.mutateAsync(v)}>{editor()}</EditorDialog>} />
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
          !data?.length ? <div className="p-10 text-center text-muted-foreground">No events yet.</div> :
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left"><tr>
                <th className="p-3">Title</th><th className="p-3">Starts</th><th className="p-3">Location</th><th className="p-3">Status</th><th className="p-3 w-24"></th>
              </tr></thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="p-3 font-medium">{v.title}</td>
                    <td className="p-3">{new Date(v.starts_at).toLocaleString()}</td>
                    <td className="p-3">{v.location}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${v.is_published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{v.is_published ? "Published" : "Draft"}</span></td>
                    <td className="p-3 flex justify-end gap-1">
                      <EditorDialog<EventItem> triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                        title="Edit event" initial={v} editing onSave={(values) => update.mutateAsync({ id: v.id, values })}>{editor()}</EditorDialog>
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
