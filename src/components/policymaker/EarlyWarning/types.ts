// Type definitions for EarlyWarning components

export interface AlertConfig {
  id: number;
  title: string;
  status: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lastCalibration: string;
  enabled: boolean;
}

export interface Prediction {
  id: string;
  title: string;
  riskLevel: string;
  probability: number;
  description: string;
  type: string;
  timeframe: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  riskColor: string;
  badgeColor: string;
}

export interface Protocol {
  id: number;
  task: string;
  icon: React.ReactNode;
  priority: string;
}
