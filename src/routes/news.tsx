import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { news } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: News,
  head: () => ({
    meta: [
      { title: "News & Insights — Dynamic Renaissance" },
      { name: "description", content: "Company news, project updates, industry insight and thought leadership." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
});

function News() {
  const [feature, ...rest] = news;
  return (
    <Layout>
      <PageHero eyebrow="News & Insights" title="Perspectives from across the group."
        subtitle="Announcements, project stories and analysis from our sector leads." />
      <section className="section-y">
        <div className="container-wide grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-lg overflow-hidden bg-secondary border border-border p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{feature.date} · {feature.category} · Featured</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold">{feature.title}</h2>
              <p className="mt-4 text-muted-foreground text-lg">{feature.excerpt}</p>
            </div>
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold">Read the story <ArrowRight className="size-4" /></a>
          </article>
          <div className="grid gap-6">
            {rest.map((n) => (
              <article key={n.slug} className="p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-all">
                <div className="text-xs text-muted-foreground uppercase tracking-[0.15em]">{n.date} · {n.category}</div>
                <h3 className="mt-2 font-extrabold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
