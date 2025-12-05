import type { PublicAPI } from './types';

export const publicAPIs: PublicAPI[] = [
  {
    id: "india-wris",
    name: "India-WRIS API Catalogue",
    status: "Active",
    description: "Comprehensive API catalogue for India Water Resources Information System",
    baseUrl: "https://indiawris.gov.in/wris/#/apiCatalog",
    category: "Government",
    icon: "globe"
  },
  {
    id: "data-gov-in",
    name: "Groundwater Quality Datasets (data.gov.in)",
    status: "Active", 
    description: "Search and access groundwater datasets from the Open Government Data Platform India",
    baseUrl: "https://www.data.gov.in/search?title=ground%20water%20quality",
    category: "Government",
    icon: "database"
  },
  {
    id: "cgwb-portal",
    name: "CGWB Groundwater Data Portal",
    status: "Active",
    description: "Portal for groundwater level and quality bulletins, publications, and datasets",
    baseUrl: "https://gwdata.cgwb.gov.in/",
    category: "Government", 
    icon: "chart"
  }
];
