import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/cms/types";
import { fallbackProjects } from "@/lib/cms/fallback-projects";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/projects/")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Dynamic Renaissance" },
      { name: "description", content: "A portfolio of landmark projects delivered across infrastructure, energy, agriculture, logistics and hospitality." },
      { property: "og:title", content: "Projects — Dynamic Renaissance" },
      { property: "og:description", content: "Explore selected projects delivered by Dynamic Renaissance." },
      { property: "og:url", content: absoluteUrl("/projects") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/projects") }],
  }),
});

function Projects() {
  const [cat, setCat] = useState("All");
  // The database is the source of truth; the bundled portfolio only stands in
  // when the query fails or the table has not been seeded yet, so the public
  // page can never render an empty portfolio.
  const { data: projects = fallbackProjects } = useQuery({
    queryKey: ["projects", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects" as never).select("*")
        .eq("is_published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      const rows = (data ?? []) as Project[];
      return rows.length > 0 ? rows : fallbackProjects;
    },
    placeholderData: fallbackProjects,
  });
  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))], [projects]);
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <Layout>
      <PageHero eyebrow="Projects" title="Landmark work, delivered."
        subtitle="A selection of programmes across infrastructure, energy, agriculture, logistics and hospitality." />
      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary"
                }`}>{c}</button>
            ))}
          </div>
          {list.length === 0 ? (
            <div className="mt-10 p-10 text-center text-muted-foreground rounded-lg border border-border">No projects to show yet.</div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group rounded-lg overflow-hidden border border-border bg-background hover:shadow-2xl transition-all">
                  {p.image_url && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={800} height={600} />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">{p.category}{p.location ? ` · ${p.location}` : ""}</div>
                    <h3 className="mt-2 text-xl font-extrabold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                    <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <div><dt className="text-muted-foreground">Value</dt><dd className="font-semibold">{p.value}</dd></div>
                      <div><dt className="text-muted-foreground">Timeline</dt><dd className="font-semibold">{p.timeline}</dd></div>
                      <div><dt className="text-muted-foreground">Client</dt><dd className="font-semibold">{p.client}</dd></div>
                    </dl>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
