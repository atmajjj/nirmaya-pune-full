export interface MonthlyData {
  month: string;
  publications: number;
  citations: number;
}

export interface ResearchArea {
  name: string;
  papers: number;
  percentage: number;
  color: string;
}

export interface Publication {
  id: number;
  title: string;
  journal: string;
  publishedDate: string;
  status: string;
  statusColor: string;
  citations: number;
}

export interface MetricCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}
