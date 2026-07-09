import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, PlayCircle } from "lucide-react";
import { Layout, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import { sectorContent, type SectorMediaCard } from "@/lib/sector-content";
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS & SOLUTIONS IN MOTION */}
      <section className="section-y">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Products & Solutions in Motion</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">See the products, materials and services behind the work.</h2>
            <p className="mt-5 text-muted-foreground text-lg">Cinematic snapshots of the equipment, commodities and operations that power our {sector.title.toLowerCase()} practice.</p>
          </div>
          <div className="mt-14 space-y-16">
            {content.mediaShowcase.map((card, i) => (
              <MediaShowcaseRow
                key={card.title}
                card={card}
                index={i}
                videoWebm={sector.videoWebm}
                videoMp4={sector.video}
                fallbackImage={content.heroImage}
              />
            ))}
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

function MediaShowcaseRow({
  card,
  index,
  videoWebm,
  videoMp4,
  fallbackImage,
}: {
  card: SectorMediaCard;
  index: number;
  videoWebm: string;
  videoMp4: string;
  fallbackImage: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const reverse = index % 2 === 1;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNearViewport(true); return; }
    const near = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setNearViewport(true); near.disconnect(); } },
      { rootMargin: "500px 0px" },
    );
    const vis = new IntersectionObserver(
      ([e]) => setInViewport(e.isIntersecting),
      { threshold: 0.25 },
    );
    near.observe(el);
    vis.observe(el);
    return () => { near.disconnect(); vis.disconnect(); };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inViewport) v.play().catch(() => {});
    else v.pause();
  }, [inViewport, loaded]);

  return (
    <div ref={wrapRef} className={`grid gap-8 lg:gap-14 items-center lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-2xl bg-navy">
        {nearViewport && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onLoadedData={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} motion-safe:[animation:kenburns_20s_ease-in-out_infinite_alternate]`}
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        )}
        <img
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-navy/30 to-transparent" />
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
          <PlayCircle className="size-3.5 text-gold" /> Live footage
        </div>
      </div>

      {/* Text */}
      <div>
        <div className="eyebrow">Featured capability</div>
        <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-balance leading-tight">{card.title}</h3>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">{card.caption}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {card.products.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold">
              <CheckCircle2 className="size-3 text-primary" /> {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

