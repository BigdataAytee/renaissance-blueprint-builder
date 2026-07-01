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
  phone: "+234 (0) 800 000 0000",
  email: "info@dynamicrenaissance.ng",
  hours: "Mon – Fri, 8:00 – 18:00 WAT",
  address: "Corporate Head Office, Central Business District, Abuja, Nigeria",
};

export const stats = [
  { value: 20, suffix: "+", label: "Business Sectors" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 15, suffix: "+", label: "Years Combined Experience" },
  { value: 36, suffix: "", label: "States Covered" },
  { value: 100, suffix: "%", label: "Commitment to Excellence" },
];

export const businesses = [
  {
    slug: "project-property-management",
    icon: Building2,
    title: "Project & Property Management",
    short: "End-to-end delivery of infrastructure, real estate and facility management programmes.",
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

export const industries = [
  "Government", "Oil & Gas", "Construction", "Infrastructure", "Real Estate",
  "Manufacturing", "Agriculture", "Hospitality", "Healthcare", "Education",
  "Transportation", "Energy", "SMEs", "Corporate Organizations",
  "Financial Institutions", "NGOs",
];

import heroImg from "@/assets/hero-building.jpg";
import construction from "@/assets/project-construction.jpg";
import oilgas from "@/assets/project-oilgas.jpg";
import agri from "@/assets/project-agriculture.jpg";
import logi from "@/assets/project-logistics.jpg";
import hosp from "@/assets/project-hospitality.jpg";

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
    quote: "Their consulting practice reshaped how we plan capital projects. Practical, precise and grounded in Nigerian realities.",
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
