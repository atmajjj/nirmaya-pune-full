export interface SummaryStat {
  title: string;
  value: number;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  decimal?: boolean;
}

export interface ContaminationTrend {
  title: string;
  value: number;
  change: string;
  progress: number;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

export interface HistoricalDataPoint {
  year: string;
  delhi: number;
  mumbai: number;
  bangalore: number;
  chennai: number;
  kolkata: number;
}

export interface PredictiveDataPoint {
  year: string;
  actual: number | null;
  predicted: number | null;
}

export interface RegionalRisk {
  name: string;
  value: number;
  change: string;
  risk: "critical" | "moderate" | "low";
  color: string;
}
