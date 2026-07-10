import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Newspaper, CalendarDays, Images, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

async function count(table: string): Promise<number> {
  const { count } = await supabase.from(table as never).select("*", { count: "exact", head: true });
  return count ?? 0;
}

function Overview() {
  const q = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => ({
      vacancies: await count("vacancies"),
      news: await count("news_posts"),
      events: await count("events"),
      gallery: await count("gallery_images"),
      team: await count("team_members"),
    }),
  });
  const cards = [
    { to: "/admin/vacancies", label: "Vacancies", icon: Briefcase, value: q.data?.vacancies },
    { to: "/admin/news", label: "News posts", icon: Newspaper, value: q.data?.news },
    { to: "/admin/events", label: "Events", icon: CalendarDays, value: q.data?.events },
    { to: "/admin/gallery", label: "Gallery images", icon: Images, value: q.data?.gallery },
    { to: "/admin/team", label: "Team members", icon: Users, value: q.data?.team },
  ] as const;

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Manage the public website content. Changes appear on the live site instantly.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="p-6 rounded-lg border border-border bg-background hover:shadow-md transition">
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <c.icon className="size-4" /> {c.label}
            </div>
            <div className="mt-3 text-4xl font-extrabold">{c.value ?? "—"}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
