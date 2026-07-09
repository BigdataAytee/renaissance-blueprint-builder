import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Layout, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import { sectorContent, serviceSlideshows } from "@/lib/sector-content";
import { serviceImages } from "@/lib/service-images";
import { CardSlideshow } from "@/components/site/CardSlideshow";


import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const industriesGlobal = [
  "Government & Public Sector", "Oil & Gas", "Power & Utilities", "Manufacturing",
  "Financial Services", "Real Estate", "Agriculture & Agro-Processing", "Logistics & Transport",
  "Hospitality & Tourism", "Retail & FMCG", "Telecommunications", "Mining & Natural Resources",
];

export const Route = createFileRoute("/business-sectors/$slug")({
  component: BusinessSectorDetail,
  head: ({ params }) => {
    const sector = businesses.find((b) => b.slug === params.slug);
    const title = sector ? `${sector.title} — Dynamic Renaissance` : "Business Sector — Dynamic Renaissance";
    const description = sector?.short ?? "Explore Dynamic Renaissance sector capabilities, services, industries served and consultation options.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
});

function BusinessSectorDetail() {
  const { slug } = Route.useParams();
  const sector = businesses.find((item) => item.slug === slug);
  const content = sectorContent[slug];

  if (!sector || !content) {
    return (
      <Layout>
        <section className="section-y pt-40">
          <div className="container-wide">
            <h1 className="text-4xl font-extrabold">Business sector unavailable</h1>
            <p className="mt-3 text-muted-foreground">The requested sector could not be found.</p>
            <Link to="/business-sectors" className="btn-green mt-6"><ArrowLeft className="size-4" /> Back to business sectors</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const SectorIcon = sector.icon;

  return (
    <Layout transparentNav>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-navy text-white pt-32">
        <img src={content.heroImage} alt={sector.title} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30" />
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_15%_20%,color-mix(in_oklab,var(--color-primary)_30%,transparent),transparent),radial-gradient(50%_50%_at_85%_30%,color-mix(in_oklab,var(--color-gold)_20%,transparent),transparent)]" />
        <div className="container-wide relative py-20 md:py-28">
          <Link to="/business-sectors" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors">
            <ArrowLeft className="size-3" /> Business Sectors
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="size-16 rounded-md bg-gold text-navy grid place-items-center shadow-lg">
              <SectorIcon className="size-8" />
            </div>
            <div className="eyebrow text-gold">{sector.title}</div>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold text-balance max-w-5xl leading-[1.05]">
            {content.headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl">{content.valueProp}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-green">Request Consultation <ArrowRight className="size-4" /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white font-semibold hover:bg-white hover:text-navy transition-colors">Get a Quote</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white/80 font-semibold hover:text-gold transition-colors"><Phone className="size-4" /> Contact Us</Link>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Our Services</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Comprehensive capabilities engineered to deliver real outcomes.</h2>
            <p className="mt-5 text-muted-foreground text-lg">Each of our service lines is designed, resourced and delivered by specialists — with a clear focus on measurable benefits for our clients.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.services.map((s) => {
              const Icon = s.icon;
              const images = serviceImages[slug]?.[s.name];
              const keywords = serviceSlideshows[slug]?.[s.name] ?? [];
              const hasBackdrop = (images && images.length > 0) || keywords.length > 0;
              return (
                <div
                  key={s.name}
                  className="group relative overflow-hidden rounded-xl border border-white/10 p-7 text-white shadow-[0_20px_50px_-30px_rgba(13,31,60,0.45)] hover:shadow-[0_30px_80px_-30px_rgba(13,31,60,0.7)] hover:-translate-y-1 transition-all min-h-[420px] flex flex-col"
                >
                  {hasBackdrop ? (
                    <CardSlideshow
                      images={images}
                      keywords={keywords}
                      overlayClassName="bg-gradient-to-t from-navy/95 via-navy/75 to-navy/55 group-hover:from-navy/90 group-hover:via-navy/65 group-hover:to-navy/40 transition-colors duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy" />
                  )}

                  <div className="relative flex flex-col h-full">
                    <div className="size-12 rounded-md bg-gold text-navy grid place-items-center shadow-lg transition-transform group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold drop-shadow">{s.name}</h3>
                    <p className="mt-3 text-sm text-white/85 leading-relaxed">{s.description}</p>
                    <div className="mt-auto pt-5 border-t border-white/15">
                      <div className="text-[11px] uppercase tracking-[0.15em] text-gold font-semibold">Key Benefits</div>
                      <ul className="mt-3 space-y-1.5">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-xs text-white/90"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold" />{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <div className="eyebrow">Industries We Serve</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Trusted across the sectors that power the economy.</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Our {sector.title.toLowerCase()} practice supports a broad spectrum of industries — from public institutions and infrastructure operators to industrial giants, financial institutions and fast-growing SMEs. Every engagement is shaped by the operating realities of the sector we serve.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industriesGlobal.map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-border bg-secondary px-4 py-3">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-secondary">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="lg:sticky lg:top-32">
            <div className="eyebrow">Frequently Asked Questions</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Answers to the questions our clients ask most.</h2>
            <p className="mt-5 text-muted-foreground">Can't find what you're looking for? Our industry experts are happy to answer any additional questions.</p>
            <Link to="/contact" className="btn-green mt-6">Speak with an Expert <ArrowRight className="size-4" /></Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-extrabold text-base hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
