import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { GraduationCap, Users, TrendingUp, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Vacancy } from "@/lib/cms/types";

export const Route = createFileRoute("/careers")({
  component: Careers,
  head: () => ({
    meta: [
      { title: "Careers — Dynamic Renaissance" },
      { name: "description", content: "Build your career at an ambitious diversified enterprise with roles across multiple business sectors." },
      { property: "og:description", content: "Explore careers, job listings and company culture at Dynamic Renaissance." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
});

const fallbackVacancies: Vacancy[] = [];

function Careers() {
  const { data: vacancies = fallbackVacancies } = useQuery({
    queryKey: ["vacancies", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vacancies" as never).select("*").eq("is_published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Vacancy[];
    },
  });
  return (
    <Layout>
      <PageHero eyebrow="Careers" title="Build your career at Dynamic Renaissance."
        subtitle="Join a diversified enterprise where ambitious people build infrastructure, energy platforms and commercial ventures that shape markets." />

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
            {vacancies.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No open roles right now. Please check back soon.</div>
            ) : vacancies.map((v) => (
              <div key={v.id} className="p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="font-extrabold">{v.title}</div>
                  <div className="text-sm text-muted-foreground">{v.location} · {v.employment_type}</div>
                  {v.description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{v.description}</p>}
                </div>
                <a href={`/contact?role=${encodeURIComponent(v.title)}`} className="btn-green shrink-0">Apply</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
