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

type HeadCtx = { matches: Array<{ routeId: string }>; match: { routeId: string } };

/** True when this route is the deepest match, i.e. the page the visitor asked for. */
function isLeafMatch(ctx: HeadCtx): boolean {
  return ctx.matches[ctx.matches.length - 1]?.routeId === ctx.match.routeId;
}

/**
 * Head helpers for routes that are also the parent of a `$slug` child (/projects,
 * /news). Both heads render on a child URL, so the parent must stay quiet there
 * or the page ships two conflicting canonical links and two og:url values.
 */
export function leafOnlyCanonical(ctx: HeadCtx, path: string) {
  return isLeafMatch(ctx) ? [{ rel: "canonical", href: absoluteUrl(path) }] : [];
}

export function leafOnlyOgUrl(ctx: HeadCtx, path: string) {
  return isLeafMatch(ctx) ? [{ property: "og:url", content: absoluteUrl(path) }] : [];
}
