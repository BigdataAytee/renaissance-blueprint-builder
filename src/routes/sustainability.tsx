import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import sustainImg from "@/assets/sustainability.jpg";
import { Leaf, Users, Zap, ShieldCheck, HeartHandshake, Scale } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  component: Sustainability,
  head: () => ({
    meta: [
      { title: "Sustainability — Dynamic Renaissance" },
      { name: "description", content: "Our ESG commitment: environment, community, governance and people." },
      { property: "og:url", content: "/sustainability" },
    ],
    links: [{ rel: "canonical", href: "/sustainability" }],
  }),
});

const pillars = [
  { icon: Leaf, t: "Environmental Responsibility", d: "Reducing emissions, waste and resource intensity across every operation." },
  { icon: Users, t: "Community Development", d: "Local employment, skills transfer and long-term community programmes." },
  { icon: Zap, t: "Renewable Energy", d: "Deploying solar and hybrid systems across our sites and client projects." },
  { icon: ShieldCheck, t: "Health & Safety", d: "Zero-harm culture underpinned by rigorous training and audits." },
  { icon: HeartHandshake, t: "Employee Welfare", d: "Fair employment, learning, wellbeing and inclusive workplaces." },
  { icon: Scale, t: "Corporate Governance", d: "Transparent, accountable governance aligned to global standards." },
];

function Sustainability() {
  return (
    <Layout>
      <PageHero eyebrow="Sustainability" title="Growth that is measurable, ethical and durable."
        subtitle="Our ESG commitment shapes every capital allocation, project decision and community engagement." />
      <section className="section-y">
        <div className="container-wide grid gap-14 lg:grid-cols-2 items-center">
          <img src={sustainImg} alt="Renewable energy" className="rounded-lg shadow-xl" loading="lazy" />
          <div>
            <h2 className="text-4xl font-extrabold">An ESG framework built for Nigeria's realities.</h2>
            <p className="mt-4 text-muted-foreground">
              We align our operations to internationally recognised standards while responding to the specific environmental, social and governance priorities of the markets we operate in.
            </p>
          </div>
        </div>
      </section>
      <section className="section-y bg-secondary">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.t} className="p-8 rounded-lg bg-background border border-border">
              <div className="size-12 rounded-md bg-primary text-primary-foreground grid place-items-center"><p.icon className="size-6" /></div>
              <h3 className="mt-5 text-xl font-extrabold">{p.t}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
