import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { GraduationCap, Users, TrendingUp, Heart } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: Careers,
  head: () => ({
    meta: [
      { title: "Careers — Dynamic Renaissance" },
      { name: "description", content: "Build your career at one of Nigeria's most ambitious diversified enterprises." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
});

const vacancies = [
  { role: "Project Manager — Infrastructure", loc: "Abuja", type: "Full-time" },
  { role: "HSE Officer — Downstream", loc: "Port Harcourt", type: "Full-time" },
  { role: "Agronomist — Grain Operations", loc: "Kaduna", type: "Full-time" },
  { role: "Fleet Operations Lead", loc: "Lagos", type: "Full-time" },
  { role: "Corporate Strategy Analyst", loc: "Abuja", type: "Full-time" },
  { role: "Graduate Trainee Programme", loc: "Multiple", type: "Graduate" },
];

function Careers() {
  return (
    <Layout>
      <PageHero eyebrow="Careers" title="Build your career at Dynamic Renaissance."
        subtitle="Join a diversified enterprise where ambitious people build the infrastructure, energy and enterprises that shape Nigeria." />

      <section className="section-y">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, t: "Culture", d: "Purpose-led, high-trust, high-standards." },
            { icon: TrendingUp, t: "Growth", d: "Real ownership from day one." },
            { icon: GraduationCap, t: "Learning", d: "Continuous investment in your development." },
            { icon: Users, t: "Community", d: "Diverse, talented and supportive teams." },
          ].map((v) => (
            <div key={v.t} className="p-6 rounded-lg border border-border">
              <v.icon className="size-6 text-primary" />
              <div className="mt-4 font-extrabold">{v.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-wide">
          <div className="max-w-2xl">
            <div className="eyebrow">Current Vacancies</div>
            <h2 className="mt-4 text-4xl font-extrabold">Open roles across the group.</h2>
          </div>
          <div className="mt-10 divide-y divide-border rounded-lg border border-border bg-background">
            {vacancies.map((v) => (
              <div key={v.role} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="font-extrabold">{v.role}</div>
                  <div className="text-sm text-muted-foreground">{v.loc} · {v.type}</div>
                </div>
                <button className="btn-green">Apply</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
