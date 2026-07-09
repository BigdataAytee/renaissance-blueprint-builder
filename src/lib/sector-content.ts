import {
  HardHat, Ruler, Building, Wrench, ClipboardCheck, Home, Cog, Handshake,
  Fuel, Droplets, Pipette, Warehouse, Flame, Gauge, Zap, LineChart,
  Sprout, Tractor, Egg, Beef, Package, Truck as TruckIcon, Boxes, Ship, Send,
  Factory, ShoppingBag, ShoppingCart, Store, Layers, Container,
  SprayCan, PackageOpen, Beaker, Hammer, Settings, Briefcase, TrendingUp,
  UsersRound, Megaphone, GraduationCap, Rocket, MonitorSmartphone,
  Hotel, UtensilsCrossed, ChefHat, CalendarDays, Mic, Coffee,
  Users, Award, ShieldCheck, Clock, Wallet, Leaf, Globe2, FileCheck,
  Sparkles, Cpu, Search, PencilRuler, Lightbulb, Play, BadgeCheck, PackageCheck, HeartHandshake,
  type LucideIcon,
} from "lucide-react";

import sectorConstruction from "@/assets/project-construction.jpg";
import sectorOilGas from "@/assets/project-oilgas.jpg";
import sectorAgri from "@/assets/project-agriculture.jpg";
import sectorLogi from "@/assets/project-logistics.jpg";
import sectorHosp from "@/assets/project-hospitality.jpg";
import sectorManufacturing from "@/assets/sector-manufacturing.jpg";
import sectorIndustrial from "@/assets/sector-industrial.jpg";
import sectorConsultancy from "@/assets/sector-consultancy.jpg";

export type SectorService = {
  icon: LucideIcon;
  name: string;
  description: string;
  benefits: string[];
  industries: string[];
};

export type SectorContent = {
  heroImage: string;
  headline: string;
  valueProp: string;
  overviewParagraphs: string[];
  expertise: string[];
  stats: { value: string; label: string }[];
  services: SectorService[];
  equipment: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

// -------- Shared content (used across sectors) --------

export const whyChooseCards: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Users, title: "Experienced Professionals", body: "Multidisciplinary specialists with deep sector expertise and a proven delivery record." },
  { icon: Cpu, title: "Modern Equipment & Technology", body: "Best-in-class equipment, digital tools and monitoring systems on every engagement." },
  { icon: Award, title: "Quality Assurance", body: "ISO-aligned quality management embedded from planning through handover." },
  { icon: ShieldCheck, title: "Safety Standards", body: "A zero-harm safety culture backed by rigorous HSE systems and audits." },
  { icon: Clock, title: "Timely Delivery", body: "Disciplined scheduling and project controls that respect client deadlines." },
  { icon: Wallet, title: "Cost-Effective Solutions", body: "Commercial rigour and lean execution that maximise value for every naira invested." },
  { icon: Leaf, title: "Sustainable Practices", body: "Environmentally responsible methods integrated across every stage of delivery." },
  { icon: Globe2, title: "Nationwide Operations", body: "Active footprint across 36 states with a network of trusted partners." },
  { icon: FileCheck, title: "Regulatory Compliance", body: "Full alignment with regulatory, statutory and industry standards." },
  { icon: HeartHandshake, title: "Customer-Focused Approach", body: "Responsive teams, transparent communication and long-term partnerships." },
];

export const processSteps: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Search, title: "Consultation", body: "We listen, assess your requirements and clarify objectives, constraints and success criteria." },
  { icon: PencilRuler, title: "Planning", body: "Detailed scoping, risk assessment, resource planning and delivery scheduling." },
  { icon: Lightbulb, title: "Solution Development", body: "Engineered options, commercial modelling and a tailored programme of work." },
  { icon: Play, title: "Execution", body: "Coordinated field delivery led by seasoned project managers and specialist teams." },
  { icon: BadgeCheck, title: "Quality Control", body: "Continuous inspection, testing and reporting against defined quality benchmarks." },
  { icon: PackageCheck, title: "Delivery", body: "Structured handover with documentation, training and operational readiness." },
  { icon: HeartHandshake, title: "Ongoing Support", body: "Long-term support, performance reviews and continuous improvement programmes." },
];

export const industriesGlobal = [
  "Government", "Oil & Gas", "Construction", "Infrastructure", "Manufacturing",
  "Agriculture", "Healthcare", "Hospitality", "Education", "Transportation",
  "Energy", "Financial Institutions", "Corporate Organisations", "SMEs",
];

export const safetyPillars: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ShieldCheck, title: "Health & Safety", body: "Robust HSE management systems, competency training and daily safety leadership on every site." },
  { icon: Award, title: "Quality Assurance", body: "ISO-aligned processes, documented QA/QC plans and independent inspection at critical stages." },
  { icon: Leaf, title: "Environmental Responsibility", body: "Environmental impact controls, waste management and low-emission operating practices." },
  { icon: FileCheck, title: "Industry Standards", body: "Compliance with sector-specific codes, national regulations and international best practice." },
  { icon: Gauge, title: "Risk Management", body: "Structured risk identification, mitigation planning and continuous monitoring across the lifecycle." },
  { icon: BadgeCheck, title: "Regulatory Compliance", body: "Full statutory compliance, permitting support and transparent regulatory reporting." },
];

export const clientBenefits: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Wallet, title: "Reduced Costs", body: "Efficient sourcing, planning and execution translate into measurable cost savings." },
  { icon: TrendingUp, title: "Increased Efficiency", body: "Optimised workflows and technology-enabled delivery unlock higher productivity." },
  { icon: Clock, title: "Reliable Service Delivery", body: "Predictable, on-time performance backed by disciplined project management." },
  { icon: Award, title: "High-Quality Outcomes", body: "Engineered solutions that meet demanding technical and commercial standards." },
  { icon: ClipboardCheck, title: "Professional Project Management", body: "Certified project leaders, transparent reporting and structured governance." },
  { icon: Handshake, title: "Long-Term Partnerships", body: "Trusted advisor relationships that grow alongside your organisation." },
  { icon: Leaf, title: "Sustainable Business Solutions", body: "Responsible, future-fit approaches that safeguard people and the environment." },
  { icon: Sparkles, title: "Innovative Approaches", body: "Fresh thinking, modern tools and continuous improvement in every engagement." },
];

// -------- Per-sector content --------

