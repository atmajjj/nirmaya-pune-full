import type { CityHMPI, Contaminant, Alert, RiskDistribution } from './types';

export const cityHMPI: CityHMPI[] = [
  { city: "Delhi", value: 72.3, metal: "Arsenic", source: "Industrial runoff", status: "Critical" },
  { city: "Mumbai", value: 68.7, metal: "Arsenic", source: "Municipal + industrial", status: "Critical" },
  { city: "Kanpur", value: 65.9, metal: "Lead", source: "Tannery effluent", status: "Critical" },
  { city: "Ludhiana", value: 59.4, metal: "Chromium", source: "Textile dyeing", status: "High" },
  { city: "Surat", value: 52.8, metal: "Lead", source: "Industrial", status: "High" },
  { city: "Vadodara", value: 48.5, metal: "Cadmium", source: "Chemical cluster", status: "Medium" },
];

export const contaminants: Contaminant[] = [
  { name: "Arsenic", value: 35, sites: 86, color: "#06b6d4" },
  { name: "Lead", value: 28, sites: 69, color: "#0ea5a4" },
  { name: "Mercury", value: 18, sites: 44, color: "#14b8a6" },
  { name: "Cadmium", value: 12, sites: 30, color: "#10b981" },
  { name: "Chromium", value: 7, sites: 18, color: "#0f766e" },
];

export const recentAlerts: Alert[] = [
  { id: 'AL-001', city: 'Mumbai, Maharashtra', metal: 'Arsenic', time: '2 hours ago', severity: 92, level: 'critical' },
  { id: 'AL-002', city: 'Delhi, NCR', metal: 'Lead', time: '4 hours ago', severity: 78, level: 'critical' },
  { id: 'AL-003', city: 'Chennai, Tamil Nadu', metal: 'Mercury', time: '6 hours ago', severity: 85, level: 'critical' },
];

export const riskDistributionData: RiskDistribution[] = [
  { name: 'Low', value: 135, color: '#34d399' },
  { name: 'Medium', value: 89, color: '#f59e0b' },
  { name: 'High', value: 23, color: '#f97316' },
];
