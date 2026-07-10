import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader, DeleteButton, EditorDialog, Field, Pencil, inputCls, textareaCls, useCollection } from "@/components/admin/CrudPage";
import type { TeamMember } from "@/lib/cms/types";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/team")({ component: Page });

const empty: Partial<TeamMember> = { name: "", role: "", bio: "", photo_url: "", sort_order: 0, is_published: true };

function Page() {
  const { data, create, update, remove, isLoading } = useCollection<TeamMember>("team_members", "sort_order", true);

  const editor = () => ({ values, set }: { values: Partial<TeamMember>; set: <K extends keyof TeamMember>(k: K, v: TeamMember[K]) => void }) => (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name"><input className={inputCls} value={values.name ?? ""} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Role / Title"><input className={inputCls} value={values.role ?? ""} onChange={(e) => set("role", e.target.value)} /></Field>
      </div>
      <Field label="Photo URL"><input className={inputCls} value={values.photo_url ?? ""} onChange={(e) => set("photo_url", e.target.value)} /></Field>
      {values.photo_url && <img src={values.photo_url} alt="" className="size-24 rounded-full object-cover border border-border" />}
      <Field label="Bio"><textarea className={textareaCls} value={values.bio ?? ""} onChange={(e) => set("bio", e.target.value)} /></Field>
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <Field label="Sort order"><input type="number" className={inputCls} value={values.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} /></Field>
        <label className="flex items-center gap-3 pt-6"><Switch checked={values.is_published ?? true} onCheckedChange={(v) => set("is_published", v)} /> <span className="text-sm">Published</span></label>
      </div>
    </>
  );

  return (
    <div>
      <AdminHeader title="Team" subtitle="Team members shown on /team."
        action={<EditorDialog<TeamMember> triggerLabel="New member" title="New team member" initial={empty} onSave={(v) => create.mutateAsync(v)}>{editor()}</EditorDialog>} />
      {isLoading ? <div className="p-6 text-muted-foreground">Loading…</div> :
        !data?.length ? <div className="rounded-lg border border-border bg-background p-10 text-center text-muted-foreground">No team members yet.</div> :
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((v) => (
              <div key={v.id} className="rounded-lg border border-border bg-background p-4 flex gap-3">
                <div className="size-16 rounded-full overflow-hidden bg-secondary shrink-0">
                  {v.photo_url && <img src={v.photo_url} alt={v.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{v.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{v.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">{v.is_published ? "Published" : "Draft"}</div>
                </div>
                <div className="flex flex-col">
                  <EditorDialog<TeamMember> triggerLabel={<button className="p-2 text-muted-foreground hover:text-primary"><Pencil className="size-4" /></button>}
                    title="Edit member" initial={v} editing onSave={(values) => update.mutateAsync({ id: v.id, values })}>{editor()}</EditorDialog>
                  <DeleteButton onConfirm={() => remove.mutate(v.id)} label={v.name} />
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
