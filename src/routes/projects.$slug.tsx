import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/cms/types";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  head: () => ({
    meta: [
      { title: "Project Detail — Dynamic Renaissance" },
      { name: "description", content: "Read a Dynamic Renaissance project case study with scope, outcomes, timeline, location and sector context." },
      { property: "og:title", content: "Project Detail — Dynamic Renaissance" },
      { property: "og:description", content: "Project case study, scope and outcomes from Dynamic Renaissance." },
    ],
  }),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ["projects", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects" as never).select("*")
        .eq("slug", slug).eq("is_published", true).maybeSingle();
      if (error) throw error;
      return (data ?? null) as Project | null;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <PageHero eyebrow="Projects" title="Loading…" subtitle="" />
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <PageHero eyebrow="Projects" title="Project unavailable." subtitle="The requested project could not be found." />
        <section className="section-y">
          <div className="container-wide">
            <Link to="/projects" className="btn-green"><ArrowLeft className="size-4" /> Back to projects</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero eyebrow={project.category} title={project.title} subtitle={project.summary} />

      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {project.image_url && (
              <img src={project.image_url} alt={project.title} className="rounded-lg shadow-xl" loading="lazy" />
            )}
            {project.overview && (
              <>
                <h2 className="mt-10 text-4xl font-extrabold">Project Overview</h2>
                <p className="mt-4 text-lg text-muted-foreground">{project.overview}</p>
              </>
            )}
          </div>
          <aside className="rounded-lg border border-border bg-secondary p-8 h-fit">
            <h3 className="text-2xl font-extrabold">Project facts</h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div><dt className="text-muted-foreground">Sector</dt><dd className="font-semibold">{project.category}</dd></div>
              <div><dt className="text-muted-foreground">Location</dt><dd className="font-semibold">{project.location}</dd></div>
              <div><dt className="text-muted-foreground">Timeline</dt><dd className="font-semibold">{project.timeline}</dd></div>
              <div><dt className="text-muted-foreground">Client</dt><dd className="font-semibold">{project.client}</dd></div>
              <div><dt className="text-muted-foreground">Value</dt><dd className="font-semibold">{project.value}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      {(project.scope?.length > 0 || project.outcomes?.length > 0) && (
        <section className="section-y bg-secondary">
          <div className="container-wide grid gap-8 lg:grid-cols-2">
            {project.scope?.length > 0 && (
              <div className="rounded-lg border border-border bg-background p-8">
                <div className="eyebrow">Scope</div>
                <ul className="mt-6 space-y-3">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.outcomes?.length > 0 && (
              <div className="rounded-lg border border-border bg-background p-8">
                <div className="eyebrow">Outcomes</div>
                <ul className="mt-6 space-y-3">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <CTA />
    </Layout>
  );
}
