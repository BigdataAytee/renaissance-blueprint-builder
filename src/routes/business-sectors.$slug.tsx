import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Layout, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import {
  sectorContent, whyChooseCards, processSteps, industriesGlobal,
  safetyPillars, clientBenefits,
} from "@/lib/sector-content";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

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
      {/* 1. HERO */}
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

      {/* 2. INDUSTRY OVERVIEW */}
      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div>
            <div className="eyebrow">Industry Overview</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Depth, discipline and delivery excellence across {sector.title.toLowerCase()}.</h2>
            <div className="mt-6 space-y-5 text-muted-foreground text-lg leading-relaxed">
              {content.overviewParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="overflow-hidden rounded-lg border border-border shadow-lg">
              <img src={content.heroImage} alt={`${sector.title} operations`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-lg border border-border bg-secondary p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Our Expertise</div>
              <ul className="mt-4 space-y-3">
                {content.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container-wide mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-background p-6 text-center">
              <div className="text-4xl font-extrabold text-primary">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR SERVICES */}
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
              return (
                <div key={s.name} className="group rounded-lg border border-border bg-background p-7 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="size-12 rounded-md bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold">{s.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <div className="mt-5 pt-5 border-t border-border">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold">Key Benefits</div>
                    <ul className="mt-3 space-y-1.5">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Industries</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.industries.map((i) => (
                        <span key={i} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground border border-border">{i}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE */}
      <section className="section-y">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Why Choose Dynamic Renaissance</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">A trusted partner clients rely on year after year.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {whyChooseCards.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-lg border border-border bg-background p-6 hover:border-primary transition-colors">
                  <div className="size-11 rounded-md bg-navy text-white grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-extrabold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS */}
      <section className="section-y bg-navy text-white">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow text-gold">Our Process</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">A structured delivery journey — from consultation to ongoing support.</h2>
          </div>
          <div className="mt-12 relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-xs font-mono text-gold">STEP {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-3 size-11 rounded-md bg-gold text-navy grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-extrabold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES WE SERVE */}
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

      {/* 7. EQUIPMENT, TECHNOLOGY & INNOVATION */}
      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Equipment, Technology & Innovation</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Modern tools and methods that raise the bar on delivery.</h2>
            <p className="mt-5 text-muted-foreground text-lg">We invest continuously in the equipment, software and operating methods that let our teams deliver safely, efficiently and to the highest standards.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.equipment.map((e) => (
              <div key={e.title} className="rounded-lg border border-border bg-background p-6">
                <h3 className="font-extrabold">{e.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SAFETY, QUALITY & COMPLIANCE */}
      <section className="section-y">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Safety, Quality & Compliance</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Non-negotiable standards on every engagement.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safetyPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-lg border-l-4 border-l-primary border border-border bg-background p-7">
                  <div className="flex items-center gap-3">
                    <Icon className="size-6 text-primary" />
                    <h3 className="font-extrabold text-lg">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. BENEFITS TO CLIENTS */}
      <section className="section-y bg-gold/10">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Benefits to Clients</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Real, measurable value at every stage of the partnership.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {clientBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="rounded-lg bg-background border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="size-11 rounded-md bg-gold text-navy grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-extrabold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section-y">
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

      {/* 11. CTA */}
      <CTA />
    </Layout>
  );
}
