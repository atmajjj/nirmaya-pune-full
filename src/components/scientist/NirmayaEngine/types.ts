export interface SampleData {
  id: string;
  location: string;
  As: number;
  Cr: number;
  Pb: number;
  Cd: number;
  status: string;
  hmpi: number;
}

export interface AnalysisMetric {
  label: string;
  value: string | number;
  color: string;
}
