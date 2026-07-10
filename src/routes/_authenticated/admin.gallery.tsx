import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, useCollection } from "@/components/admin/CrudPage";
import type { GalleryImage } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/gallery")({ component: Page });

const empty: Partial<GalleryImage> = { image_url: "", caption: "", sort_order: 0, is_published: true };

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<GalleryImage>("gallery_images", "sort_order", true);

  const editor = () => ({ values, set }: { values: Partial<GalleryImage>; set: <K extends keyof GalleryImage>(k: K, v: GalleryImage[K]) => void }) => (
    <>
      <Field label="Image URL"><input className={inputCls} value={values.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." /></Field>
      {values.image_url && <img src={values.image_url} alt="" className="max-h-48 rounded border border-border" />}
      <Field label="Caption"><input className={inputCls} value={values.caption ?? ""} onChange={(e) => set("caption", e.target.value)} /></Field>
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <Field label="Sort order"><input type="number" className={inputCls} value={values.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></Field>
        <label className="flex items-center gap-3 pt-6"><Switch checked={values.is_published ?? true} onCheckedChange={(v) => set("is_published", v)} /> <span className="text-sm">Published</span></label>
      </div>
    </>
  );

  return (
    <div>
      <AdminHeader title="Gallery" subtitle="Images shown on /gallery."
        action={<EditorDialog<GalleryImage> triggerLabel="New image" title="New image" initial={empty} onSave={(v) => create.mutateAsync(v)}>{editor()}</EditorDialog>} />
      {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
        !data?.length ? <div className="rounded-lg border border-border bg-background p-10 text-center text-muted-foreground">No images yet.</div> :
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((v) => (
              <div key={v.id} className="rounded-lg border border-border bg-background overflow-hidden">
                <div className="aspect-video bg-secondary">
                  {v.image_url && <img src={v.image_url} alt={v.caption} className="w-full h-full object-cover" />}
                </div>
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{v.caption || "(untitled)"}</div>
                    <div className="text-xs text-muted-foreground">Order {v.sort_order} · {v.is_published ? "Published" : "Draft"}</div>
                  </div>
                  <div className="flex">
                    <EditorDialog<GalleryImage> triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                      title="Edit image" initial={v} editing onSave={(values) => update.mutateAsync({ id: v.id, values })}>{editor()}</EditorDialog>
                    <DeleteButton onConfirm={() => remove.mutate(v.id)} label="this image" />
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
