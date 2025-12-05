import type { MapLayer, SampleSite } from './types';
import { MapPin, Thermometer, AlertTriangle, Droplet, TrendingUp } from "lucide-react";

export const mapLayers: MapLayer[] = [
  {
    id: "sampling-points",
    name: "Sampling Points",
    type: "points",
    visible: true,
    count: 247,
    color: "#3b82f6",
    icon: MapPin,
    description: "Active monitoring locations"
  },
  {
    id: "heavy-metals",
    name: "Heavy Metal Distribution",
    type: "heatmap",
    visible: true,
    count: null,
    color: "#ef4444",
    icon: Thermometer,
    description: "Concentration heat map"
  },
  {
    id: "risk-zones",
    name: "Risk Zones",
    type: "polygons",
    visible: false,
    count: 23,
    color: "#f59e0b",
    icon: AlertTriangle,
    description: "High-risk contamination areas"
  },
  {
    id: "water-bodies",
    name: "Water Bodies",
    type: "polygons",
    visible: true,
    count: 45,
    color: "#06b6d4",
    icon: Droplet,
    description: "Rivers, lakes, and reservoirs"
  },
  {
    id: "pollution-trends",
    name: "Pollution Trends",
    type: "vectors",
    visible: false,
    count: null,
    color: "#8b5cf6",
    icon: TrendingUp,
    description: "Temporal pollution patterns"
  }
];

export const sampleSites: SampleSite[] = [
  {
    id: "site_001",
    name: "Mumbai Industrial Zone - Site A",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    riskLevel: "High",
    hmpiScore: 185.4,
    lastSampled: "2024-11-28",
    metals: {
      chromium: { value: 0.15, limit: 0.05, unit: "mg/L" },
      lead: { value: 0.08, limit: 0.01, unit: "mg/L" },
      arsenic: { value: 0.12, limit: 0.01, unit: "mg/L" },
      cadmium: { value: 0.003, limit: 0.003, unit: "mg/L" }
    }
  },
  {
    id: "site_002",
    name: "Suburban Residential - Site B",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    riskLevel: "Medium",
    hmpiScore: 78.2,
    lastSampled: "2024-11-27",
    metals: {
      chromium: { value: 0.03, limit: 0.05, unit: "mg/L" },
      lead: { value: 0.015, limit: 0.01, unit: "mg/L" },
      arsenic: { value: 0.008, limit: 0.01, unit: "mg/L" },
      cadmium: { value: 0.001, limit: 0.003, unit: "mg/L" }
    }
  },
  {
    id: "site_003",
    name: "Agricultural Area - Site C",
    coordinates: { lat: 19.0330, lng: 72.8570 },
    riskLevel: "Low",
    hmpiScore: 34.8,
    lastSampled: "2024-11-26",
    metals: {
      chromium: { value: 0.02, limit: 0.05, unit: "mg/L" },
      lead: { value: 0.005, limit: 0.01, unit: "mg/L" },
      arsenic: { value: 0.004, limit: 0.01, unit: "mg/L" },
      cadmium: { value: 0.001, limit: 0.003, unit: "mg/L" }
    }
  }
];
