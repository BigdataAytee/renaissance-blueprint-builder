/**
 * Last-resort portfolio data for the public project pages.
 *
 * The projects table is the source of truth (see the seed migration), but if
 * the query fails or comes back empty the public site would otherwise render an
 * empty portfolio. These rows are built from the same content the site shipped
 * before the CMS existed, so visitors always see something real.
 */
import { projects as staticProjects, projectDetails } from "@/lib/site-data";
import type { Project } from "@/lib/cms/types";

export const fallbackProjects: Project[] = staticProjects.map((p, i) => ({
  id: `fallback-${p.slug}`,
  slug: p.slug,
  title: p.title,
  category: p.category,
  location: p.location,
  timeline: p.timeline,
  client: p.client,
  value: p.value,
  summary: p.summary,
  image_url: p.image,
  overview: projectDetails[p.slug]?.overview ?? "",
  scope: projectDetails[p.slug]?.scope ?? [],
  outcomes: projectDetails[p.slug]?.outcomes ?? [],
  is_published: true,
  sort_order: i + 1,
  created_at: "",
  updated_at: "",
}));

export const findFallbackProject = (slug: string) =>
  fallbackProjects.find((p) => p.slug === slug) ?? null;
