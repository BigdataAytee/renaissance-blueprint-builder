import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import type { TeamMember } from "@/lib/cms/types";

export const Route = createFileRoute("/team")({
  component: Team,
  head: () => ({
    meta: [
      { title: "Team — Dynamic Renaissance" },
      { name: "description", content: "Meet the leadership and people behind Dynamic Renaissance." },
      { property: "og:title", content: "Team — Dynamic Renaissance" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
});

function Team() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["team", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members" as never)
        .select("*").eq("is_published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as TeamMember[];
    },
  });

  return (
    <Layout>
      <PageHero eyebrow="Team" title="The people behind Dynamic Renaissance." subtitle="Experienced leadership across infrastructure, energy, agriculture, and commercial ventures." />
      <section className="section-y">
        <div className="container-wide">
          {isLoading ? <div className="text-muted-foreground">Loading…</div> :
            data.length === 0 ? <div className="text-muted-foreground">Team profiles coming soon.</div> :
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((m) => (
                  <div key={m.id} className="rounded-lg border border-border bg-background p-6 text-center">
                    <div className="size-28 mx-auto rounded-full overflow-hidden bg-secondary">
                      {m.photo_url && <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="mt-4 font-extrabold">{m.name}</div>
                    <div className="text-sm text-primary">{m.role}</div>
                    {m.bio && <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>}
                  </div>
                ))}
              </div>
          }
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
