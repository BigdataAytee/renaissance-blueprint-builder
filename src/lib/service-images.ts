// Curated AI-generated images per service card. Each image is picked to
// visually match the specific products, commodities, equipment or facilities
// mentioned in the corresponding sector-content service description.
// Sectors not listed here fall back to the loremflickr keyword slideshow.

// -------- Agriculture --------
import agriCrop1 from "@/assets/service-slides/agriculture/crop-1.jpg";
import agriCrop2 from "@/assets/service-slides/agriculture/crop-2.jpg";
import agriMech1 from "@/assets/service-slides/agriculture/mech-1.jpg";
import agriMech2 from "@/assets/service-slides/agriculture/mech-2.jpg";
import agriPalm1 from "@/assets/service-slides/agriculture/palm-1.jpg";
import agriPalm2 from "@/assets/service-slides/agriculture/palm-2.jpg";
import agriPoultry1 from "@/assets/service-slides/agriculture/poultry-1.jpg";
import agriPoultry2 from "@/assets/service-slides/agriculture/poultry-2.jpg";
import agriLivestock1 from "@/assets/service-slides/agriculture/livestock-1.jpg";
import agriLivestock2 from "@/assets/service-slides/agriculture/livestock-2.jpg";
import agriAgro1 from "@/assets/service-slides/agriculture/agro-1.jpg";
import agriAgro2 from "@/assets/service-slides/agriculture/agro-2.jpg";
import agriFert1 from "@/assets/service-slides/agriculture/fert-1.jpg";
import agriFert2 from "@/assets/service-slides/agriculture/fert-2.jpg";
import agriEquip1 from "@/assets/service-slides/agriculture/equip-1.jpg";
import agriEquip2 from "@/assets/service-slides/agriculture/equip-2.jpg";
import agriExport1 from "@/assets/service-slides/agriculture/export-1.jpg";
import agriExport2 from "@/assets/service-slides/agriculture/export-2.jpg";

export const serviceImages: Record<string, Record<string, string[]>> = {
  agriculture: {
    "Commercial Crop Production": [agriCrop1, agriCrop2],
    "Mechanised & Irrigation Farming": [agriMech1, agriMech2],
    "Palm Oil, Rubber & Ginger Value Chains": [agriPalm1, agriPalm2],
    "Poultry & Fish Farming": [agriPoultry1, agriPoultry2],
    Livestock: [agriLivestock1, agriLivestock2],
    "Agro-Processing, Storage & Packaging": [agriAgro1, agriAgro2],
    "Fertilizers, Seeds & Agrochemicals": [agriFert1, agriFert2],
    "Agricultural Equipment": [agriEquip1, agriEquip2],
    "Commodity Export & Advisory": [agriExport1, agriExport2],
  },
};
