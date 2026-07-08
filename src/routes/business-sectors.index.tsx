import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/business-sectors/")({
  component: Businesses,
  head: () => ({
    meta: [
      { title: "Business Sectors — Dynamic Renaissance" },
      { name: "description", content: "Eight integrated business sectors delivering infrastructure, energy, agriculture, logistics, manufacturing, industrial, hospitality and advisory solutions." },
      { property: "og:title", content: "Business Sectors — Dynamic Renaissance" },
      { property: "og:description", content: "Explore the company's diversified business platforms and sector capabilities." },
      { property: "og:url", content: "/business-sectors" },
    ],
    links: [{ rel: "canonical", href: "/business-sectors" }],
  }),
});

function Businesses() {
  return (
    <Layout>
      <PageHero eyebrow="Business Sectors" title="One group. Eight integrated business platforms."
        subtitle="Each business is led by domain experts and supported by shared services in finance, HSE, procurement and technology." />

      <section className="section-y">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((b) => (
            <Link key={b.slug} to="/business-sectors/$slug" params={{ slug: b.slug }} className="card-elevated p-6 group">
              <div>
                <div className="size-14 rounded-md bg-primary text-primary-foreground grid place-items-center"><b.icon className="size-7" /></div>
                <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">{b.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg">{b.short}</p>
              </div>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Capabilities & Services</div>
                <ul className="mt-4 grid gap-2.5">
                  {b.services.slice(0, 5).map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  View sector page <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
