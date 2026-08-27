import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Layout, CTA } from "@/components/site/Layout";
import { Counter } from "@/components/site/Counter";
import {
  company, stats, businesses,
  heroImg,
} from "@/lib/site-data";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dynamic Renaissance Biz Ents. Ltd. — Building Today. Transforming Tomorrow." },
      { name: "description", content: "A diversified enterprise group delivering integrated solutions across infrastructure, oil & gas, agriculture, logistics, manufacturing and commercial services." },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

type Sector = (typeof businesses)[number];

function HomeSectorCard({ b, index }: { b: Sector; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "650px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inViewport, loaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        ref={cardRef}
        to="/business-sectors/$slug"
        params={{ slug: b.slug }}
        className="group relative block h-[360px] overflow-hidden rounded-xl border border-white/10 bg-navy shadow-[0_20px_60px_-30px_rgba(13,31,60,0.65)] transition-shadow hover:shadow-[0_30px_80px_-30px_rgba(13,31,60,0.8)]"
      >
        {nearViewport && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedData={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} motion-safe:[animation:kenburns_18s_ease-in-out_infinite_alternate]`}
          >
            <source src={b.videoWebm} type="video/webm" />
            <source src={b.video} type="video/mp4" />
          </video>
        )}

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 15% 15%, color-mix(in oklab, var(--color-primary) 42%, transparent), transparent), radial-gradient(55% 55% at 85% 25%, color-mix(in oklab, var(--color-gold) 30%, transparent), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/68 to-navy/30 transition-colors duration-500 group-hover:from-navy/86 group-hover:via-navy/54 group-hover:to-navy/18" />

        <div className="relative flex h-full flex-col justify-between p-6 text-white">
          <motion.div
            className="grid size-13 place-items-center rounded-md bg-gold text-navy shadow-lg"
            initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: index * 0.08 }}
            whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.08, transition: { duration: 0.6 } }}
          >
            <b.icon className="size-6" />
          </motion.div>

          <div>
            <h3 className="text-xl font-extrabold text-balance drop-shadow-lg">{b.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{b.short}</p>
            <ul className="mt-4 grid gap-1.5">
              {b.services.slice(0, 2).map((service) => (
                <li key={service} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="size-3.5 shrink-0 text-gold" />
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all group-hover:gap-2.5">
              Learn more <ArrowRight className="size-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Home() {
  return (
    <Layout transparentNav>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center text-white overflow-hidden">
        <img src={heroImg} alt="Modern corporate tower" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/95" />
        <div className="absolute inset-0 [background:radial-gradient(50%_50%_at_20%_30%,color-mix(in_oklab,var(--color-primary)_35%,transparent),transparent)]" />
        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1.5 rounded-full bg-gold/40"
              initial={{ x: `${(i * 53) % 100}%`, y: "110%", opacity: 0 }}
              animate={{ y: "-10%", opacity: [0, 1, 0] }}
              transition={{ duration: 10 + (i % 6), repeat: Infinity, delay: i * 0.4, ease: "linear" }}
            />
          ))}
        </div>

        <div className="container-wide relative pt-32 pb-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold font-semibold">
              <span className="w-8 h-px bg-gold" /> Diversified Enterprise Group
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[0.98] text-balance">
              Building Today.<br />
              <span className="text-gold">Transforming</span> Tomorrow.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">{company.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/business-sectors" className="btn-gold">Explore Our Businesses <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="btn-outline-white">Contact Us</Link>
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <div className="absolute bottom-0 inset-x-0 hidden md:block">
          <div className="container-wide">
            <div className="grid grid-cols-3 lg:grid-cols-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-t-xl overflow-hidden">
              {stats.map((s, i) => (
                <div key={i} className="p-5 text-center border-r border-white/10 last:border-r-0">
                  <div className="text-2xl lg:text-3xl font-extrabold text-gold"><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* BUSINESSES */}
      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Our Businesses</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Integrated capability across vital business sectors.</h2>
            <p className="mt-4 text-muted-foreground text-lg">One partner — from planning and construction to operations, logistics, energy and consultancy.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((b, i) => (
              <HomeSectorCard key={b.slug} b={b} index={i} />
            ))}
          </div>
        </div>
      </section>


      <CTA />
    </Layout>
  );
}
