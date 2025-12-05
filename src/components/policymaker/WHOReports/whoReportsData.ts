import { ComparisonDataPoint, RecentReport } from "./types";

export const comparisonData: ComparisonDataPoint[] = [
  { metal: "Lead", measured: 0.08, whoLimit: 0.01, exceedance: 700 },
  { metal: "Arsenic", measured: 0.05, whoLimit: 0.01, exceedance: 400 },
  { metal: "Cadmium", measured: 0.02, whoLimit: 0.003, exceedance: 567 },
  { metal: "Mercury", measured: 0.01, whoLimit: 0.001, exceedance: 900 },
];

export const recentReports: RecentReport[] = [
  {
    id: 1,
    name: "Annual Water Quality Assessment 2024",
    type: "Annual Assessment",
    scope: "National",
    status: "published",
    generatedOn: "2024-10-15",
    downloadUrl: "#"
  },
  {
    id: 2,
    name: "Q3 2024 Compliance Review",
    type: "Quarterly Analysis", 
    scope: "State Level",
    status: "published",
    generatedOn: "2024-09-30",
    downloadUrl: "#"
  },
  {
    id: 3,
    name: "Tamil Nadu Industrial Investigation",
    type: "Special Investigation",
    scope: "State Level", 
    status: "draft",
    generatedOn: "2024-11-08",
    downloadUrl: "#"
  },
  {
    id: 4,
    name: "Maharashtra Chemical Contamination Report",
    type: "Special Investigation",
    scope: "District Level",
    status: "pending",
    generatedOn: "2024-11-05",
    downloadUrl: "#"
  },
  {
    id: 5,
    name: "Kerala Coastal Salinity Assessment",
    type: "Compliance Review",
    scope: "Custom Region",
    status: "published",
    generatedOn: "2024-10-28",
    downloadUrl: "#"
  },
  {
    id: 6,
    name: "Karnataka IT Hub Water Crisis Report",
    type: "Special Investigation",
    scope: "District Level",
    status: "draft",
    generatedOn: "2024-11-02",
    downloadUrl: "#"
  }
];
