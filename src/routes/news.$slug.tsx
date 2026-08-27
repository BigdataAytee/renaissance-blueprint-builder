import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/site/Layout";
import type { NewsPost } from "@/lib/cms/types";

export const Route = createFileRoute("/news/$slug")({
  component: NewsDetail,
  head: () => ({
    meta: [{ title: "Article — Dynamic Renaissance" }],
  }),
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", "public", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("news_posts" as never)
        .select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data as NewsPost;
    },
  });

  return (
    <Layout>
      <article className="section-y">
        <div className="container-wide max-w-3xl">
          <Link to="/news" className="text-sm text-primary hover:underline">← All news</Link>
          {isLoading ? <div className="mt-8 text-muted-foreground">Loading…</div> :
            error ? <div className="mt-8 text-muted-foreground">Article not found.</div> :
              data && (
                <>
                  <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
                    {data.published_at ? new Date(data.published_at).toLocaleDateString() : ""}
                  </div>
                  <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-balance">{data.title}</h1>
                  {data.cover_url && <img src={data.cover_url} alt={data.title} className="mt-8 w-full rounded-lg" loading="lazy" width={1200} height={675} />}
                  {data.excerpt && <p className="mt-6 text-lg text-muted-foreground">{data.excerpt}</p>}
                  <div className="mt-8 prose max-w-none whitespace-pre-wrap text-foreground">{data.body_md}</div>
                </>
              )
          }
        </div>
      </article>
    </Layout>
  );
}
