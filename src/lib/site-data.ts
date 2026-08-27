import {
  Building2, Fuel, Wheat, Truck, Factory, Wrench, UtensilsCrossed, Briefcase,
  ShieldCheck, Users, Leaf, Award, Globe2, Handshake, HeartHandshake, Sparkles,
} from "lucide-react";

export const company = {
  name: "Dynamic Renaissance Biz Ents. Ltd.",
  short: "Dynamic Renaissance",
  tagline: "Building Today. Transforming Tomorrow.",
  description:
    "Dynamic Renaissance Biz Ents. Ltd. delivers integrated solutions across infrastructure, energy, agriculture, logistics, manufacturing, and commercial services — helping businesses and communities thrive through innovation and operational excellence.",
  phone: "+2348106332490",
  email: "admin@dynamicrenaissance.org",
  hours: "Mon – Fri, 8:00 – 18:00 WAT",
  address: "30 Sasere Ajibade off Saidku Street, Ilasamaja, Mushin, Lagos",
};

export const stats = [
  { value: 20, suffix: "+", label: "Business Sectors" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Countries Reached" },
  { value: 100, suffix: "%", label: "Commitment to Excellence" },
];

import vidPPM from "@/assets/sector-videos/project-property-management.mp4.asset.json";
import vidOil from "@/assets/sector-videos/oil-and-gas.mp4.asset.json";
import vidAgri from "@/assets/sector-videos/agriculture.mp4.asset.json";
import vidLog from "@/assets/sector-videos/logistics-distribution.mp4.asset.json";
import vidMfg from "@/assets/sector-videos/manufacturing-trading.mp4.asset.json";
import vidInd from "@/assets/sector-videos/industrial-services.mp4.asset.json";
import vidHosp from "@/assets/sector-videos/hospitality-entertainment.mp4.asset.json";
import vidCons from "@/assets/sector-videos/business-consultancy.mp4.asset.json";
import webmPPM from "@/assets/sector-videos/project-property-management.webm.asset.json";
import webmOil from "@/assets/sector-videos/oil-and-gas.webm.asset.json";
import webmAgri from "@/assets/sector-videos/agriculture.webm.asset.json";
import webmLog from "@/assets/sector-videos/logistics-distribution.webm.asset.json";
import webmMfg from "@/assets/sector-videos/manufacturing-trading.webm.asset.json";
import webmInd from "@/assets/sector-videos/industrial-services.webm.asset.json";
import webmHosp from "@/assets/sector-videos/hospitality-entertainment.webm.asset.json";
import webmCons from "@/assets/sector-videos/business-consultancy.webm.asset.json";

export const businesses = [
  {
    slug: "project-property-management",
    icon: Building2,
    title: "Project & Property Management",
    short: "End-to-end delivery of infrastructure, real estate and facility management programmes.",
    videoWebm: webmPPM.url,
    video: vidPPM.url,
    services: [
      "Project Planning", "Construction Management", "Facility Management",
      "Infrastructure Development", "Property Management", "General Contracting",
      "Engineering Consultancy", "Maintenance",
    ],
  },
  {
    slug: "oil-and-gas",
    icon: Fuel,
    title: "Oil & Gas Services",
    short: "Upstream, midstream and downstream services with an unwavering safety culture.",
    videoWebm: webmOil.url,
    video: vidOil.url,
    services: [
      "Oilfield Services", "Petroleum Marketing", "Fuel Distribution",
      "Pipeline Support", "Storage Facilities", "Gas Supply",
      "LPG Distribution", "Maintenance Services", "Energy Consulting",
    ],
  },
  {
    slug: "agriculture",
    icon: Wheat,
    title: "Agriculture",
    short: "Mechanised farming, agro-processing and food security programmes across Nigeria.",
    videoWebm: webmAgri.url,
    video: vidAgri.url,
    services: [
      "Commercial Farming", "Mechanized Farming", "Crop Production",
      "Poultry", "Livestock", "Agro Processing",
      "Fertilizer Distribution", "Agricultural Equipment", "Agro Consulting",
    ],
  },
  {
    slug: "logistics-distribution",
    icon: Truck,
    title: "Logistics & Distribution",
    short: "Fleet, haulage, warehousing and last-mile execution engineered for reliability.",
    videoWebm: webmLog.url,
    video: vidLog.url,
    services: [
      "Fleet Management", "Haulage", "Warehousing", "Supply Chain",
      "Procurement", "Import & Export", "Freight Services",
      "Distribution", "Last-mile Delivery",
    ],
  },
  {
    slug: "manufacturing-trading",
    icon: Factory,
    title: "Manufacturing & Trading",
    short: "Industrial manufacturing, wholesale and retail distribution at scale.",
    videoWebm: webmMfg.url,
    video: vidMfg.url,
    services: [
      "Industrial Manufacturing", "Wholesale", "Retail",
      "Consumer Products", "Industrial Products", "Product Distribution",
      "Procurement", "Supply Chain",
    ],
  },
  {
    slug: "industrial-services",
    icon: Wrench,
    title: "Industrial Services",
    short: "Turn-key industrial cleaning, maintenance and equipment solutions.",
    videoWebm: webmInd.url,
    video: vidInd.url,
    services: [
      "Industrial Cleaning", "Equipment Supply", "Industrial Chemicals",
      "Equipment Repairs", "Industrial Maintenance", "Commercial Solutions",
    ],
  },
  {
    slug: "hospitality-entertainment",
    icon: UtensilsCrossed,
    title: "Hospitality & Entertainment",
    short: "Hotels, restaurants and event experiences with world-class service standards.",
    videoWebm: webmHosp.url,
    video: vidHosp.url,
    services: [
      "Hotels", "Restaurants", "Catering", "Event Management",
      "Conference Facilities", "Fast Food", "Entertainment", "Beverages",
    ],
  },
  {
    slug: "business-consultancy",
    icon: Briefcase,
    title: "Business Support & Consultancy",
    short: "Strategy, advisory and transformation services that unlock growth.",
    videoWebm: webmCons.url,
    video: vidCons.url,
    services: [
      "Business Consulting", "Strategy", "Corporate Advisory", "Marketing",
      "Business Development", "Training", "Operations Support", "Digital Transformation",
    ],
  },
];



export const whyChoose = [
  { icon: Users, title: "Professional Team", body: "Multidisciplinary experts with deep sector knowledge." },
  { icon: Sparkles, title: "Integrated Solutions", body: "One partner across the entire value chain." },
  { icon: Globe2, title: "Nationwide Operations", body: "Active presence across all 36 states." },
  { icon: Award, title: "Innovation Driven", body: "Technology and process innovation in every engagement." },
  { icon: HeartHandshake, title: "Customer Satisfaction", body: "Long-term relationships built on measurable value." },
  { icon: ShieldCheck, title: "Quality Assurance", body: "ISO-aligned quality management across operations." },
  { icon: Handshake, title: "Strong Partnerships", body: "Trusted alliances with global and local leaders." },
  { icon: Leaf, title: "Environmental Responsibility", body: "Sustainability embedded across every project." },
];

export const coreValues = [
  { title: "Integrity", body: "We act transparently, keep our commitments and protect the trust placed in us by clients and communities." },
  { title: "Excellence", body: "We set high standards for safety, quality, delivery discipline and measurable performance on every engagement." },
  { title: "Innovation", body: "We combine practical field experience with technology, process improvement and forward-looking commercial thinking." },
  { title: "Sustainability", body: "We build durable value by balancing growth with environmental responsibility, people development and governance." },
];

export const executiveTeam = [
  { name: "Adewale Martins", role: "Group Managing Director", bio: "Leads group strategy, partnerships and capital project delivery across the company's diversified portfolio." },
  { name: "Nkechi Okafor", role: "Executive Director, Operations", bio: "Oversees operational excellence, HSE standards, procurement discipline and shared services performance." },
  { name: "Ibrahim Danladi", role: "Director, Energy & Industrial Services", bio: "Drives downstream energy programmes, industrial maintenance solutions and technical service delivery." },
  { name: "Tomiwa Balogun", role: "Director, Commercial & Advisory", bio: "Leads business development, consultancy, market expansion and institutional client relationships." },
];

export const industries = [
  "Government", "Oil & Gas", "Construction", "Infrastructure", "Real Estate",
  "Manufacturing", "Agriculture", "Hospitality", "Healthcare", "Education",
  "Transportation", "Energy", "SMEs", "Corporate Organizations",
  "Financial Institutions", "NGOs",
];

export const businessSectorDetails: Record<string, {
  overview: string;
  industriesServed: string[];
  projectNames: string[];
  benefits: string[];
}> = {
  "project-property-management": {
    overview: "A full-cycle project and property platform covering feasibility, planning, delivery controls, facilities operations and asset performance for public and private clients.",
    industriesServed: ["Infrastructure", "Real Estate", "Government", "Corporate Organizations"],
    projectNames: ["Central Business Tower", "Industrial Park Fit-out"],
    benefits: ["Single accountable delivery partner", "Cost, schedule and quality control", "Lifecycle asset management", "Safety-led execution"],
  },
  "oil-and-gas": {
    overview: "Reliable petroleum, gas and field-support services backed by disciplined safety systems, supply-chain visibility and strong technical partnerships.",
    industriesServed: ["Oil & Gas", "Energy", "Transportation", "Manufacturing"],
    projectNames: ["Regional Fuel Storage Depot"],
    benefits: ["Secure product movement", "Compliance-led operations", "Reduced downtime", "Integrated technical support"],
  },
  agriculture: {
    overview: "Commercial agriculture solutions designed to strengthen production, processing, storage and market access across priority food value chains.",
    industriesServed: ["Agriculture", "Food Processing", "Government", "SMEs"],
    projectNames: ["Northern Agro Estate"],
    benefits: ["Improved yields", "Mechanised operational capacity", "Stronger post-harvest systems", "Scalable food security programmes"],
  },
  "logistics-distribution": {
    overview: "A dependable logistics and distribution platform for haulage, fleet management, warehousing, procurement and last-mile execution.",
    industriesServed: ["Transportation", "Manufacturing", "Retail", "Healthcare"],
    projectNames: ["National Distribution Hub"],
    benefits: ["Faster route-to-market", "Better inventory control", "Reliable fleet uptime", "End-to-end procurement support"],
  },
  "manufacturing-trading": {
    overview: "Manufacturing, procurement and trading capability for consumer, industrial and commercial products supported by quality assurance and distribution networks.",
    industriesServed: ["Manufacturing", "SMEs", "Corporate Organizations", "Financial Institutions"],
    projectNames: ["Industrial Park Fit-out"],
    benefits: ["Flexible sourcing", "Quality-controlled product flow", "Wholesale and retail reach", "Lower procurement complexity"],
  },
  "industrial-services": {
    overview: "Specialist industrial cleaning, maintenance, equipment supply and chemical solutions that help facilities operate safely and efficiently.",
    industriesServed: ["Manufacturing", "Oil & Gas", "Construction", "Healthcare"],
    projectNames: ["Industrial Park Fit-out", "Regional Fuel Storage Depot"],
    benefits: ["Reduced operational risk", "Planned maintenance discipline", "Specialist equipment access", "Cleaner, safer facilities"],
  },
  "hospitality-entertainment": {
    overview: "Hospitality and entertainment ventures spanning hotels, restaurants, catering, conferencing and premium event experiences.",
    industriesServed: ["Hospitality", "Corporate Organizations", "Education", "NGOs"],
    projectNames: ["Renaissance Grand Hotel"],
    benefits: ["Guest-focused service standards", "Integrated event delivery", "Commercial property optimisation", "Memorable brand experiences"],
  },
  "business-consultancy": {
    overview: "Corporate advisory, strategy, training, marketing and operations support for organisations pursuing transformation and sustainable growth.",
    industriesServed: ["Corporate Organizations", "SMEs", "Financial Institutions", "Government"],
    projectNames: ["National Distribution Hub", "Northern Agro Estate"],
    benefits: ["Sharper strategic decisions", "Operational improvement", "Stronger market positioning", "Practical implementation support"],
  },
};

import heroImg from "@/assets/hero-building.webp";
import construction from "@/assets/project-construction.webp";
import oilgas from "@/assets/project-oilgas.webp";
import agri from "@/assets/project-agriculture.webp";
import logi from "@/assets/project-logistics.webp";
import hosp from "@/assets/project-hospitality.webp";

export { heroImg };

export const projects = [
  {
    slug: "central-business-tower",
    title: "Central Business Tower",
    category: "Construction",
    location: "Abuja, FCT",
    image: construction,
    summary: "24-storey Grade-A commercial tower delivered on schedule with a LEED-oriented specification.",
    value: "Confidential",
    timeline: "2022 – 2024",
    client: "Institutional Investor",
  },
  {
    slug: "regional-fuel-depot",
    title: "Regional Fuel Storage Depot",
    category: "Oil & Gas",
    location: "Port Harcourt, Rivers",
    image: oilgas,
    summary: "48ML strategic petroleum products depot with automated loading and safety systems.",
    value: "Confidential",
    timeline: "2021 – 2023",
    client: "Downstream Operator",
  },
  {
    slug: "northern-agro-estate",
    title: "Northern Agro Estate",
    category: "Agriculture",
    location: "Kaduna State",
    image: agri,
    summary: "2,500-hectare mechanised grain estate integrated with storage and off-take logistics.",
    value: "Confidential",
    timeline: "2020 – Ongoing",
    client: "Consortium",
  },
  {
    slug: "national-distribution-hub",
    title: "National Distribution Hub",
    category: "Logistics",
    location: "Lagos",
    image: logi,
    summary: "45,000 sqm cross-dock warehouse serving nationwide last-mile operations.",
    value: "Confidential",
    timeline: "2022 – 2023",
    client: "FMCG Group",
  },
  {
    slug: "renaissance-grand-hotel",
    title: "Renaissance Grand Hotel",
    category: "Hospitality",
    location: "Abuja, FCT",
    image: hosp,
    summary: "Five-star 220-key hospitality property with conferencing, dining and wellness suites.",
    value: "Confidential",
    timeline: "2023 – 2025",
    client: "Private Group",
  },
  {
    slug: "industrial-park-fitout",
    title: "Industrial Park Fit-out",
    category: "Manufacturing",
    location: "Ogun State",
    image: construction,
    summary: "Turn-key civil and MEP fit-out for a multi-tenant manufacturing cluster.",
    value: "Confidential",
    timeline: "2023 – 2024",
    client: "Industrial Consortium",
  },
];

export const testimonials = [
  {
    quote: "Dynamic Renaissance delivered our facility ahead of schedule and to the highest standard. Their integrated approach removed friction across every stakeholder.",
    author: "Managing Director",
    role: "Downstream Operator",
  },
  {
    quote: "A rare partner that combines discipline, engineering depth and genuine care for community impact. We continue to expand our engagements with them.",
    author: "Board Chair",
    role: "Agro Consortium",
  },
  {
    quote: "Their consulting practice reshaped how we plan capital projects. Practical, precise and grounded in on-the-ground realities.",
    author: "Chief Operating Officer",
    role: "Manufacturing Group",
  },
];

export const news = [
  {
    slug: "commissioning-central-business-tower",
    date: "March 2025",
    category: "Projects",
    title: "Renaissance commissions flagship 24-storey commercial tower in Abuja",
    excerpt: "Landmark asset positions the group as a preferred delivery partner for institutional real estate.",
  },
  {
    slug: "agro-expansion-northern-nigeria",
    date: "February 2025",
    category: "Agriculture",
    title: "Group expands mechanised grain operations to 4,000 hectares",
    excerpt: "Investment extends food security capacity across the North-Central corridor.",
  },
  {
    slug: "energy-transition-strategy",
    date: "January 2025",
    category: "Insight",
    title: "Rethinking Nigeria's downstream energy transition",
    excerpt: "Our energy practice unpacks the policy, infrastructure and capital priorities for the decade ahead.",
  },
];

export const projectDetails: Record<string, { overview: string; scope: string[]; outcomes: string[] }> = {
  "central-business-tower": {
    overview: "A flagship commercial development delivered with tight project controls, high-grade specifications and coordinated stakeholder management.",
    scope: ["Project planning and scheduling", "Construction management", "Quality assurance", "Facility readiness planning"],
    outcomes: ["Grade-A workspace delivered to institutional standards", "Improved commercial asset value", "Coordinated handover for operations teams"],
  },
  "regional-fuel-depot": {
    overview: "A strategic downstream storage asset designed to improve fuel availability, safety and distribution reliability.",
    scope: ["Depot infrastructure coordination", "Safety systems integration", "Loading operations support", "Maintenance planning"],
    outcomes: ["Improved distribution resilience", "Modernised safety controls", "More reliable product movement"],
  },
  "northern-agro-estate": {
    overview: "A mechanised agriculture programme integrating cultivation, storage, logistics and commercial off-take support.",
    scope: ["Farm planning", "Mechanised operations", "Storage strategy", "Logistics coordination"],
    outcomes: ["Expanded production capacity", "Reduced post-harvest losses", "Improved market access for produce"],
  },
  "national-distribution-hub": {
    overview: "A high-throughput distribution facility built to support nationwide supply-chain movement and last-mile execution.",
    scope: ["Warehouse planning", "Fleet integration", "Procurement systems", "Distribution workflow design"],
    outcomes: ["Faster fulfilment cycles", "Stronger inventory visibility", "Improved route efficiency"],
  },
  "renaissance-grand-hotel": {
    overview: "A premium hospitality destination combining accommodation, conferencing, dining and wellness amenities.",
    scope: ["Hospitality concept planning", "Facilities coordination", "Event infrastructure", "Service model development"],
    outcomes: ["Expanded premium hospitality capacity", "Integrated conference offering", "Elevated guest experience"],
  },
  "industrial-park-fitout": {
    overview: "A multi-tenant industrial fit-out programme coordinating civil, MEP and operational readiness requirements.",
    scope: ["Civil works coordination", "MEP delivery", "Tenant readiness", "Industrial safety standards"],
    outcomes: ["Accelerated tenant occupancy", "Improved facility reliability", "Scalable industrial operating environment"],
  },
};

export const articleDetails: Record<string, string[]> = {
  "commissioning-central-business-tower": [
    "Dynamic Renaissance has completed a major commercial tower designed for modern enterprises seeking resilient infrastructure, efficient building systems and a professional operating environment.",
    "The project reflects the group's integrated delivery model, combining planning, construction management, quality assurance and handover readiness under a single coordinated programme.",
    "The asset strengthens the company's position as a trusted partner for institutional real estate and complex capital projects.",
  ],
  "agro-expansion-northern-nigeria": [
    "The group has expanded its mechanised agriculture platform with additional cultivated acreage, improved storage planning and stronger off-take coordination.",
    "This expansion supports resilient food value chains by improving production consistency, reducing operational bottlenecks and connecting agricultural output to reliable distribution channels.",
    "Dynamic Renaissance will continue to invest in practical, commercially sustainable programmes that strengthen food systems and rural enterprise.",
  ],
  "energy-transition-strategy": [
    "Energy transition requires pragmatic infrastructure planning that balances cleaner technologies with dependable fuel logistics, industrial productivity and affordability.",
    "Our energy practice works with operators and institutions to identify practical routes for storage modernisation, gas adoption, hybrid power systems and safety-led distribution models.",
    "The next decade will reward organisations that combine disciplined capital allocation with transparent governance and measurable operational performance.",
  ],
};
