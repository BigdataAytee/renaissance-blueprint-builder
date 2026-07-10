import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/about", "/business-sectors", "/projects", "/news", "/events", "/gallery", "/team", "/careers", "/contact",
          "/business-sectors/project-property-management", "/business-sectors/oil-and-gas", "/business-sectors/agriculture",
          "/business-sectors/logistics-distribution", "/business-sectors/manufacturing-trading", "/business-sectors/industrial-services",
          "/business-sectors/hospitality-entertainment", "/business-sectors/business-consultancy",
          "/projects/central-business-tower", "/projects/regional-fuel-depot", "/projects/northern-agro-estate",
          "/projects/national-distribution-hub", "/projects/renaissance-grand-hotel", "/projects/industrial-park-fitout",
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
