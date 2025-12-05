import type { Dataset } from './types';

export const datasets: Dataset[] = [
  {
    id: "DS001",
    title: "Central Ground Water Board (CGWB) Dataset",
    description: "Comprehensive groundwater quality data across India with HMPI calculations",
    type: "Government",
    source: "Government of India",
    size: "2.3 GB",
    format: ["CSV", "JSON"],
    updated: "2024-09",
    available: true,
    category: "government"
  },
  {
    id: "DS002", 
    title: "WHO Water Quality Standards",
    description: "International drinking water quality guidelines and standards",
    type: "International",
    source: "World Health Organization",
    size: "15 MB",
    format: ["PDF", "XLSX"],
    updated: "2022-08",
    available: true,
    category: "international"
  },
  {
    id: "DS003",
    title: "BIS Drinking Water Specification", 
    description: "Bureau of Indian Standards specifications for drinking water quality",
    type: "Government",
    source: "CPCB",
    size: "5 MB",
    format: ["PDF"],
    updated: "2018-02",
    available: true,
    category: "government"
  },
  {
    id: "DS004",
    title: "State-wise Water Quality Reports",
    description: "Annual water quality assessment reports from all Indian states",
    type: "Government", 
    source: "Ministry of Jal Shakti",
    size: "1.2 GB",
    format: ["PDF", "XLSX"],
    updated: "2024-06",
    available: true,
    category: "government"
  },
  {
    id: "DS005",
    title: "National Water Mission (NWM) Document",
    description: "Document related to water quality and management under NWM",
    type: "Government",
    source: "National Water Mission",
    size: "10 MB", 
    format: ["PDF"],
    updated: "2011-04",
    available: true,
    category: "government"
  },
  {
    id: "DS006",
    title: "Research Publications Archive",
    description: "Collection of peer-reviewed papers on water contamination and HMPI",
    type: "Academic",
    source: "Academic Institutions", 
    size: "2.1 GB",
    format: ["PDF", "BibTeX"],
    updated: "2024-10",
    available: false,
    category: "academic"
  }
];
