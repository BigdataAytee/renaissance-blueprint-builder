import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/businesses")({
  component: Businesses,
  head: () => ({
    meta: [
      { title: "Our Businesses — Dynamic Renaissance" },
      { name: "description", content: "Eight integrated business sectors delivering value across Nigeria." },
      { property: "og:url", content: "/businesses" },
    ],
    links: [{ rel: "canonical", href: "/businesses" }],
  }),
});

function Businesses() {
  return (
    <Layout>
      <PageHero eyebrow="Our Businesses" title="One group. Eight integrated business platforms."
        subtitle="Each business is led by domain experts and supported by shared services in finance, HSE, procurement and technology." />

      <section className="section-y">
        <div className="container-wide space-y-16">
          {businesses.map((b, i) => (
            <div key={b.slug} className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
              <div className="[direction:ltr]">
                <div className="size-14 rounded-md bg-primary text-primary-foreground grid place-items-center"><b.icon className="size-7" /></div>
                <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">{b.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg">{b.short}</p>
                <p className="mt-3 text-muted-foreground">
                  Our team combines local operational depth with international best practice to deliver programmes that meet the highest standards of safety, quality and commercial performance.
                </p>
              </div>
              <div className="[direction:ltr] bg-secondary rounded-lg p-8 border border-border">
                <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Capabilities & Services</div>
                <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                  {b.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
