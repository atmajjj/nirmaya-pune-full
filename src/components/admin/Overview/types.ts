export interface SystemPerformanceData {
  time: string;
  cpu: number;
  memory: number;
  diskIO: number;
  requests: number;
}

export interface NetworkData {
  time: string;
  incoming: number;
  outgoing: number;
  latency: number;
}

export interface UserActivityData {
  name: string;
  value: number;
  color: string;
}

export interface APIEndpoint {
  endpoint: string;
  avgResponse: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor';
  requests: number;
}

export interface SystemService {
  name: string;
  status: 'running' | 'warning' | 'error';
  lastUpdated: string;
  uptime: string;
}

export interface SystemAlert {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface RecentLogin {
  user: string;
  time: string;
  ip: string;
  location: string;
}
