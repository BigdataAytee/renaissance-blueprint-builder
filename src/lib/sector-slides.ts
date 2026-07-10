import ppmConstruction from "@/assets/sector-slides/ppm-construction.jpg";
import ppmFacility from "@/assets/sector-slides/ppm-facility.jpg";
import ppmProperty from "@/assets/sector-slides/ppm-property.jpg";
import oilRig from "@/assets/sector-slides/oil-rig.jpg";
import oilDepot from "@/assets/sector-slides/oil-depot.jpg";
import oilPipeline from "@/assets/sector-slides/oil-pipeline.jpg";
import agriHarvest from "@/assets/sector-slides/agri-harvest.jpg";
import agriPoultry from "@/assets/sector-slides/agri-poultry.jpg";
import agriProcessing from "@/assets/sector-slides/agri-processing.jpg";
import logFleet from "@/assets/sector-slides/log-fleet.jpg";
import logWarehouse from "@/assets/sector-slides/log-warehouse.jpg";
import logPort from "@/assets/sector-slides/log-port.jpg";
import mfgFactory from "@/assets/sector-slides/mfg-factory.jpg";
import mfgMaterials from "@/assets/sector-slides/mfg-materials.jpg";
import mfgDistribution from "@/assets/sector-slides/mfg-distribution.jpg";
import indCleaning from "@/assets/sector-slides/ind-cleaning.jpg";
import indRepair from "@/assets/sector-slides/ind-repair.jpg";
import indChemicals from "@/assets/sector-slides/ind-chemicals.jpg";
import hospHotel from "@/assets/sector-slides/hosp-hotel.jpg";
import hospRestaurant from "@/assets/sector-slides/hosp-restaurant.jpg";
import hospEvents from "@/assets/sector-slides/hosp-events.jpg";
import consBoardroom from "@/assets/sector-slides/cons-boardroom.jpg";
import consStrategy from "@/assets/sector-slides/cons-strategy.jpg";
import consTraining from "@/assets/sector-slides/cons-training.jpg";

export type SectorSlide = { image: string; title: string; caption: string };

export const sectorSlides: Record<string, SectorSlide[]> = {
  "project-property-management": [
    { image: ppmConstruction, title: "Construction Management", caption: "Tower cranes, steel frames and disciplined site delivery for landmark commercial and industrial builds." },
    { image: ppmFacility, title: "Facility Management", caption: "HVAC, electrical, plumbing and building systems maintained by certified technical crews." },
    { image: ppmProperty, title: "Property & Real Estate", caption: "Grade-A commercial towers and mixed-use developments managed for long-term asset performance." },
  ],
  "oil-and-gas": [
    { image: oilRig, title: "Oilfield & Upstream Services", caption: "Offshore drilling platforms, wellhead operations and technical support for upstream operators." },
    { image: oilDepot, title: "Fuel Storage & Distribution", caption: "PMS, AGO, DPK and Jet A1 storage terminals with automated loading and tanker dispatch." },
    { image: oilPipeline, title: "Pipeline & Gas Infrastructure", caption: "Gas pipelines, LNG facilities and LPG networks supported by inspection and integrity services." },
  ],
  agriculture: [
    { image: agriHarvest, title: "Mechanised Farming", caption: "Combine harvesters, tractors and modern equipment across grain, cocoa, rice and cassava estates." },
    { image: agriPoultry, title: "Poultry & Livestock", caption: "Commercial poultry houses and livestock operations built to biosecurity and welfare standards." },
    { image: agriProcessing, title: "Agro-Processing", caption: "Milling, drying and packaging lines that turn raw commodities into market-ready products." },
  ],
  "logistics-distribution": [
    { image: logFleet, title: "Fleet & Haulage", caption: "Heavy-duty trucks and articulated tankers moving bulk cargo across national corridors." },
    { image: logWarehouse, title: "Warehousing & Storage", caption: "Racked warehouses with forklift fleets, WMS integration and cold-chain capability." },
    { image: logPort, title: "Freight & Import/Export", caption: "Container freight, port handling and customs clearance for international trade lanes." },
  ],
  "manufacturing-trading": [
    { image: mfgFactory, title: "Industrial Manufacturing", caption: "Automated assembly lines producing industrial and consumer goods at scale." },
    { image: mfgMaterials, title: "Building Materials & Industrial Products", caption: "Cement, steel rebar, fasteners, lubricants and filters supplied to construction and industry." },
    { image: mfgDistribution, title: "Wholesale & Product Distribution", caption: "Bulk stocking and multi-channel distribution to retailers, distributors and B2B customers." },
  ],
  "industrial-services": [
    { image: indCleaning, title: "Industrial Cleaning", caption: "Tank, vessel and plant cleaning with high-pressure systems and certified HSE protocols." },
    { image: indRepair, title: "Equipment Repair & Maintenance", caption: "Welding, machining and preventive maintenance on rotating equipment and heavy machinery." },
    { image: indChemicals, title: "Industrial Chemicals & Equipment", caption: "Solvents, degreasers, lubricants and specialist industrial equipment supply." },
  ],
  "hospitality-entertainment": [
    { image: hospHotel, title: "Hotels & Resorts", caption: "Five-star hospitality properties with premium guest rooms, wellness suites and concierge service." },
    { image: hospRestaurant, title: "Restaurants & Catering", caption: "Fine-dining outlets, corporate catering and multi-site food service operations." },
    { image: hospEvents, title: "Conferences & Events", caption: "Banquet halls, conference facilities and turnkey event management for gatherings of any scale." },
  ],
  "business-consultancy": [
    { image: consBoardroom, title: "Corporate Advisory", caption: "Board-level advisory on strategy, governance, transactions and market entry." },
    { image: consStrategy, title: "Strategy & Business Development", caption: "Data-driven strategy, feasibility studies and go-to-market roadmaps for growth." },
    { image: consTraining, title: "Training & Operations Support", caption: "Executive training, capability building and hands-on operational improvement programmes." },
  ],
};
