import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { errorMessage } from "@/lib/cms/error-message";
import { ShieldCheck, Pencil, Trash2, UserPlus } from "lucide-react";
import {
  listAdminUsers,
  inviteAdminUser,
  setUserRole,
  removeUserRole,
} from "@/lib/cms/admin-users.functions";
import { AdminHeader, EditorDialog, Field, inputCls } from "@/components/admin/CrudPage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: AdminUsersPage,
  head: () => ({ meta: [{ title: "Admin users — Dynamic Renaissance" }, { name: "robots", content: "noindex,nofollow" }] }),
});

type Role = "admin" | "editor";
type Row = {
  user_id: string;
  role: Role;
  email: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  invited_at: string | null;
  created_at: string;
};

function AdminUsersPage() {
  const list = useServerFn(listAdminUsers);
  const invite = useServerFn(inviteAdminUser);
  const setRole = useServerFn(setUserRole);
  const removeRole = useServerFn(removeUserRole);
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => list(),
  });

  const inviteMut = useMutation({
    mutationFn: (v: { email: string; role: Role }) => invite({ data: v }),
    onSuccess: () => {
      toast.success("Invitation sent");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e) => toast.error(errorMessage(e, "Failed to invite")),
  });

  const roleMut = useMutation({
    mutationFn: (v: { userId: string; role: Role }) => setRole({ data: v }),
    onSuccess: () => {
      toast.success("Role updated");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e) => toast.error(errorMessage(e, "Failed")),
  });

  const removeMut = useMutation({
    mutationFn: (v: { userId: string; role: Role }) => removeRole({ data: v }),
    onSuccess: () => {
      toast.success("Access removed");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (e) => toast.error(errorMessage(e, "Failed")),
  });

  const rows = q.data ?? [];

  return (
    <div>
      <AdminHeader
        title="Admin users"
        subtitle="Invite people and manage who can access the dashboard."
        action={
          <EditorDialog<{ id: string; email: string; role: Role }>
            triggerLabel={
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <UserPlus className="size-4" /> Invite user
              </button>
            }
            title="Invite user"
            initial={{ email: "", role: "admin" }}
            onSave={async (values) => {
              if (!values.email) return;
              await inviteMut.mutateAsync({ email: values.email!, role: (values.role ?? "admin") as Role });
            }}
          >
            {({ values, set }) => (
              <>
                <Field label="Email">
                  <input
                    type="email"
                    className={inputCls}
                    value={values.email ?? ""}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="person@example.com"
                  />
                </Field>
                <Field label="Role">
                  <select
                    className={inputCls}
                    value={values.role ?? "admin"}
                    onChange={(e) => set("role", e.target.value as Role)}
                  >
                    <option value="admin">Admin (full access)</option>
                    <option value="editor">Editor (content only)</option>
                  </select>
                </Field>
                <p className="text-xs text-muted-foreground">
                  They will receive an email invitation. If the email already has an account, they will simply be granted the role.
                </p>
              </>
            )}
          </EditorDialog>
        }
      />

      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left">
            <tr>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Last sign-in</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {q.isLoading && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!q.isLoading && rows.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No admin users yet.</td></tr>
            )}
            {rows.map((r: Row) => (
              <tr key={`${r.user_id}-${r.role}`} className="border-t border-border">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    <span>{r.email}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${r.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}`}>
                    {r.role}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">
                  {r.confirmed ? "Active" : r.invited_at ? "Invited" : "Pending"}
                </td>
                <td className="p-3 text-muted-foreground">
                  {r.last_sign_in_at ? new Date(r.last_sign_in_at).toLocaleString() : "—"}
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-1">
                    <ChangeRoleButton
                      row={r}
                      onChange={(role) => roleMut.mutate({ userId: r.user_id, role })}
                    />
                    <RemoveRoleButton
                      row={r}
                      onConfirm={() => removeMut.mutate({ userId: r.user_id, role: r.role })}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChangeRoleButton({ row, onChange }: { row: Row; onChange: (role: Role) => void }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(row.role);
  return (
    <>
      <button
        className="p-2 text-muted-foreground hover:text-foreground"
        aria-label="Change role"
        onClick={() => { setRole(row.role); setOpen(true); }}
      >
        <Pencil className="size-4" />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change role for {row.email}</AlertDialogTitle>
            <AlertDialogDescription>
              Choose the new role. This grants the user the selected privileges.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <select
            className={inputCls}
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="admin">Admin (full access)</option>
            <option value="editor">Editor (content only)</option>
          </select>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onChange(role)}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function RemoveRoleButton({ row, onConfirm }: { row: Row; onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-destructive" aria-label="Remove access">
          <Trash2 className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove access?</AlertDialogTitle>
          <AlertDialogDescription>
            {row.email} will lose the “{row.role}” role and can no longer access this dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
