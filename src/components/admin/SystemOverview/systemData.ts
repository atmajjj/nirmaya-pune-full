import { SystemPerformanceData, NetworkData, UserActivityData, APIEndpoint, SystemService, SystemAlert, RecentLogin } from './types';

export const systemPerformanceData: SystemPerformanceData[] = [
  { time: "00:00", cpu: 45, memory: 62, diskIO: 23, requests: 145 },
  { time: "04:00", cpu: 52, memory: 58, diskIO: 31, requests: 178 },
  { time: "08:00", cpu: 78, memory: 71, diskIO: 45, requests: 234 },
  { time: "12:00", cpu: 85, memory: 79, diskIO: 52, requests: 289 },
  { time: "16:00", cpu: 72, memory: 74, diskIO: 38, requests: 267 },
  { time: "20:00", cpu: 59, memory: 67, diskIO: 29, requests: 198 },
];

export const networkData: NetworkData[] = [
  { time: "00:00", incoming: 1200, outgoing: 890, latency: 45 },
  { time: "04:00", incoming: 1450, outgoing: 1120, latency: 38 },
  { time: "08:00", incoming: 2100, outgoing: 1680, latency: 52 },
  { time: "12:00", incoming: 2890, outgoing: 2340, latency: 67 },
  { time: "16:00", incoming: 2650, outgoing: 2180, latency: 59 },
  { time: "20:00", incoming: 1890, outgoing: 1420, latency: 43 },
];

export const userActivityData: UserActivityData[] = [
  { name: "Admin", value: 4, color: "#ef4444" },
  { name: "Scientists", value: 28, color: "#3b82f6" },
  { name: "Policymakers", value: 15, color: "#10b981" },
  { name: "Analysts", value: 12, color: "#f59e0b" },
  { name: "Viewers", value: 8, color: "#8b5cf6" },
];

export const apiEndpoints: APIEndpoint[] = [
  { endpoint: "/api/data/upload", avgResponse: 125, status: "good", requests: 1240 },
  { endpoint: "/api/analysis/hmpi", avgResponse: 89, status: "excellent", requests: 890 },
  { endpoint: "/api/reports/generate", avgResponse: 345, status: "moderate", requests: 156 },
  { endpoint: "/api/users/auth", avgResponse: 45, status: "excellent", requests: 2340 },
  { endpoint: "/api/alerts/fetch", avgResponse: 234, status: "moderate", requests: 678 },
];

export const systemServices: SystemService[] = [
  { name: "HMPI Engine", status: "running", lastUpdated: "2 mins ago", uptime: "99.9%" },
  { name: "Formula Parser", status: "running", lastUpdated: "5 mins ago", uptime: "99.7%" },
  { name: "Data Sync Service", status: "warning", lastUpdated: "15 mins ago", uptime: "98.2%" },
  { name: "Report Generator", status: "running", lastUpdated: "1 min ago", uptime: "99.8%" },
  { name: "Alert System", status: "running", lastUpdated: "3 mins ago", uptime: "100%" },
];

export const systemAlerts: SystemAlert[] = [
  { 
    id: 1, 
    severity: "critical", 
    message: "Database connection pool exhausted", 
    timestamp: "2 mins ago",
    resolved: false 
  },
  { 
    id: 2, 
    severity: "warning", 
    message: "High memory usage detected on server-02", 
    timestamp: "15 mins ago",
    resolved: false 
  },
  { 
    id: 3, 
    severity: "info", 
    message: "Scheduled backup completed successfully", 
    timestamp: "1 hour ago",
    resolved: true 
  },
];

export const recentLogins: RecentLogin[] = [
  { user: "Dr. Rajesh Kumar", time: "2 mins ago", ip: "192.168.1.45", location: "Mumbai" },
  { user: "Priya Sharma", time: "8 mins ago", ip: "10.0.0.23", location: "Delhi" },
  { user: "Admin User", time: "12 mins ago", ip: "172.16.0.5", location: "Bangalore" },
  { user: "Amit Patel", time: "18 mins ago", ip: "192.168.1.78", location: "Pune" },
];
