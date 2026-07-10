import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { businesses } from "@/lib/site-data";
import { SectorCardBackground } from "@/components/site/SectorCardBackground";
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

type Sector = (typeof businesses)[number];

function SectorCard({ b, index }: { b: Sector; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load video when near viewport (lazy) using a generous rootMargin.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNearViewport(true); obs.disconnect(); } },
      { rootMargin: "400px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Play/pause based on true visibility to conserve resources.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inViewport) v.play().catch(() => {});
    else v.pause();
  }, [inViewport, loaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        ref={cardRef}
        to="/business-sectors/$slug"
        params={{ slug: b.slug }}
        className="group relative block h-[440px] overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_60px_-30px_rgba(13,31,60,0.6)] hover:shadow-[0_30px_80px_-30px_rgba(13,31,60,0.75)] transition-shadow"
      >
        {/* Video background */}
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} motion-safe:[animation:kenburns_18s_ease-in-out_infinite_alternate]`}
          >
            <source src={b.videoWebm} type="video/webm" />
            <source src={b.video} type="video/mp4" />
          </video>
        )}
        {/* Fallback / poster background — always in DOM so it's the graceful fallback */}
        <div
          className={`absolute inset-0 bg-navy transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage: "radial-gradient(60% 60% at 15% 15%, color-mix(in oklab, var(--color-primary) 40%, transparent), transparent), radial-gradient(50% 50% at 85% 30%, color-mix(in oklab, var(--color-gold) 30%, transparent), transparent)",
          }}
        />

        {/* Dark overlay for readability — lightens slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40 group-hover:from-navy/85 group-hover:via-navy/55 group-hover:to-navy/25 transition-colors duration-500" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-7 text-white">
          <motion.div
            className="size-14 rounded-md bg-gold text-navy grid place-items-center shadow-lg"
            initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: index * 0.08 }}
            whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.08, transition: { duration: 0.6 } }}
          >
            <b.icon className="size-7" />
          </motion.div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-balance drop-shadow-lg">{b.title}</h2>
            <p className="mt-3 text-white/85 text-sm leading-relaxed line-clamp-2">{b.short}</p>
            <ul className="mt-5 hidden sm:grid gap-1.5">
              {b.services.slice(0, 3).map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs text-white/80"><CheckCircle2 className="size-3.5 text-gold shrink-0" />{s}</li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all">
              View sector page <ArrowRight className="size-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Businesses() {
  return (
    <Layout>
      <PageHero eyebrow="Business Sectors" title="One group. Eight integrated business platforms."
        subtitle="Each business is led by domain experts and supported by shared services in finance, HSE, procurement and technology." />

      <section className="section-y">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businesses.map((b, i) => (
            <SectorCard key={b.slug} b={b} index={i} />
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
