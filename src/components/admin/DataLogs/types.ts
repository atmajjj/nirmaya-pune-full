export interface LogEntry {
  id: number;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  type: string;
  status: 'success' | 'failed' | 'running';
  ip: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface ChartDataItem {
  time?: string;
  logs?: number;
  name?: string;
  value?: number;
  color?: string;
  severity?: string;
  count?: number;
}
