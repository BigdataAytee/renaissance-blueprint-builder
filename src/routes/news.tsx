import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import type { NewsPost } from "@/lib/cms/types";

export const Route = createFileRoute("/news")({
  component: NewsList,
  head: () => ({
    meta: [
      { title: "News — Dynamic Renaissance" },
      { name: "description", content: "Latest news, announcements and updates from Dynamic Renaissance Biz Ents. Ltd." },
      { property: "og:title", content: "News — Dynamic Renaissance" },
      { property: "og:description", content: "Latest news and announcements from across our business sectors." },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
});

function NewsList() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["news", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news_posts" as never)
        .select("*").eq("is_published", true).order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as NewsPost[];
    },
  });

  return (
    <Layout>
      <PageHero eyebrow="News" title="Latest from Dynamic Renaissance." subtitle="Announcements, milestones and stories from across the group." />
      <section className="section-y">
        <div className="container-wide">
          {isLoading ? <div className="text-muted-foreground">Loading…</div> :
            data.length === 0 ? <div className="text-muted-foreground">No posts yet. Check back soon.</div> :
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((p) => (
                  <Link key={p.id} to="/news/$slug" params={{ slug: p.slug }} className="group block rounded-lg border border-border bg-background overflow-hidden hover:shadow-lg transition">
                    <div className="aspect-video bg-secondary overflow-hidden">
                      {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" width={800} height={450} />}
                    </div>
                    <div className="p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : ""}</div>
                      <h3 className="mt-2 font-extrabold text-lg text-balance">{p.title}</h3>
                      {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
          }
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
