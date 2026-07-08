import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { articleDetails, news } from "@/lib/site-data";

export const Route = createFileRoute("/news/$slug")({
  component: ArticleDetail,
  head: () => ({
    meta: [
      { title: "News Article — Dynamic Renaissance" },
      { name: "description", content: "Read news, project updates and insights from Dynamic Renaissance." },
      { property: "og:title", content: "News Article — Dynamic Renaissance" },
      { property: "og:description", content: "Company news, project updates and sector insights from Dynamic Renaissance." },
    ],
  }),
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const article = news.find((item) => item.slug === slug);
  const paragraphs = articleDetails[slug];

  if (!article || !paragraphs) {
    return (
      <Layout>
        <PageHero eyebrow="News & Insights" title="Article unavailable." subtitle="The requested article could not be found." />
        <section className="section-y">
          <div className="container-wide">
            <Link to="/news" className="btn-green"><ArrowLeft className="size-4" /> Back to news</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero eyebrow={`${article.category} · ${article.date}`} title={article.title} subtitle={article.excerpt} />
      <article className="section-y">
        <div className="container-wide max-w-4xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Back to news</Link>
          <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <CTA />
    </Layout>
  );
}