import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { motion } from "framer-motion";
import { company, coreValues, executiveTeam, stats, whyChoose, industries } from "@/lib/site-data";
import { Counter } from "@/components/site/Counter";
import aboutTeam from "@/assets/about-team.jpg";
import { ShieldCheck, Target, Eye, Compass, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Dynamic Renaissance Biz Ents. Ltd." },
      { name: "description", content: "Our story, mission, values and leadership across vital business sectors." },
      { property: "og:description", content: "Learn about the history, mission, values and leadership of Dynamic Renaissance." },
      { property: "og:title", content: "About Dynamic Renaissance" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <Layout>
      <PageHero eyebrow="About the Group" title="A diversified enterprise group built on integrity, engineering and enterprise."
        subtitle={company.description} />

      <section className="section-y">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <motion.img initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            src={aboutTeam} alt="Team" className="rounded-lg shadow-xl" loading="lazy" />
          <div>
            <div className="eyebrow">Our Story</div>
            <h2 className="mt-4 text-4xl font-extrabold">From a founding vision to a diversified platform.</h2>
            <p className="mt-4 text-muted-foreground">
              Dynamic Renaissance Biz Ents. Ltd. is a private limited liability company registered under the Companies and Allied Matters Act (CAMA), 1990. From day one our founders set out to build a modern diversified conglomerate — one that competes on quality, safety, sustainability and delivery.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today the group operates across infrastructure, project management, oil and gas, agriculture, logistics, manufacturing, hospitality, industrial services, business consulting and commercial trading, working with institutional clients, government agencies and multinational partners.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT THE GROUP */}
      <section className="section-y bg-background">
        <div className="container-wide grid gap-14 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <img src={aboutTeam} alt="Executive team" className="rounded-lg shadow-2xl" width={1280} height={960} loading="lazy" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-gold text-navy p-6 rounded-lg shadow-xl max-w-xs">
              <div className="text-4xl font-extrabold">15+</div>
              <div className="text-sm font-semibold">Years of combined leadership across vital business sectors.</div>
            </div>
          </motion.div>
          <div>
            <div className="eyebrow">About the Group</div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-balance">A conglomerate built for the next generation of growth.</h2>
            <p className="mt-5 text-muted-foreground">
              Registered under the Companies and Allied Matters Act (CAMA) 1990, Dynamic Renaissance Biz Ents. Ltd. is a private limited liability company delivering innovative, sustainable and high-quality solutions across a diversified portfolio of industries.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                { t: "Mission", d: "Deliver excellence across every sector we operate in." },
                { t: "Vision", d: "Be a trusted diversified enterprise known for durable value." },
                { t: "Values", d: "Integrity, innovation, sustainability and partnership." },
              ].map((v) => (
                <div key={v.t} className="border-l-2 border-gold pl-4">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">{v.t}</div>
                  <div className="mt-1 text-sm text-foreground">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-wide grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, t: "Mission", d: "To deliver innovative, sustainable and high-quality solutions that contribute meaningfully to economic growth and client success." },
            { icon: Eye, t: "Vision", d: "To be recognised as a trusted diversified enterprise and a benchmark for corporate excellence." },
            { icon: Compass, t: "Core Values", d: "Integrity. Innovation. Excellence. Sustainability. Partnership. Accountability." },
          ].map((v) => (
            <div key={v.t} className="p-8 rounded-lg bg-background border border-border">
              <div className="size-12 rounded-md bg-primary text-primary-foreground grid place-items-center"><v.icon className="size-6" /></div>
              <h3 className="mt-5 text-2xl font-extrabold">{v.t}</h3>
              <p className="mt-2 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow text-gold">By the Numbers</div>
            <h2 className="mt-4 text-4xl font-extrabold">A record measured in outcomes.</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="p-6 rounded-lg bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-extrabold text-gold"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Core Values</div>
            <h2 className="mt-4 text-4xl font-extrabold">The principles behind every decision.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <div key={value.title} className="p-7 rounded-lg bg-background border border-border">
                <h3 className="text-xl font-extrabold">{value.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Executive Team</div>
            <h2 className="mt-4 text-4xl font-extrabold">Experienced leadership across the group.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {executiveTeam.map((leader) => (
              <div key={leader.name} className="p-7 rounded-lg border border-border bg-secondary">
                <div className="size-14 rounded-md bg-primary text-primary-foreground grid place-items-center font-display font-extrabold">
                  {leader.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{leader.name}</h3>
                <div className="mt-1 text-sm font-semibold text-primary">{leader.role}</div>
                <p className="mt-3 text-sm text-muted-foreground">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="mt-4 text-4xl font-extrabold">A corporate partner built for complex assignments.</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div key={item.title} className="p-6 rounded-lg bg-background border border-border">
                <item.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
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

      <section className="section-y">
        <div className="container-wide grid md:grid-cols-2 gap-10">
          {[
            { t: "Chairman's Message", d: "Markets are changing quickly. Our role as builders, operators and investors is to accelerate responsible growth — ambitiously and in service of the communities we operate in." },
            { t: "Managing Director's Message", d: "Discipline, safety and delivery are non-negotiable. Every engagement we accept comes with a commitment to on-time, on-budget outcomes measured against transparent benchmarks." },
          ].map((m) => (
            <div key={m.t} className="p-8 rounded-lg border border-border bg-secondary">
              <ShieldCheck className="size-8 text-primary" />
              <h3 className="mt-4 text-2xl font-extrabold">{m.t}</h3>
              <p className="mt-3 text-muted-foreground italic">"{m.d}"</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