export const sectorContent: Record<string, SectorContent> = {
  "project-property-management": {
    heroImage: sectorConstruction,
    headline: "Integrated project delivery and property management for landmark developments.",
    valueProp: "From feasibility to facility operations, we deliver complex real estate and infrastructure programmes with commercial discipline, engineering depth and lifecycle accountability.",
    overviewParagraphs: [
      "Dynamic Renaissance delivers end-to-end project and property management services for public, institutional and private clients — spanning residential estates, commercial buildings, office complexes, shopping malls, industrial facilities, hospitals, schools, hotels, roads and bridges. Our teams bring together architects, civil engineers, project managers, quantity surveyors and facility specialists under a single accountable delivery model.",
      "We take clients from feasibility and architectural design through construction supervision, civil engineering works and operational handover — supported by disciplined cost, schedule, quality and safety controls. After completion, our facility management, estate management and renovation practices keep assets performing at peak efficiency across their entire lifecycle.",
      "Our competitive advantage is integration: one experienced partner across property development, construction and operations, aligned to your commercial goals and answerable for outcomes rather than tasks.",
    ],
    expertise: [
      "Residential, commercial and industrial property development",
      "Architectural design and civil engineering consultancy",
      "Construction supervision and general contracting",
      "Quantity surveying, cost planning and commercial controls",
      "Facility management, estate management and renovation",
      "Roads, bridges, hospitals, schools and hotel developments",
    ],
    stats: [
      { value: "100+", label: "Projects delivered" },
      { value: "24 mo", label: "Avg. large-project cycle" },
      { value: "36", label: "States covered" },
      { value: "ISO", label: "Aligned processes" },
    ],
    services: [
      { icon: ClipboardCheck, name: "Project Planning & Feasibility", description: "Strategic planning, feasibility studies, quantity surveying and delivery roadmaps that de-risk residential estates, shopping malls, hospitals, schools and industrial facilities from day one.", benefits: ["Clear scope and objectives", "Realistic budgets and timelines", "Early risk identification"], industries: ["Government", "Real Estate", "Corporate Organisations"] },
      { icon: HardHat, name: "Construction Management", description: "Turn-key construction management for residential developments, commercial buildings, office complexes, hotels and industrial facilities — with rigorous construction supervision on every site.", benefits: ["Single point of accountability", "Rigorous cost & schedule control", "HSE-led execution"], industries: ["Real Estate", "Infrastructure", "Manufacturing"] },
      { icon: Building, name: "Civil Engineering & Infrastructure", description: "Delivery of civil infrastructure programmes including roads, bridges, utilities, industrial parks and public facilities such as hospitals and schools.", benefits: ["Complex stakeholder coordination", "Engineering depth", "Community impact planning"], industries: ["Government", "Infrastructure", "Energy"] },
      { icon: Home, name: "Property Development & Estate Management", description: "Full-service property development and estate management for residential estates, commercial buildings and mixed-use portfolios covering tenancy, revenue and asset care.", benefits: ["Higher occupancy", "Optimised rental yield", "Preserved asset value"], industries: ["Real Estate", "Corporate Organisations", "Financial Institutions"] },
      { icon: Wrench, name: "Facility Management", description: "Hard and soft facility services for office complexes, malls, hospitals and hotels — keeping buildings safe, efficient and pleasant to occupy.", benefits: ["Lower operating cost", "Reliable building systems", "Excellent occupant experience"], industries: ["Corporate Organisations", "Healthcare", "Education"] },
      { icon: Ruler, name: "Architectural Design & Engineering Consultancy", description: "Multidisciplinary architectural design and engineering advisory covering civil, structural, MEP and specialist building systems.", benefits: ["Independent expert advice", "Optimised design solutions", "Compliance assurance"], industries: ["Infrastructure", "Manufacturing", "Government"] },
      { icon: Cog, name: "General Contracting & Renovation", description: "Coordinated main-contractor delivery for renovations, fit-outs, refurbishments and greenfield developments across commercial and industrial assets.", benefits: ["Reliable subcontractor management", "Predictable outcomes", "Warranty-backed workmanship"], industries: ["Real Estate", "Hospitality", "Retail"] },
      { icon: Handshake, name: "Maintenance Services", description: "Planned and reactive maintenance programmes for buildings, roads and estates that extend asset life and reduce disruption.", benefits: ["Reduced downtime", "Longer asset life", "Predictable maintenance cost"], industries: ["Corporate Organisations", "Infrastructure", "Healthcare"] },
    ],
    equipment: [
      { title: "Building Information Modelling (BIM)", body: "3D coordination and clash detection to reduce rework and improve constructability." },
      { title: "Project controls software", body: "Integrated scheduling, cost and document control platforms for real-time programme visibility." },
      { title: "Modern construction equipment", body: "Cranes, lifts, formwork systems and specialist plant matched to project scale and complexity." },
      { title: "IoT facility monitoring", body: "Smart building sensors and analytics for energy, occupancy and asset performance." },
    ],
    faqs: [
      { q: "How do you keep large projects on time and on budget?", a: "We combine disciplined project controls, weekly performance reporting, integrated cost/schedule tracking and experienced project leaders who intervene early when risks emerge." },
      { q: "Do you handle design or only construction?", a: "Both. We can lead the design team, coordinate consultants or take a design-build role, depending on how clients want to structure the programme." },
      { q: "What size of projects do you deliver?", a: "From single-tenant fit-outs of a few thousand square metres to multi-year infrastructure and mixed-use developments valued in the multi-billion naira range." },
      { q: "Can you take over an existing project mid-way?", a: "Yes. We regularly step in as a recovery partner, stabilising cost, schedule and quality on projects that have run into difficulty." },
      { q: "Do you provide facility management after handover?", a: "Yes. Many clients retain us for hard/soft FM, planned maintenance and lifecycle management once assets are commissioned." },
      { q: "How is safety managed on your sites?", a: "Every project runs under our HSE management system with daily safety briefings, trained officers on site, PPE compliance, permit-to-work systems and independent audits." },
      { q: "What sustainability standards do you follow?", a: "We design and build to internationally recognised sustainability principles (LEED-oriented specifications, energy-efficient MEP, low-VOC materials) and align with client ESG commitments." },
      { q: "Do you work with government and institutional clients?", a: "Yes. We are experienced with public procurement processes, compliance documentation and multi-stakeholder delivery for government and institutional programmes." },
      { q: "How do you handle change orders and scope changes?", a: "Through a formal change management process with clear impact assessment on cost, time and risk before approval and execution." },
      { q: "Can you provide references from similar projects?", a: "Yes. On request we share relevant case studies and, where clients permit, provide direct referee introductions." },
    ],
  },

  "oil-and-gas": {
    heroImage: sectorOilGas,
    headline: "Trusted downstream, midstream and field-support services for the energy industry.",
    valueProp: "We combine safety-led operations, dependable supply chains and technical expertise to keep energy flowing across the value chain.",
    overviewParagraphs: [
      "Dynamic Renaissance provides integrated oil and gas services spanning petroleum marketing, distribution of refined petroleum products — Petrol (PMS), Diesel (AGO), Kerosene (DPK), Aviation Fuel (Jet A1), lubricants and bitumen — alongside LPG and LNG supply, pipeline support, storage tank operations and specialist EPC, maintenance and inspection services. Our teams operate under strict HSE governance and comply with all applicable industry and regulatory standards.",
      "We support Independent Marketing Companies (IMCs), industrial off-takers, government agencies and large corporate consumers with reliable product movement, offshore support, marine logistics, well services and commercial energy solutions. Our national distribution network and vetted partner ecosystem ensure consistent uptime and product availability.",
      "Whether you need bulk diesel for a fleet, LPG for hospitality operations, EPC and safety-systems support on a depot upgrade, or advisory on downstream commercial strategy, we bring proven operational capability and trusted commercial discipline across the crude oil value chain.",
    ],
    expertise: [
      "Supply of PMS, AGO, DPK, Jet A1, lubricants and bitumen",
      "LPG and LNG distribution to industry and hospitality",
      "Pipelines, storage tanks, depot and terminal operations",
      "Engineering, Procurement & Construction (EPC) and maintenance",
      "Offshore support, marine logistics and well services",
      "Inspection, safety systems and HSE-led operations",
    ],
    stats: [
      { value: "24/7", label: "Operations coverage" },
      { value: "36", label: "States supplied" },
      { value: "HSE-1", label: "Safety-led culture" },
      { value: "Multi", label: "Product portfolio" },
    ],
    services: [
      { icon: Fuel, name: "Petroleum Marketing", description: "Reliable supply of Petrol (PMS), Diesel (AGO), Kerosene (DPK), Aviation Fuel (Jet A1), lubricants and bitumen to commercial, industrial and institutional customers.", benefits: ["Consistent product availability", "Competitive pricing", "Fully compliant deliveries"], industries: ["Transportation", "Manufacturing", "Government"] },
      { icon: TruckIcon, name: "Fuel Distribution", description: "Nationwide bulk distribution of AGO, PMS and DPK operated with a dedicated tanker fleet, tracked deliveries and safety-first drivers.", benefits: ["Reliable route-to-site", "Full delivery traceability", "Compliant tanker fleet"], industries: ["Oil & Gas", "Transportation", "Construction"] },
      { icon: Pipette, name: "Pipeline & EPC Support", description: "Engineering, Procurement & Construction (EPC) and field support for pipelines — including inspection, maintenance and integrity monitoring of crude oil and product lines.", benefits: ["Reduced downtime", "Improved integrity assurance", "Skilled field crews"], industries: ["Oil & Gas", "Energy"] },
      { icon: Warehouse, name: "Storage Tanks & Terminals", description: "Depot, terminal and storage-tank operational support covering safe handling, loading and product movement of refined petroleum products.", benefits: ["Safer product movement", "Loss-control discipline", "Certified operators"], industries: ["Oil & Gas", "Energy", "Government"] },
      { icon: Flame, name: "LNG & Industrial Gas Supply", description: "Reliable LNG and industrial gas supply agreements structured around customer offtake profiles for manufacturing, power and hospitality users.", benefits: ["Predictable supply", "Flexible offtake terms", "Technical support"], industries: ["Manufacturing", "Hospitality", "Energy"] },
      { icon: Droplets, name: "LPG Distribution", description: "LPG supply — in bulk and cylinder formats — to hospitality operators, industrial users and household distributors nationwide.", benefits: ["Cleaner energy option", "Reliable refills", "Cylinder & bulk options"], industries: ["Hospitality", "SMEs", "Manufacturing"] },
      { icon: Wrench, name: "Maintenance & Inspection", description: "Preventive and corrective maintenance, inspection and integrity testing for downstream assets, storage tanks, generators and energy equipment.", benefits: ["Improved uptime", "Longer asset life", "Predictable maintenance cost"], industries: ["Oil & Gas", "Manufacturing", "Corporate Organisations"] },
      { icon: LineChart, name: "Offshore & Marine Logistics", description: "Offshore support and marine logistics for well services, rig supply and coastal product movement — coordinated with our downstream operations.", benefits: ["Reliable offshore support", "Coordinated marine logistics", "Compliant operations"], industries: ["Oil & Gas", "Government", "Energy"] },
      { icon: Zap, name: "Safety Systems & Industrial Energy", description: "Bundled fuel, generator, safety systems and energy management solutions for large industrial consumers — including fire, gas and emergency shutdown packages.", benefits: ["Simplified vendor management", "Better cost visibility", "Guaranteed availability"], industries: ["Manufacturing", "Healthcare", "Financial Institutions"] },
    ],
    equipment: [
      { title: "Modern tanker fleet", body: "GPS-tracked, calibrated and DPR-compliant tankers with driver competency programmes." },
      { title: "Automated loading gantries", body: "Metered loading systems and calibrated flow meters that eliminate product losses." },
      { title: "Safety instrumentation", body: "Fire detection, gas monitoring and emergency shutdown systems across handling facilities." },
      { title: "Digital dispatch platforms", body: "Real-time order, dispatch and delivery visibility for corporate customers." },
    ],
    faqs: [
      { q: "What products do you supply?", a: "PMS (petrol), AGO (diesel), DPK (kerosene), ATK (aviation fuel), lubricants, LPG and industrial gases through vetted supply partnerships." },
      { q: "Do you supply bulk fuel for industrial sites?", a: "Yes. We deliver bulk AGO and other products to manufacturing plants, construction sites, telecoms operators and other large industrial consumers." },
      { q: "How do you guarantee product quality?", a: "We source only from authorised depots, use calibrated meters, provide certificates of quantity and quality and support independent testing on request." },
      { q: "Can you provide dedicated tankers for our operations?", a: "Yes. We offer dedicated tanker allocation, driver assignment and route optimisation for high-volume customers." },
      { q: "Are your operations regulated?", a: "Yes. Our downstream operations comply with NMDPRA / DPR regulations, environmental permits and applicable HSE standards." },
      { q: "How is safety managed during deliveries?", a: "Trained drivers, PPE compliance, permit-to-work systems, spill kits, safe unloading procedures and full incident reporting protocols." },
      { q: "Do you offer LPG cylinder distribution?", a: "Yes. We supply LPG in bulk and cylinder formats to distributors, hospitality operators and industrial users." },
      { q: "Can you support depot or storage projects?", a: "Yes. We provide operational, maintenance and technical support services to depot operators and terminal owners." },
      { q: "Do you offer credit terms?", a: "Structured credit terms are available for pre-qualified corporate customers, subject to commercial review." },
      { q: "How do I request a quotation?", a: "Contact us with your product, volume, delivery location and frequency and we will respond with a tailored commercial proposal." },
    ],
  },

  agriculture: {
    heroImage: sectorAgri,
    headline: "Commercial agriculture and food security programmes at scale.",
    valueProp: "We invest in mechanised farming, agro-processing, storage and market linkages that strengthen national food security while delivering strong commercial returns.",
    overviewParagraphs: [
      "Our agriculture practice spans commercial crop production — cocoa, rubber, cassava, rice, maize, sorghum, soybeans, sesame, ginger, yam, groundnuts, cotton, vegetables and fruits — alongside palm oil and palm kernel processing, poultry, fish farming, livestock and agro-processing. We distribute fertilizers, seeds, agrochemicals and animal feed, and supply mechanised equipment, greenhouse systems and irrigation infrastructure to farmers, cooperatives, agencies and consortia.",
      "By combining professional farm management, mechanised farming, irrigation systems, greenhouse farming and integrated storage, packaging and commodity export logistics, we help clients raise yields, reduce post-harvest losses and expand market access for their produce. Our programmes are designed for scale, traceability, food security and long-term profitability.",
      "We are committed to sustainable agriculture — protecting soil health, using water responsibly and creating meaningful economic opportunity across rural value chains, from smallholder aggregation to national food-security programmes.",
    ],
    expertise: [
      "Mechanised farming: cocoa, rice, maize, sorghum, cassava, yam, soybeans, sesame, ginger, groundnuts, cotton",
      "Palm oil, palm kernel and vegetable / fruit value chains",
      "Poultry, fish farming and livestock operations",
      "Agro-processing, storage, packaging and commodity export",
      "Fertilizers, seeds, agrochemicals and animal feed distribution",
      "Irrigation systems, greenhouse farming and food security programmes",
    ],
    stats: [
      { value: "2,500+", label: "Hectares operated" },
      { value: "Multi", label: "Crop portfolio" },
      { value: "24/7", label: "Peak-season ops" },
      { value: "Full", label: "Value chain support" },
    ],
    services: [
      { icon: Sprout, name: "Commercial Crop Production", description: "Large-scale production of cocoa, rice, maize, sorghum, soybeans, sesame, cassava, yam, groundnuts and cotton, run to professional agronomic and commercial standards.", benefits: ["Higher yields per hectare", "Consistent quality", "Predictable off-take"], industries: ["Agriculture", "Food Processing", "Government"] },
      { icon: Tractor, name: "Mechanised & Irrigation Farming", description: "Full mechanisation and irrigation-systems services covering land preparation, planting, spraying, harvesting and year-round water management — including greenhouse farming for high-value vegetables and fruits.", benefits: ["Faster field operations", "Lower labour dependency", "Reduced production cost"], industries: ["Agriculture", "SMEs", "Government"] },
      { icon: Sprout, name: "Palm Oil, Rubber & Ginger Value Chains", description: "Agronomy-led production programmes for industrial and export-oriented crops including oil palm, rubber, ginger and sesame — with integrated processing of palm oil and palm kernel.", benefits: ["Optimised input use", "Better crop protection", "Traceable produce"], industries: ["Food Processing", "Agriculture", "SMEs"] },
      { icon: Egg, name: "Poultry & Fish Farming", description: "Modern poultry operations (broilers, layers, hatcheries) and commercial fish farming under strict biosecurity, feed and water-quality controls.", benefits: ["Consistent bird and fish performance", "Food-safe processing", "Reliable supply to buyers"], industries: ["Food Processing", "Hospitality", "Retail"] },
      { icon: Beef, name: "Livestock", description: "Livestock rearing, feedlot management and processing coordination for local and regional markets — including cattle, small ruminants and animal feed supply.", benefits: ["Improved animal welfare", "Better weight gain", "Structured off-take"], industries: ["Food Processing", "Hospitality", "Government"] },
      { icon: Package, name: "Agro-Processing, Storage & Packaging", description: "Value addition through cleaning, milling, drying, packaging and processing of primary produce — plus warehousing and cold storage that reduce post-harvest losses.", benefits: ["Higher margins", "Extended shelf life", "Market-ready products"], industries: ["Food Processing", "Retail", "Manufacturing"] },
      { icon: SprayCan, name: "Fertilizers, Seeds & Agrochemicals", description: "Distribution of high-grade fertilizers, certified seeds, agrochemicals and animal feed to farmers, cooperatives and public-sector food security programmes.", benefits: ["Timely input supply", "Quality-assured products", "Agronomic guidance"], industries: ["Agriculture", "Government", "SMEs"] },
      { icon: Tractor, name: "Agricultural Equipment", description: "Supply, hire and maintenance of tractors, implements, greenhouse structures, irrigation kits and post-harvest equipment.", benefits: ["Access to modern equipment", "Reduced ownership burden", "Trained operators"], industries: ["Agriculture", "SMEs", "Government"] },
      { icon: Briefcase, name: "Commodity Export & Advisory", description: "Advisory and execution on commodity export (cocoa, sesame, ginger, cashew), agribusiness investment, off-take structuring and food-security programme design.", benefits: ["Better investment decisions", "Structured off-take deals", "Bankable business plans"], industries: ["Financial Institutions", "Government", "Corporate Organisations"] },
    ],
    equipment: [
      { title: "Modern tractor fleet", body: "High-horsepower tractors with matched implements for efficient land preparation and cultivation." },
      { title: "Precision-farming tools", body: "GPS-guided planters, soil sensors and yield-mapping tools that optimise inputs and outputs." },
      { title: "Post-harvest infrastructure", body: "Drying, cleaning and storage systems designed to reduce losses and preserve quality." },
      { title: "Biosecurity systems", body: "Structured biosecurity protocols across poultry and livestock operations." },
    ],
    faqs: [
      { q: "What crops do you focus on?", a: "Grains (maize, rice, sorghum), tubers (cassava, yam), oil crops and selected cash and horticultural crops depending on the region and off-take profile." },
      { q: "Do you run your own farms or manage for third parties?", a: "Both. We operate our own commercial estates and provide professional farm-management services to landowners, investors and government-linked programmes." },
      { q: "Can you help finance a farming project?", a: "We do not lend directly, but we structure bankable business plans, off-take agreements and commercial models that support financing conversations with lenders and investors." },
      { q: "Do you handle processing as well as production?", a: "Yes. We integrate farming with cleaning, milling, packaging and other agro-processing activities to capture more value along the chain." },
      { q: "How do you manage sustainability?", a: "We apply soil-health practices, integrated pest management, water-use discipline and community engagement policies across our operations." },
      { q: "Can you supply consistent volumes to off-takers?", a: "Yes. Our scale, mechanisation and storage capacity allow us to deliver consistent volume and quality against structured supply agreements." },
      { q: "Do you support smallholder aggregation?", a: "Yes. We work with cooperatives and out-grower schemes to aggregate produce, provide inputs and connect smallholders to markets." },
      { q: "Which regions do you operate in?", a: "We operate across multiple states, with a particular strength in North-Central and Northern Nigeria alongside logistics reach nationwide." },
      { q: "How do you handle biosecurity in poultry and livestock?", a: "Through strict access controls, vaccination programmes, veterinary oversight and documented biosecurity SOPs." },
      { q: "How can institutional investors engage with you?", a: "Through joint ventures, structured off-take arrangements, land-lease partnerships or advisory mandates — contact us to discuss the right model." },
    ],
  },

  "logistics-distribution": {
    heroImage: sectorLogi,
    headline: "Reliable logistics, haulage and last-mile distribution engineered for uptime.",
    valueProp: "From primary haulage to last-mile delivery, we run a disciplined logistics operation built on modern fleet, structured processes and nationwide reach.",
    overviewParagraphs: [
      "Our logistics and distribution practice supports FMCG groups, industrial manufacturers, agro-processors, retailers and public agencies with dependable trucking, haulage, warehousing, cold chain logistics, freight forwarding, customs clearance and last-mile delivery. We operate a modern fleet, run structured route management and deliver against clear service-level commitments.",
      "We combine GPS-tracked vehicles, professional drivers, container transport, cargo handling and disciplined warehouse operations with integrated procurement and inventory management — giving clients a single supply chain partner they can rely on. Our operations are supported by digital planning tools, real-time visibility and rigorous safety standards.",
      "Whether you need cross-country trucking, national warehousing cover, import-export coordination, cold chain movement of pharmaceuticals or agro-produce, or dedicated last-mile fleets, we design the right distribution network and execute it consistently.",
    ],
    expertise: [
      "Fleet management, trucking and specialised haulage",
      "Warehousing, cold chain logistics and cargo handling",
      "Container transport and freight forwarding",
      "Customs clearance and import/export coordination",
      "Supply chain management and inventory management",
      "Last-mile delivery and distribution networks",
    ],
    stats: [
      { value: "45,000", label: "sqm warehouse capacity" },
      { value: "36", label: "States served" },
      { value: "GPS", label: "Tracked fleet" },
      { value: "24/7", label: "Dispatch coverage" },
    ],
    services: [
      { icon: TruckIcon, name: "Fleet Management", description: "Operation, servicing and asset management of commercial trucking and van fleets — for company-owned assets or dedicated client accounts.", benefits: ["Higher fleet uptime", "Predictable operating cost", "Certified drivers"], industries: ["Manufacturing", "Retail", "Oil & Gas"] },
      { icon: TruckIcon, name: "Trucking & Haulage", description: "Long-haul trucking, tanker services and specialised heavy haulage of fuel, cement, containers and industrial cargo across the country.", benefits: ["National coverage", "Compliant vehicles", "Real-time tracking"], industries: ["Manufacturing", "Oil & Gas", "Construction"] },
      { icon: Warehouse, name: "Warehousing & Inventory Management", description: "Ambient, secured and cross-dock warehousing with racking, WMS-driven inventory management and access control for FMCG, pharma and industrial stock.", benefits: ["Better stock visibility", "Reduced shrinkage", "Efficient inbound/outbound flow"], industries: ["Retail", "FMCG", "Healthcare"] },
      { icon: Boxes, name: "Supply Chain Management", description: "End-to-end supply chain design and execution covering sourcing, movement, warehousing and delivery — with inventory management and KPI reporting.", benefits: ["Lower total cost to serve", "Better SLA performance", "Simplified vendor management"], industries: ["Manufacturing", "Retail", "Corporate Organisations"] },
      { icon: PackageOpen, name: "Cold Chain Logistics", description: "Temperature-controlled storage and transport for pharmaceuticals, vaccines, dairy, poultry and other perishable agro-produce.", benefits: ["Product integrity", "Compliant handling", "End-to-end temperature control"], industries: ["Healthcare", "FMCG", "Agriculture"] },
      { icon: Ship, name: "Freight Forwarding & Customs Clearance", description: "Freight forwarding, customs clearance and international movement across sea, air and land — with full documentation and compliance support.", benefits: ["Reduced clearance time", "Compliant documentation", "Multi-modal options"], industries: ["Manufacturing", "Retail", "SMEs"] },
      { icon: Container, name: "Container Transport & Cargo Handling", description: "Container transport, transfers and specialised cargo handling for industrial and commercial clients — including project cargo and out-of-gauge loads.", benefits: ["Reliable schedules", "Damage-free handling", "Coordinated logistics"], industries: ["Manufacturing", "Oil & Gas", "Construction"] },
      { icon: Boxes, name: "Distribution Networks", description: "Structured distribution networks moving goods from production sites and ports to regional depots, wholesalers and retail points across 36 states.", benefits: ["Faster route-to-market", "Consistent service levels", "Full traceability"], industries: ["Retail", "FMCG", "Healthcare"] },
      { icon: Send, name: "Last-Mile Delivery", description: "Dedicated last-mile fleets and rider networks handling final delivery to homes, retail outlets and pickup stations with proof-of-delivery capture.", benefits: ["Same-day / next-day options", "Proof-of-delivery capture", "Higher customer satisfaction"], industries: ["Retail", "Healthcare", "SMEs"] },
    ],
    equipment: [
      { title: "Modern truck & van fleet", body: "Regularly serviced tractor-heads, rigid trucks, tankers and vans matched to customer needs." },
      { title: "GPS tracking & telematics", body: "Real-time location, driver behaviour and fuel monitoring across the fleet." },
      { title: "Warehouse management systems", body: "Digital inventory, order management and cycle-count tools for accuracy and visibility." },
      { title: "Cold-chain capability", body: "Refrigerated storage and transport options for temperature-sensitive goods." },
    ],
    faqs: [
      { q: "What kind of goods do you move?", a: "General cargo, FMCG products, industrial equipment, agricultural produce, construction materials, hazardous goods (with the right permits) and fuel." },
      { q: "Do you offer dedicated fleets?", a: "Yes. We provide dedicated tankers, trucks and vans to clients with consistent, high-volume movement." },
      { q: "How is delivery visibility provided?", a: "Through GPS tracking, dispatch reports and, where required, real-time integration with client systems." },
      { q: "Do you handle customs and import documentation?", a: "Yes. Our freight and import/export teams manage clearance, documentation and compliance." },
      { q: "How large is your warehouse capacity?", a: "We operate multi-thousand-square-metre facilities and can scale up through partner networks depending on client needs." },
      { q: "Can you support nationwide last-mile delivery?", a: "Yes, through a mix of owned fleet, contracted riders and partner networks covering major urban and regional markets." },
      { q: "What safety and compliance standards do you follow?", a: "Vehicle certification, driver training, HSE inductions, permit-to-work protocols on customer sites and full statutory compliance." },
      { q: "Can you integrate with our ERP or WMS?", a: "Yes. We work with client systems for order, dispatch and inventory integration where required." },
      { q: "Do you offer cold-chain or specialised logistics?", a: "Yes. We have refrigerated and specialised transport for pharmaceuticals, agro-produce and other temperature-sensitive goods." },
      { q: "How do you price logistics services?", a: "Pricing is based on origin/destination, volume, frequency, service level and any dedicated resources required — we provide transparent, tailored quotations." },
    ],
  },

  "manufacturing-trading": {
    heroImage: sectorManufacturing,
    headline: "Industrial manufacturing, trading and distribution at scale.",
    valueProp: "We manufacture, source and distribute consumer and industrial products through disciplined supply chains and structured commercial partnerships.",
    overviewParagraphs: [
      "Dynamic Renaissance operates and partners with manufacturing lines producing consumer goods, industrial inputs and finished products. Our trading arm sources reliably, negotiates commercially and distributes efficiently through wholesale and retail channels.",
      "We combine production discipline with strong quality assurance and supply-chain integration. Clients benefit from consistent products, reliable availability and flexible commercial arrangements — from bulk supply agreements to structured distributorship programmes.",
      "Whether you are looking for a manufacturing partner, an industrial supplier, a wholesale off-take arrangement or a nationwide distribution channel, we bring the operational capability and commercial trust to deliver.",
    ],
    expertise: [
      "Industrial manufacturing operations",
      "Consumer product distribution",
      "Wholesale and retail trade",
      "Structured procurement and sourcing",
      "Quality-controlled supply chains",
      "Import and local sourcing partnerships",
    ],
    stats: [
      { value: "Multi", label: "Product categories" },
      { value: "36", label: "States distributed" },
      { value: "QA", label: "Quality-controlled" },
      { value: "B2B/B2C", label: "Channels served" },
    ],
    services: [
      { icon: Factory, name: "Industrial Manufacturing", description: "Own and partner manufacturing operations producing consumer, industrial and commercial products.", benefits: ["Consistent product quality", "Reliable production capacity", "Compliant operations"], industries: ["Manufacturing", "Retail", "Corporate Organisations"] },
      { icon: Store, name: "Wholesale", description: "Structured wholesale supply of consumer and industrial products to distributors and large retail customers.", benefits: ["Bulk pricing", "Reliable stock availability", "Category depth"], industries: ["Retail", "SMEs", "Corporate Organisations"] },
      { icon: ShoppingBag, name: "Retail", description: "Retail-facing distribution partnerships that place products in modern trade and traditional trade outlets.", benefits: ["Wide market reach", "Merchandising support", "Faster stock turn"], industries: ["Retail", "SMEs", "Corporate Organisations"] },
      { icon: ShoppingCart, name: "Consumer Products", description: "Distribution of fast-moving consumer goods through structured route-to-market plans.", benefits: ["High availability", "Strong shelf presence", "Consumer trust"], industries: ["Retail", "FMCG", "SMEs"] },
      { icon: Layers, name: "Industrial Products", description: "Supply of industrial inputs, spare parts, consumables and specialised products to plants and operators.", benefits: ["Reduced downtime", "Technical support", "Reliable sourcing"], industries: ["Manufacturing", "Oil & Gas", "Construction"] },
      { icon: Boxes, name: "Product Distribution", description: "End-to-end distribution combining warehousing, logistics and channel management for our own and partner brands.", benefits: ["Faster route-to-market", "Full traceability", "Structured KPI reporting"], industries: ["FMCG", "Retail", "Manufacturing"] },
      { icon: PackageOpen, name: "Procurement", description: "Sourcing of raw materials, finished products and specialised goods through vetted supplier networks.", benefits: ["Better commercial terms", "Compliant sourcing", "Reduced supply risk"], industries: ["Manufacturing", "Government", "Corporate Organisations"] },
      { icon: Boxes, name: "Supply Chain", description: "Integrated supply chain design, execution and management for manufacturers and traders.", benefits: ["Lower total supply-chain cost", "Improved service levels", "Better inventory control"], industries: ["Manufacturing", "Retail", "FMCG"] },
    ],
    equipment: [
      { title: "Modern production lines", body: "Semi-automated and automated production lines with in-line quality control." },
      { title: "Quality laboratories", body: "In-house and partner labs supporting product testing and batch release." },
      { title: "ERP-driven operations", body: "Integrated ERP systems covering procurement, production, inventory and finance." },
      { title: "Distribution technology", body: "Route-to-market platforms, van sales tools and mobile order capture." },
    ],
    faqs: [
      { q: "Do you manufacture products under your own brand?", a: "Yes, and we also produce for partner brands under contract or private-label arrangements." },
      { q: "What product categories do you cover?", a: "Consumer packaged goods, industrial consumables, construction-related products, agro-inputs and specialised trading portfolios." },
      { q: "Can you supply large corporate customers?", a: "Yes. We hold framework supply agreements with corporate customers across manufacturing, hospitality and institutional sectors." },
      { q: "Do you handle imports?", a: "Yes. We import through licensed partners with full customs, quality and regulatory compliance." },
      { q: "How is product quality assured?", a: "Through documented QA/QC procedures, laboratory testing, batch traceability and supplier audits." },
      { q: "Can you customise packaging or specifications?", a: "Yes. We work with clients on custom formulations, packaging formats and branding within regulatory limits." },
      { q: "How do you price wholesale and distribution deals?", a: "Based on volume, category, exclusivity, credit terms and route-to-market commitments — we structure tailored agreements." },
      { q: "Do you support distributors and dealers?", a: "Yes. We provide training, merchandising, credit-line structuring and route-to-market support to our distributor network." },
      { q: "Which markets do you reach?", a: "Modern trade, traditional trade, institutional buyers, industrial off-takers and B2B clients across 36 states." },
      { q: "How do I become a distributor?", a: "Contact our commercial team with your coverage area, capacity and credentials to start the assessment process." },
    ],
  },

  "industrial-services": {
    heroImage: sectorIndustrial,
    headline: "Specialist industrial services keeping critical facilities safe, clean and productive.",
    valueProp: "From industrial cleaning to equipment supply and heavy maintenance, we deliver the technical services that keep plants and facilities running.",
    overviewParagraphs: [
      "Our industrial services practice supports factories, oil and gas facilities, hospitals, hospitality operators and commercial complexes with specialist cleaning, industrial chemicals, equipment supply, repairs and structured maintenance programmes.",
      "We combine trained technicians, appropriate PPE, sector-specific SOPs and modern equipment to deliver services safely — with a strong record on hazardous environments, sensitive spaces and high-uptime operations.",
      "Clients rely on us to reduce downtime, extend asset life, comply with strict industry standards and free their teams to focus on core operations while we handle the technical support.",
    ],
    expertise: [
      "Industrial and specialist cleaning",
      "Heavy equipment supply and hire",
      "Industrial chemicals and consumables",
      "Equipment repairs and overhaul",
      "Planned and reactive maintenance",
      "Facility support and janitorial services",
    ],
    stats: [
      { value: "24/7", label: "Response capability" },
      { value: "HSE-1", label: "Safety-led delivery" },
      { value: "Multi", label: "Sector experience" },
      { value: "SLA", label: "Backed contracts" },
    ],
    services: [
      { icon: SprayCan, name: "Industrial Cleaning", description: "Deep cleaning, high-pressure cleaning, tank cleaning and specialist decontamination services.", benefits: ["Safer working environments", "Improved plant hygiene", "Compliant waste handling"], industries: ["Manufacturing", "Oil & Gas", "Healthcare"] },
      { icon: PackageOpen, name: "Equipment Supply", description: "Supply of industrial equipment, tools, spare parts and consumables to plant and facility operators.", benefits: ["Reliable spares availability", "Technical selection support", "Warranty-backed products"], industries: ["Manufacturing", "Oil & Gas", "Construction"] },
      { icon: Beaker, name: "Industrial Chemicals", description: "Supply of cleaning agents, process chemicals and specialty products with documented handling procedures.", benefits: ["Compliant chemical handling", "Consistent quality", "Technical guidance"], industries: ["Manufacturing", "Oil & Gas", "Healthcare"] },
      { icon: Hammer, name: "Equipment Repairs", description: "On-site and workshop repair services for pumps, motors, gearboxes and other industrial equipment.", benefits: ["Faster return-to-service", "Extended equipment life", "Cost-effective refurbishment"], industries: ["Manufacturing", "Oil & Gas", "Energy"] },
      { icon: Settings, name: "Industrial Maintenance", description: "Planned preventive and condition-based maintenance for industrial assets and building systems.", benefits: ["Reduced unplanned downtime", "Better asset performance", "Predictable maintenance spend"], industries: ["Manufacturing", "Oil & Gas", "Healthcare"] },
      { icon: SprayCan, name: "Commercial Solutions", description: "Facility-wide cleaning, janitorial and hygiene programmes for corporate and hospitality clients.", benefits: ["Cleaner workplaces", "Higher occupant satisfaction", "Managed vendor accountability"], industries: ["Corporate Organisations", "Hospitality", "Education"] },
    ],
    equipment: [
      { title: "High-pressure & vacuum systems", body: "Industrial jetting, vacuum trucks and confined-space cleaning equipment." },
      { title: "Diagnostic and testing tools", body: "Vibration, thermographic and ultrasonic tools for condition monitoring." },
      { title: "Modern workshop capability", body: "Machining, welding and rebuild capability for industrial equipment repairs." },
      { title: "Digital maintenance management", body: "CMMS platforms for planning, tracking and reporting maintenance work." },
    ],
    faqs: [
      { q: "What industrial cleaning services do you provide?", a: "High-pressure cleaning, tank cleaning, plant decontamination, confined-space cleaning, HVAC cleaning and specialist decontamination." },
      { q: "Do you handle hazardous environments?", a: "Yes. We work in oil and gas, chemical and industrial environments with full HSE governance, PSSR, permit-to-work and specialist PPE." },
      { q: "Can you provide on-call maintenance?", a: "Yes. We offer 24/7 breakdown response and structured on-call SLA agreements." },
      { q: "Do you supply equipment as well as service it?", a: "Yes. We supply equipment, spare parts, chemicals and consumables — often bundled with maintenance contracts." },
      { q: "How do you manage safety on client sites?", a: "Through client-site inductions, task risk assessments, competent supervisors, PPE compliance and full incident reporting." },
      { q: "Can you run planned maintenance programmes?", a: "Yes. We design and execute PPM programmes using CMMS platforms, condition monitoring and structured KPIs." },
      { q: "Do you handle waste disposal?", a: "Yes, in compliance with local environmental regulations and through approved disposal partners." },
      { q: "What industries do you support most?", a: "Manufacturing, oil and gas, healthcare, hospitality, education and corporate facilities." },
      { q: "Can you provide dedicated on-site teams?", a: "Yes. We deploy dedicated on-site cleaning and maintenance crews with supervisors, SOPs and reporting." },
      { q: "How do I request a service quote?", a: "Share the site, scope and required standards — we assess and respond with a tailored proposal within agreed timelines." },
    ],
  },

  "hospitality-entertainment": {
    heroImage: sectorHosp,
    headline: "Premium hospitality, dining and event experiences with world-class service.",
    valueProp: "Our hospitality group operates and supports hotels, restaurants, catering, conferencing and entertainment ventures that consistently exceed guest expectations.",
    overviewParagraphs: [
      "Dynamic Renaissance operates and partners across the hospitality and entertainment value chain — from full-service hotels and premium restaurants to catering, conferencing, event management and lifestyle venues. Our service culture is built on hospitality excellence, guest empathy and operational discipline.",
      "We combine trained hospitality professionals, refined service standards and modern operational systems to deliver reliably exceptional experiences at scale. Our facilities and services meet the expectations of corporate, government, institutional and private clients hosting important events.",
      "Whether you are planning a landmark conference, a signature dining experience, a large-scale event or a long-stay hospitality partnership, we bring the venues, the talent and the operational rigour to deliver memorable outcomes.",
    ],
    expertise: [
      "Hotel and lodging operations",
      "Restaurants and premium dining",
      "Catering and event services",
      "Conferencing and MICE facilities",
      "Entertainment and lifestyle venues",
      "Hospitality advisory and set-up",
    ],
    stats: [
      { value: "220+", label: "Rooms operated" },
      { value: "5★", label: "Service standards" },
      { value: "Full", label: "MICE capability" },
      { value: "24/7", label: "Guest care" },
    ],
    services: [
      { icon: Hotel, name: "Hotels", description: "Full-service hotel operations covering accommodation, F&B, wellness and guest experience.", benefits: ["Consistent guest experience", "Optimised occupancy", "Strong reputation"], industries: ["Hospitality", "Corporate Organisations", "Government"] },
      { icon: UtensilsCrossed, name: "Restaurants", description: "Signature dining venues offering curated menus, refined service and memorable atmospheres.", benefits: ["Elevated culinary experience", "Trained service teams", "Modern venue design"], industries: ["Hospitality", "Corporate Organisations", "Retail"] },
      { icon: ChefHat, name: "Catering", description: "Corporate, institutional and event catering with structured menu planning and hygiene controls.", benefits: ["Reliable large-scale service", "Food-safety compliance", "Flexible menu options"], industries: ["Corporate Organisations", "Government", "Education"] },
      { icon: CalendarDays, name: "Event Management", description: "Full-service event management for corporate events, conferences, weddings and public functions.", benefits: ["Turn-key event delivery", "Vendor coordination", "Guest-centric planning"], industries: ["Corporate Organisations", "Government", "NGOs"] },
      { icon: Mic, name: "Conference Facilities", description: "Modern conference and meeting facilities with technology, catering and hospitality support.", benefits: ["Professional venues", "Integrated AV", "Full delegate support"], industries: ["Corporate Organisations", "Government", "Education"] },
      { icon: Coffee, name: "Fast Food", description: "Quick-service outlets delivering fresh, consistent and affordable meals across busy locations.", benefits: ["Fast service", "Consistent quality", "Convenient locations"], industries: ["Retail", "SMEs", "Corporate Organisations"] },
      { icon: Mic, name: "Entertainment", description: "Curated entertainment and lifestyle venues with structured event calendars and premium service.", benefits: ["Signature experiences", "Corporate & private hire", "Curated programming"], industries: ["Hospitality", "Corporate Organisations", "Retail"] },
      { icon: Coffee, name: "Beverages", description: "Beverage distribution, bar operations and specialty beverage services for events and venues.", benefits: ["Reliable beverage supply", "Trained bar teams", "Wide beverage portfolio"], industries: ["Hospitality", "Retail", "Corporate Organisations"] },
    ],
    equipment: [
      { title: "Modern hospitality PMS", body: "Property management systems for reservations, guest profiles and integrated revenue management." },
      { title: "Professional kitchen systems", body: "Industrial kitchens with modern equipment, HACCP procedures and trained brigades." },
      { title: "Event AV and staging", body: "Modern audio-visual, staging and lighting equipment for large-scale events and conferences." },
      { title: "Digital guest experience", body: "Online bookings, digital check-in, loyalty and guest-feedback platforms." },
    ],
    faqs: [
      { q: "Do you operate your own hotels?", a: "Yes. We own, operate and partner in hospitality venues across accommodation, dining and entertainment." },
      { q: "Can you host large conferences?", a: "Yes. Our conference facilities and event teams handle events from small executive meetings to multi-day international conferences." },
      { q: "Do you offer catering for large corporate events?", a: "Yes. We provide catering for corporate events, conferences, weddings and government functions with structured food-safety controls." },
      { q: "How do you maintain service standards?", a: "Through structured training, service SOPs, mystery-guest audits, guest feedback and continuous performance reviews." },
      { q: "Can you plan and execute a full event?", a: "Yes. Our event management practice provides turn-key delivery including venue, catering, décor, staging and guest coordination." },
      { q: "Do you serve government and institutional clients?", a: "Yes. We work with government, embassies, corporates and institutions with formal contracting and compliance." },
      { q: "How do you handle food safety?", a: "We follow HACCP-aligned procedures, kitchen hygiene SOPs, trained brigades and regular audits." },
      { q: "Do you offer long-term accommodation contracts?", a: "Yes, for corporate clients we provide structured long-stay agreements with negotiated rates and services." },
      { q: "Can you set up hospitality operations for third parties?", a: "Yes. Our advisory practice helps investors set up and run hotels, restaurants and hospitality venues under professional operating models." },
      { q: "How do I book a venue or plan an event?", a: "Contact our hospitality team with the date, headcount and event brief — we will respond with tailored options and a quotation." },
    ],
  },

  "business-consultancy": {
    heroImage: sectorConsultancy,
    headline: "Business support and consultancy for organisations pursuing meaningful growth.",
    valueProp: "We combine strategy, operations, marketing, training and digital expertise to help clients transform performance and unlock long-term value.",
    overviewParagraphs: [
      "Our consultancy practice supports government bodies, corporates, financial institutions and SMEs across strategy, corporate advisory, operations improvement, marketing, business development, training and digital transformation. We combine sector insight with executional discipline.",
      "Our consultants bring deep on-the-ground experience — many drawn from our operating businesses — which means our advice is practical, tested and grounded in commercial reality. We don't just recommend; we help clients implement, measure and sustain change.",
      "Whether you are entering a new market, restructuring an operating model, launching a brand, upskilling a workforce or digitising core processes, we bring the frameworks, the specialists and the delivery muscle to move you forward.",
    ],
    expertise: [
      "Corporate strategy and market entry",
      "Operations and performance improvement",
      "Marketing, brand and go-to-market",
      "Training, capability and leadership",
      "Digital transformation and technology",
      "Business development and partnerships",
    ],
    stats: [
      { value: "Multi", label: "Sector expertise" },
      { value: "Board", label: "Level engagement" },
      { value: "Impact", label: "Focused delivery" },
      { value: "Global", label: "Best practice" },
    ],
    services: [
      { icon: Briefcase, name: "Business Consulting", description: "Structured problem-solving and advisory across strategy, operations and organisational design.", benefits: ["Sharper strategic focus", "Better decisions", "Actionable roadmaps"], industries: ["Corporate Organisations", "Government", "Financial Institutions"] },
      { icon: TrendingUp, name: "Strategy", description: "Corporate, growth and portfolio strategy grounded in market data, competitive analysis and internal capability.", benefits: ["Clear direction", "Prioritised initiatives", "Investor-ready narrative"], industries: ["Corporate Organisations", "Financial Institutions", "SMEs"] },
      { icon: UsersRound, name: "Corporate Advisory", description: "Board-level advisory covering governance, transformation, restructuring and stakeholder engagement.", benefits: ["Stronger governance", "Confident boards", "Structured transformation"], industries: ["Corporate Organisations", "Government", "Financial Institutions"] },
      { icon: Megaphone, name: "Marketing", description: "Brand strategy, marketing planning, campaign design and channel execution across traditional and digital media.", benefits: ["Stronger brand equity", "Better campaign ROI", "Integrated channel mix"], industries: ["Retail", "SMEs", "Corporate Organisations"] },
      { icon: Rocket, name: "Business Development", description: "Support with market entry, deal origination, partnerships and channel expansion.", benefits: ["Faster market entry", "Structured partnerships", "New revenue channels"], industries: ["SMEs", "Corporate Organisations", "Financial Institutions"] },
      { icon: GraduationCap, name: "Training", description: "Executive training, technical skills programmes and leadership development for teams and organisations.", benefits: ["Stronger capability", "Better retention", "Structured development"], industries: ["Corporate Organisations", "Government", "Education"] },
      { icon: Settings, name: "Operations Support", description: "Operating-model design, process improvement and shared-services execution.", benefits: ["Higher productivity", "Lower cost-to-serve", "Better SLAs"], industries: ["Manufacturing", "Financial Institutions", "Government"] },
      { icon: MonitorSmartphone, name: "Digital Transformation", description: "Digital strategy, technology selection and change delivery to modernise how organisations operate.", benefits: ["Modern digital capability", "Better data insights", "Sustainable change adoption"], industries: ["Financial Institutions", "Corporate Organisations", "Government"] },
    ],
    equipment: [
      { title: "Structured advisory frameworks", body: "Proven strategy, operations and transformation frameworks tailored to each engagement." },
      { title: "Data & analytics tools", body: "Modern analytics, dashboarding and modelling tools that turn data into decisions." },
      { title: "Digital delivery capability", body: "Cross-functional squads capable of running discovery, design and delivery sprints." },
      { title: "Learning platforms", body: "Blended learning platforms combining in-person, virtual and self-paced formats." },
    ],
    faqs: [
      { q: "What kinds of clients do you work with?", a: "Corporates, financial institutions, government agencies, NGOs and ambitious SMEs across sectors." },
      { q: "How do engagements typically start?", a: "Usually with a scoping conversation followed by a written proposal defining objectives, approach, deliverables and pricing." },
      { q: "Do you only advise, or also implement?", a: "Both. We combine advisory with implementation support to make sure recommendations translate into results." },
      { q: "How do you protect confidential information?", a: "Through formal NDAs, strict internal information-handling protocols and clean-team practices where required." },
      { q: "Can you support market-entry projects?", a: "Yes. We support with market sizing, competitive analysis, regulatory review, partner identification and go-to-market planning." },
      { q: "Do you offer training and capability building?", a: "Yes. From executive leadership programmes to targeted technical training and blended learning journeys." },
      { q: "How is success measured?", a: "Every engagement has clearly defined KPIs — commercial, operational or organisational — and we review progress against them formally." },
      { q: "Do you work internationally?", a: "Our primary market is Nigeria and West Africa, and we support clients with international ambitions through our partner network." },
      { q: "What is the typical duration of an engagement?", a: "From short diagnostics of a few weeks to multi-year transformation programmes — scoped to the outcome." },
      { q: "How do I request a consultation?", a: "Reach out through our contact page with a short brief; a partner will schedule a scoping call within a few working days." },
    ],
  },
};
