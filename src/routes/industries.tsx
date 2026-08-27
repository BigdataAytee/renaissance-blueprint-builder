import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { industries } from "@/lib/site-data";
import { CheckCircle2 } from "lucide-react";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/industries")({
  component: Industries,
  head: () => ({
    meta: [
      { title: "Industries — Dynamic Renaissance" },
      { name: "description", content: "Sixteen industries served across the wider economy." },
      { property: "og:url", content: absoluteUrl("/industries") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/industries") }],
  }),
});

function Industries() {
  return (
    <Layout>
      <PageHero eyebrow="Industries Served" title="Sixteen industries. One trusted partner."
        subtitle="Whether you operate in energy, agriculture, real estate or the public sector — our teams speak your language." />
      <section className="section-y">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <div key={i} className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all">
              <CheckCircle2 className="size-5 text-primary" />
              <h3 className="mt-3 font-extrabold text-lg">{i}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Deep sector experience with a dedicated delivery team.</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
