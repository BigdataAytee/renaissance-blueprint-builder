/**
 * The single place the production origin is declared. Swap this one constant
 * when the site moves to a custom domain — canonicals, Open Graph URLs, the
 * sitemap, robots.txt and the structured data all read from it.
 *
 * No trailing slash.
 */
export const SITE_URL = "https://renaissance-blueprint-builder.lovable.app";

/** Turns a route path ("/contact") into an absolute URL for SEO tags. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
