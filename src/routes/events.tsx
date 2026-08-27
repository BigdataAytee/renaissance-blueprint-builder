import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/cms/types";

export const Route = createFileRoute("/events")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Events — Dynamic Renaissance" },
      { name: "description", content: "Upcoming events, industry forums and stakeholder gatherings hosted by Dynamic Renaissance." },
      { property: "og:title", content: "Events — Dynamic Renaissance" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
});

function Events() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["events", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events" as never)
        .select("*").eq("is_published", true).order("starts_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as EventItem[];
    },
  });

  return (
    <Layout>
      <PageHero eyebrow="Events" title="Where we're gathering next." subtitle="Industry forums, launches, and community events across the group." />
      <section className="section-y">
        <div className="container-wide">
          {isLoading ? <div className="text-muted-foreground">Loading…</div> :
            data.length === 0 ? <div className="text-muted-foreground">No events scheduled right now.</div> :
              <div className="space-y-6">
                {data.map((e) => (
                  <article key={e.id} className="grid md:grid-cols-[240px_1fr] gap-6 p-6 rounded-lg border border-border bg-background">
                    {e.cover_url ? (
                      <img src={e.cover_url} alt={e.title} className="w-full h-40 md:h-full object-cover rounded" loading="lazy" width={240} height={160} />
                    ) : (
                      <div className="bg-secondary rounded p-6 flex flex-col items-center justify-center">
                        <CalendarDays className="size-8 text-primary" />
                        <div className="mt-2 font-extrabold text-lg">{new Date(e.starts_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>
                        <div className="text-xs text-muted-foreground">{new Date(e.starts_at).getFullYear()}</div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-extrabold">{e.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />{new Date(e.starts_at).toLocaleString()}</span>
                        {e.location && <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{e.location}</span>}
                      </div>
                      {e.description && <p className="mt-3 text-sm text-foreground/80">{e.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
          }
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
