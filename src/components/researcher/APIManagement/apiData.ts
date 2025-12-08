import type { PublicAPI } from './types';

export const publicAPIs: PublicAPI[] = [
  {
    id: "cgwb-wims",
    name: "CGWB WIMS Telemetry",
    status: "Active",
    description: "Telemetry data for groundwater level monitoring via WIMS.",
    baseUrl: "https://cgwb.gov.in/en/ground-water-level-monitoring",
    category: "Government",
    icon: "chart"
  },
  {
    id: "india-wris-gis",
    name: "India-WRIS ArcGIS Services",
    status: "Active",
    description: "GIS layers and data services for water resources via ArcGIS REST API.",
    baseUrl: "https://indiawris.gov.in/wris/",
    category: "Government",
    icon: "globe"
  },
  {
    id: "nwic-api",
    name: "NWIC Water Data API",
    status: "Restricted",
    description: "Access to National Water Informatics Centre data (Request-based).",
    baseUrl: "https://nwic.gov.in/data",
    category: "Government",
    icon: "database"
  },
  {
    id: "ogd-surface-water",
    name: "OGD Surface Water Quality API",
    status: "Active",
    description: "Open Government Data API for Surface Water Quality.",
    baseUrl: "https://www.data.gov.in/resource/surface-water-quality-march-2021-cpcb/api",
    category: "Government",
    icon: "database"
  },
  {
    id: "ogd-gw-stations",
    name: "OGD GW Quality Stations API",
    status: "Active",
    description: "Open Government Data API for Groundwater Quality Stations location data.",
    baseUrl: "https://www.data.gov.in/resource/shape-file-ground-water-quality-stations/api",
    category: "Government",
    icon: "globe"
  }
];
