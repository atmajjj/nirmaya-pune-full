export interface SummaryMetric {
  title: string;
  value: number | string;
  trend: string;
  trendDirection: "up" | "down";
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  type: string;
  category: string;
  severity: "critical" | "moderate" | "low";
  source: string;
  detectedOn: string;
  region: string;
  district: string;
  status: "active" | "in-review" | "resolved";
  hmpi: number;
  contaminant: string;
  population: string;
  lastUpdated: string;
  assignedTo: string;
  actionTaken: string;
  confidence: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  priority: number;
}

export interface RiskInsight {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
  region: string;
}

export interface ActionLog {
  id: string;
  action: string;
  assignedTo: string;
  timestamp: string;
  status: "in-progress" | "completed";
}
