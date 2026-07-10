import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import type { GalleryImage } from "@/lib/cms/types";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Dynamic Renaissance" },
      { name: "description", content: "A visual look at our projects, teams and operations across sectors." },
      { property: "og:title", content: "Gallery — Dynamic Renaissance" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

function Gallery() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["gallery", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images" as never)
        .select("*").eq("is_published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as GalleryImage[];
    },
  });

  return (
    <Layout>
      <PageHero eyebrow="Gallery" title="Moments from across the group." subtitle="Projects delivered, teams at work, milestones reached." />
      <section className="section-y">
        <div className="container-wide">
          {isLoading ? <div className="text-muted-foreground">Loading…</div> :
            data.length === 0 ? <div className="text-muted-foreground">No images yet.</div> :
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((g) => (
                  <figure key={g.id} className="group rounded-lg overflow-hidden border border-border bg-background">
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img src={g.image_url} alt={g.caption} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    {g.caption && <figcaption className="p-3 text-sm text-muted-foreground">{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
          }
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
