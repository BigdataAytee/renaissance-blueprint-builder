import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, textareaCls, useCollection } from "@/components/admin/CrudPage";
import type { NewsPost } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/news")({ component: Page });

const empty: Partial<NewsPost> = { slug: "", title: "", excerpt: "", body_md: "", cover_url: "", is_published: false };

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<NewsPost>("news_posts", "created_at", false);

  const editor = () => ({ values, set }: { values: Partial<NewsPost>; set: <K extends keyof NewsPost>(k: K, v: NewsPost[K]) => void }) => (
    <>
      <Field label="Title">
        <input className={inputCls} value={values.title ?? ""} onChange={(e) => {
          set("title", e.target.value);
          if (!values.slug) set("slug", slugify(e.target.value));
        }} />
      </Field>
      <Field label="Slug" hint="URL path, e.g. announcing-new-refinery"><input className={inputCls} value={values.slug ?? ""} onChange={(e) => set("slug", slugify(e.target.value))} /></Field>
      <Field label="Excerpt"><textarea className={textareaCls} value={values.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></Field>
      <Field label="Cover image URL" hint="Paste an image URL"><input className={inputCls} value={values.cover_url ?? ""} onChange={(e) => set("cover_url", e.target.value)} /></Field>
      <Field label="Body (Markdown supported)"><textarea className={textareaCls + " min-h-[240px]"} value={values.body_md ?? ""} onChange={(e) => set("body_md", e.target.value)} /></Field>
      <label className="flex items-center gap-3"><Switch checked={values.is_published ?? false} onCheckedChange={(v) => {
        set("is_published", v);
        if (v && !values.published_at) set("published_at", new Date().toISOString());
      }} /> <span className="text-sm">Published</span></label>
    </>
  );

  return (
    <div>
      <AdminHeader
        title="News & Blog" subtitle="Published posts appear on /news."
        action={<EditorDialog<NewsPost> triggerLabel="New post" title="New post" initial={empty}
          onSave={(v) => create.mutateAsync(v)}>{editor()}</EditorDialog>}
      />
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
          !data?.length ? <div className="p-10 text-center text-muted-foreground">No posts yet.</div> :
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left"><tr>
                <th className="p-3">Title</th><th className="p-3">Slug</th><th className="p-3">Status</th><th className="p-3 w-24"></th>
              </tr></thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="p-3 font-medium">{v.title}</td>
                    <td className="p-3 text-muted-foreground">/{v.slug}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${v.is_published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>{v.is_published ? "Published" : "Draft"}</span></td>
                    <td className="p-3 flex justify-end gap-1">
                      <EditorDialog<NewsPost>
                        triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                        title="Edit post" initial={v} editing
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
