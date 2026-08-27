import { Layout, PageHero } from "@/components/site/Layout";
import { company } from "@/lib/site-data";
import type { LegalSection } from "@/lib/legal-content";

/** Shared shell for the privacy policy and terms pages. */
export function LegalPage({
  eyebrow,
  title,
  subtitle,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <Layout>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <section className="section-y">
        <div className="container-wide max-w-3xl">
          <p className="text-sm text-muted-foreground">Last updated {updated}</p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-extrabold">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-muted-foreground leading-relaxed">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="rounded-lg border border-border bg-secondary p-8">
              <h2 className="text-2xl font-extrabold">Contact us</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Questions about this page, or a request about your information? Write to{" "}
                <a href={`mailto:${company.email}`} className="text-primary hover:underline">{company.email}</a>{" "}
                or call <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="text-primary hover:underline">{company.phone}</a>.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{company.name} — {company.address}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
