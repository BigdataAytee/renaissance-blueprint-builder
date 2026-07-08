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
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link to="/business-sectors/$slug" params={{ slug: b.slug }} className="card-elevated block p-6 h-full group">
                  <motion.div
                    className="size-12 rounded-md bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 180, damping: 14, delay: i * 0.08 }}
                    whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
                  >
                    <b.icon className="size-6" />
                  </motion.div>
                  <h3 className="mt-5 text-lg font-extrabold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{b.short}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
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
