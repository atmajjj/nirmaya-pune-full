import { HistoricalDataPoint, PredictiveDataPoint, RegionalRisk } from "./types";

export const historicalData: HistoricalDataPoint[] = [
  { year: "2019", delhi: 45, mumbai: 38, bangalore: 22, chennai: 42, kolkata: 51 },
  { year: "2020", delhi: 52, mumbai: 41, bangalore: 25, chennai: 48, kolkata: 58 },
  { year: "2021", delhi: 58, mumbai: 39, bangalore: 28, chennai: 52, kolkata: 64 },
  { year: "2022", delhi: 67, mumbai: 43, bangalore: 26, chennai: 55, kolkata: 71 },
  { year: "2023", delhi: 76, mumbai: 42, bangalore: 28, chennai: 59, kolkata: 82 },
];

export const predictiveData: PredictiveDataPoint[] = [
  { year: "2023", actual: 76, predicted: null },
  { year: "2024", actual: null, predicted: 82 },
  { year: "2025", actual: null, predicted: 89 },
  { year: "2026", actual: null, predicted: 95 },
];

export const regionalRisks: RegionalRisk[] = [
  { name: "Kolkata", value: 82, change: "+31", risk: "critical", color: "from-red-500 to-red-600" },
  { name: "Delhi", value: 76, change: "+31", risk: "critical", color: "from-red-500 to-orange-500" },
  { name: "Chennai", value: 59, change: "+17", risk: "moderate", color: "from-orange-500 to-yellow-500" },
  { name: "Mumbai", value: 42, change: "+4", risk: "moderate", color: "from-yellow-500 to-green-500" },
  { name: "Bangalore", value: 28, change: "+6", risk: "low", color: "from-green-500 to-emerald-500" },
];
