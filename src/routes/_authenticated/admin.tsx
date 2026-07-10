import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Newspaper, CalendarDays, Images, Users, LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Dynamic Renaissance" }, { name: "robots", content: "noindex,nofollow" }] }),
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/vacancies", label: "Vacancies", icon: Briefcase },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/team", label: "Team", icon: Users },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/40 flex">
      <aside className="w-60 shrink-0 bg-background border-r border-border flex flex-col">
        <div className="p-5 border-b border-border">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">CMS</div>
          <div className="mt-1 font-extrabold">Dynamic Renaissance</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>
                <n.icon className="size-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 space-y-1 border-t border-border">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">
            <ExternalLink className="size-4" /> View site
          </a>
          <button onClick={signOut} className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
