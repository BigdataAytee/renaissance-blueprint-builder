import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { projects } from "@/lib/site-data";
import { useState } from "react";

const cats = ["All", "Construction", "Oil & Gas", "Agriculture", "Logistics", "Hospitality", "Manufacturing"];

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Dynamic Renaissance" },
      { name: "description", content: "A portfolio of landmark projects delivered across Nigeria." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function Projects() {
  const [cat, setCat] = useState("All");
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
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <article key={p.slug} className="group rounded-lg overflow-hidden border border-border bg-background hover:shadow-2xl transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">{p.category} · {p.location}</div>
                  <h3 className="mt-2 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div><dt className="text-muted-foreground">Value</dt><dd className="font-semibold">{p.value}</dd></div>
                    <div><dt className="text-muted-foreground">Timeline</dt><dd className="font-semibold">{p.timeline}</dd></div>
                    <div><dt className="text-muted-foreground">Client</dt><dd className="font-semibold">{p.client}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
