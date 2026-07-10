import { useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

type Row = { id: string; [k: string]: unknown };

export function useCollection<T extends Row>(table: string, orderBy: string = "created_at", ascending = false) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as never).select("*").order(orderBy as never, { ascending });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
  const invalidate = () => qc.invalidateQueries({ queryKey: [table] });
  const create = useMutation({
    mutationFn: async (values: Partial<T>) => {
      const { error } = await supabase.from(table as never).insert(values as never);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Created"); invalidate(); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const update = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<T> }) => {
      const { error } = await supabase.from(table as never).update(values as never).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Saved"); invalidate(); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as never).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Deleted"); invalidate(); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  return { ...q, create, update, remove };
}

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EditorDialog<T extends Row>({
  triggerLabel,
  title,
  initial,
  onSave,
  children,
  editing,
}: {
  triggerLabel: ReactNode;
  title: string;
  initial: Partial<T>;
  onSave: (values: Partial<T>) => Promise<void> | void;
  children: (state: {
    values: Partial<T>;
    set: <K extends keyof T>(k: K, v: T[K]) => void;
  }) => ReactNode;
  editing?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Partial<T>>(initial);
  const set = <K extends keyof T>(k: K, v: T[K]) => setValues((old) => ({ ...old, [k]: v }));
  const submit = async () => {
    try {
      await onSave(values);
      setOpen(false);
      if (!editing) setValues(initial);
    } catch {
      /* handled in mutation onError */
    }
  };
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setValues(initial); }}>
      <DialogTrigger asChild>
        {typeof triggerLabel === "string" ? (
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4" />{triggerLabel}
          </button>
        ) : triggerLabel}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <div className="space-y-4">{children({ values, set })}</div>
        <DialogFooter>
          <button onClick={submit} className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteButton({ onConfirm, label = "this item" }: { onConfirm: () => void; label?: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-destructive" aria-label="Delete">
          <Trash2 className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {label}?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { Pencil };

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-1">{label}</div>
      {children}
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </label>
  );
}

export const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";
export const textareaCls = inputCls + " min-h-[100px]";
