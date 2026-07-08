import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { businessSectorDetails, businesses, projects } from "@/lib/site-data";

export const Route = createFileRoute("/business-sectors/$slug")({
  component: BusinessSectorDetail,
  head: () => ({
    meta: [
      { title: "Business Sector — Dynamic Renaissance" },
      { name: "description", content: "Explore a Dynamic Renaissance business sector, including services, industries served, projects, benefits and consultation options." },
      { property: "og:title", content: "Business Sector — Dynamic Renaissance" },
      { property: "og:description", content: "Sector capabilities, services, industries served, benefits and project experience." },
    ],
  }),
});

function BusinessSectorDetail() {
  const { slug } = Route.useParams();
  const sector = businesses.find((item) => item.slug === slug);
  const detail = businessSectorDetails[slug];

  if (!sector || !detail) {
    return (
      <Layout>
        <PageHero eyebrow="Business Sectors" title="Business sector unavailable." subtitle="The requested sector could not be found." />
        <section className="section-y">
          <div className="container-wide">
            <Link to="/business-sectors" className="btn-green"><ArrowLeft className="size-4" /> Back to business sectors</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const relatedProjects = projects.filter((project) => detail.projectNames.includes(project.title));

  return (
    <Layout>
      <PageHero eyebrow="Business Sector" title={sector.title} subtitle={detail.overview} />

      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <div className="size-16 rounded-md bg-primary text-primary-foreground grid place-items-center">
              <sector.icon className="size-8" />
            </div>
            <h2 className="mt-6 text-4xl font-extrabold">Overview</h2>
            <p className="mt-4 text-lg text-muted-foreground">{detail.overview}</p>
            <p className="mt-4 text-muted-foreground">
              Our team combines operational depth with international best practice to deliver programmes that meet strong standards for safety, quality, commercial discipline and long-term asset performance.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary p-8">
            <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Services</div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {sector.services.map((service) => (
                <li key={service} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-8">
            <div className="eyebrow">Industries Served</div>
            <ul className="mt-6 space-y-3">
              {detail.industriesServed.map((industry) => (
                <li key={industry} className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="size-4 text-primary" />{industry}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-background p-8 lg:col-span-2">
            <div className="eyebrow">Benefits</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {detail.benefits.map((benefit) => (
                <div key={benefit} className="rounded-md border border-border p-5">
                  <CheckCircle2 className="size-5 text-primary" />
                  <h3 className="mt-3 font-extrabold">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Related Projects</div>
              <h2 className="mt-4 text-4xl font-extrabold">Relevant project experience.</h2>
            </div>
            <Link to="/projects" className="btn-green">View all projects <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link key={project.slug} to="/projects/$slug" params={{ slug: project.slug }} className="group overflow-hidden rounded-lg border border-border bg-background hover:shadow-xl transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">{project.category}</div>
                  <h3 className="mt-2 text-xl font-extrabold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}