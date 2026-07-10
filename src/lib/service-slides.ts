// Auto-generated mapping: sector slug -> array (matching sector-content.ts service order) of image sets.
// Two industry-specific product/service images per service card.

const modules = import.meta.glob("@/assets/service-slides/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function url(sector: string, service: string, variant: "a" | "b"): string {
  const key = Object.keys(modules).find((k) =>
    k.endsWith(`/${sector}__${service}__${variant}.jpg`),
  );
  if (!key) throw new Error(`Missing service slide: ${sector} ${service} ${variant}`);
  return modules[key];
}

function pair(sector: string, service: string): string[] {
  return [url(sector, service, "a"), url(sector, service, "b")];
}

// Order MUST match services[] order in src/lib/sector-content.ts for each sector.
export const serviceSlides: Record<string, string[][]> = {
  "project-property-management": [
    pair("project-property-management", "project-planning"),
    pair("project-property-management", "construction-management"),
    pair("project-property-management", "civil-engineering"),
    pair("project-property-management", "property-development"),
    pair("project-property-management", "facility-management"),
    pair("project-property-management", "architectural-design"),
    pair("project-property-management", "general-contracting"),
    pair("project-property-management", "maintenance-services"),
  ],
  "oil-and-gas": [
    pair("oil-and-gas", "petroleum-marketing"),
    pair("oil-and-gas", "fuel-distribution"),
    pair("oil-and-gas", "pipeline-epc"),
    pair("oil-and-gas", "storage-terminals"),
    pair("oil-and-gas", "lng-industrial-gas"),
    pair("oil-and-gas", "lpg-distribution"),
    pair("oil-and-gas", "maintenance-inspection"),
    pair("oil-and-gas", "offshore-marine"),
    pair("oil-and-gas", "safety-industrial-energy"),
  ],
  agriculture: [
    pair("agriculture", "commercial-crop"),
    pair("agriculture", "mechanised-irrigation"),
    pair("agriculture", "palm-oil-rubber-ginger"),
    pair("agriculture", "poultry-fish"),
    pair("agriculture", "livestock"),
    pair("agriculture", "agro-processing"),
    pair("agriculture", "fertilizers-seeds"),
    pair("agriculture", "agricultural-equipment"),
    pair("agriculture", "commodity-export"),
  ],
  "logistics-distribution": [
    pair("logistics-distribution", "fleet-management"),
    pair("logistics-distribution", "trucking-haulage"),
    pair("logistics-distribution", "warehousing-inventory"),
    pair("logistics-distribution", "supply-chain"),
    pair("logistics-distribution", "cold-chain"),
    pair("logistics-distribution", "freight-forwarding"),
    pair("logistics-distribution", "container-transport"),
    pair("logistics-distribution", "distribution-networks"),
    pair("logistics-distribution", "last-mile"),
  ],
  "manufacturing-trading": [
    pair("manufacturing-trading", "industrial-manufacturing"),
    pair("manufacturing-trading", "wholesale-trading"),
    pair("manufacturing-trading", "retail-distribution"),
    pair("manufacturing-trading", "consumer-products"),
    pair("manufacturing-trading", "industrial-products-spares"),
    pair("manufacturing-trading", "building-materials"),
    pair("manufacturing-trading", "procurement-sourcing"),
    pair("manufacturing-trading", "supply-chain-mfg"),
  ],
  "industrial-services": [
    pair("industrial-services", "industrial-cleaning"),
    pair("industrial-services", "equipment-installation"),
    pair("industrial-services", "corrosion-coatings"),
    pair("industrial-services", "fabrication-welding"),
    pair("industrial-services", "preventive-maintenance"),
    pair("industrial-services", "heavy-equipment-servicing"),
  ],
  "hospitality-entertainment": [
    pair("hospitality-entertainment", "hotels-resorts"),
    pair("hospitality-entertainment", "restaurants"),
    pair("hospitality-entertainment", "catering-banqueting"),
    pair("hospitality-entertainment", "corporate-events-wedding"),
    pair("hospitality-entertainment", "conference-centres"),
    pair("hospitality-entertainment", "fast-food-qsr"),
    pair("hospitality-entertainment", "recreation-tourism"),
    pair("hospitality-entertainment", "beverages"),
  ],
  "business-consultancy": [
    pair("business-consultancy", "business-strategy"),
    pair("business-consultancy", "financial-advisory"),
    pair("business-consultancy", "corporate-advisory"),
    pair("business-consultancy", "marketing-research"),
    pair("business-consultancy", "project-advisory"),
    pair("business-consultancy", "corporate-training"),
    pair("business-consultancy", "procurement-operations"),
    pair("business-consultancy", "digital-transformation"),
  ],
};
