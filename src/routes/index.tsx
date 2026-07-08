import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Layout, CTA } from "@/components/site/Layout";
import { Counter } from "@/components/site/Counter";
import {
  company, stats, businesses,
  heroImg,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dynamic Renaissance Biz Ents. Ltd. — Building Today. Transforming Tomorrow." },
      { name: "description", content: "A diversified enterprise group delivering integrated solutions across infrastructure, oil & gas, agriculture, logistics, manufacturing and commercial services." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function Home() {
  return (
    <Layout transparentNav>
      {/* HERO */}
      <section className="relative min-h-[94vh] flex items-center text-white overflow-hidden">
        <img src={heroImg} alt="Modern corporate tower" className="absolute inset-0 w-full h-full object-cover scale-105" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/70 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-navy/40" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 [background:radial-gradient(50%_50%_at_15%_30%,color-mix(in_oklab,var(--color-primary)_35%,transparent),transparent)]" />
        <div className="absolute -top-20 -right-20 size-[600px] rounded-full bg-gold/15 blur-3xl" />
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

        <div className="container-wide relative pt-32 pb-32">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-xs uppercase tracking-[0.24em] text-gold font-bold">
              <span className="size-1.5 rounded-full bg-gold animate-pulse" /> Diversified Enterprise Group
            </div>
            <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] text-balance tracking-tight">
              Building Today.<br />
              <span className="bg-gradient-to-r from-gold via-[oklch(0.85_0.14_85)] to-gold bg-clip-text text-transparent">Transforming</span> Tomorrow.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">{company.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/business-sectors" className="btn-gold">Explore Our Businesses <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="btn-outline-white">Contact Us</Link>
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <div className="absolute bottom-0 inset-x-0 hidden md:block">
          <div className="container-wide">
            <div className="grid grid-cols-3 lg:grid-cols-6 bg-white/8 backdrop-blur-xl border border-white/15 border-b-0 rounded-t-2xl overflow-hidden shadow-2xl">
              {stats.map((s, i) => (
                <div key={i} className="p-6 text-center border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors">
                  <div className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-br from-gold to-[oklch(0.62_0.14_78)] bg-clip-text text-transparent"><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/70 mt-2 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* BUSINESSES */}
      <section className="relative section-y bg-gradient-to-b from-background via-secondary/50 to-background overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="eyebrow">Our Businesses</div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold text-balance tracking-tight">Integrated capability across <span className="text-primary">vital sectors</span>.</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed max-w-2xl">One partner — from planning and construction to operations, logistics, energy and consultancy.</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((b, i) => (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link to="/business-sectors/$slug" params={{ slug: b.slug }} className="card-elevated block p-7 h-full group relative">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    className="size-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary grid place-items-center group-hover:from-primary group-hover:to-primary-dark group-hover:text-primary-foreground transition-all duration-500 shadow-sm group-hover:shadow-lg"
                    initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 180, damping: 14, delay: i * 0.08 }}
                    whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
                  >
                    <b.icon className="size-7" />
                  </motion.div>
                  <h3 className="mt-6 text-lg font-extrabold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{b.short}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="size-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      <CTA />
    </Layout>
  );
}
