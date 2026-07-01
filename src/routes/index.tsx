import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
import { Layout, CTA } from "@/components/site/Layout";
import { Counter } from "@/components/site/Counter";
import {
  company, stats, businesses, whyChoose, industries,
  projects, testimonials, news, heroImg,
} from "@/lib/site-data";
import aboutTeam from "@/assets/about-team.jpg";
import sustainImg from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dynamic Renaissance Biz Ents. Ltd. — Building Today. Transforming Tomorrow." },
      { name: "description", content: "A diversified Nigerian enterprise delivering integrated solutions across infrastructure, oil & gas, agriculture, logistics, manufacturing and commercial services." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
              <span className="w-8 h-px bg-gold" /> Diversified Nigerian Enterprise
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[0.98] text-balance">
              Building Today.<br />
              <span className="text-gold">Transforming</span> Tomorrow.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">{company.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/businesses" className="btn-gold">Explore Our Businesses <ArrowRight className="size-4" /></Link>
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

      {/* ABOUT PREVIEW */}
      <section className="section-y bg-background">
        <div className="container-wide grid gap-14 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <img src={aboutTeam} alt="Executive team" className="rounded-lg shadow-2xl" width={1280} height={960} loading="lazy" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-gold text-navy p-6 rounded-lg shadow-xl max-w-xs">
              <div className="text-4xl font-extrabold">15+</div>
              <div className="text-sm font-semibold">Years of combined leadership across Nigeria's most vital sectors.</div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="eyebrow">About the Group</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">A Nigerian conglomerate built for the next generation of growth.</h2>
            <p className="mt-5 text-muted-foreground">
              Registered under the Companies and Allied Matters Act (CAMA) 1990, Dynamic Renaissance Biz Ents. Ltd. is a private limited liability company delivering innovative, sustainable and high-quality solutions across a diversified portfolio of industries.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                { t: "Mission", d: "Deliver excellence across every sector we operate in." },
                { t: "Vision", d: "Be Nigeria's most trusted diversified enterprise." },
                { t: "Values", d: "Integrity, innovation, sustainability and partnership." },
              ].map((v) => (
                <div key={v.t} className="border-l-2 border-gold pl-4">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">{v.t}</div>
                  <div className="mt-1 text-sm text-foreground">{v.d}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Read our full story <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section id="businesses" className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">Our Businesses</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Integrated capability across Nigeria's most vital sectors.</h2>
            <p className="mt-4 text-muted-foreground text-lg">One partner — from planning and construction to operations, logistics, energy and consultancy.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((b, i) => (
              <motion.div key={b.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Link to="/businesses" className="card-elevated block p-6 h-full group">
                  <div className="size-12 rounded-md bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <b.icon className="size-6" />
                  </div>
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

      {/* WHY CHOOSE */}
      <section className="section-y bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto">
            <div className="eyebrow justify-center">Why Dynamic Renaissance</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Ten reasons global and local clients partner with us.</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w) => (
              <div key={w.title} className="p-6 rounded-lg border border-border hover:border-gold hover:shadow-lg transition-all group">
                <div className="size-11 rounded-full bg-accent text-primary grid place-items-center group-hover:bg-gold group-hover:text-navy transition-colors">
                  <w.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-extrabold">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-y bg-navy text-navy-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_90%_10%,color-mix(in_oklab,var(--color-primary)_40%,transparent),transparent)]" />
        <div className="container-wide relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="eyebrow text-gold">Featured Projects</div>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Delivering landmark work across Nigeria.</h2>
            </div>
            <Link to="/projects" className="btn-outline-white self-start">View all projects <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p) => (
              <Link key={p.slug} to="/projects" className="group block overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-gold/60 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.location}</div>
                  <h3 className="mt-2 text-xl font-extrabold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-y bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="eyebrow">Industries Served</div>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Trusted across sixteen industries.</h2>
              <p className="mt-4 text-muted-foreground">From federal government agencies to SMEs, our clients rely on our sector depth and delivery discipline.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {industries.map((i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-md bg-secondary border border-border">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="section-y bg-secondary">
        <div className="container-wide grid gap-14 lg:grid-cols-2 items-center">
          <div>
            <div className="eyebrow">Sustainability</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">Growth that respects communities and the environment.</h2>
            <p className="mt-4 text-muted-foreground">
              Sustainability is embedded in how we design projects, source materials, employ people and engage with the communities where we operate.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {["Environmental Responsibility","Community Development","Renewable Energy","Ethical Business","Employee Welfare","Health & Safety","Corporate Governance","ESG Commitment"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-primary" />{t}</li>
              ))}
            </ul>
            <Link to="/sustainability" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Read our ESG commitment <ArrowRight className="size-4" />
            </Link>
          </div>
          <img src={sustainImg} alt="Renewable energy" className="rounded-lg shadow-2xl" width={1600} height={1000} loading="lazy" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y bg-background">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center">Client Voices</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold">What partners say.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-lg bg-secondary border border-border relative">
                <Quote className="absolute top-6 right-6 size-8 text-gold/40" />
                <div className="flex gap-1 text-gold">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current" />)}</div>
                <p className="mt-4 text-foreground/90">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="font-extrabold">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="eyebrow">News & Insights</div>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold">Latest thinking.</h2>
            </div>
            <Link to="/news" className="btn-green">All articles <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <article key={n.slug} className="card-elevated p-7">
                <div className="text-xs text-muted-foreground uppercase tracking-[0.15em]">{n.date} · {n.category}</div>
                <h3 className="mt-3 text-lg font-extrabold leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <Link to="/news" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight className="size-3.5" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
