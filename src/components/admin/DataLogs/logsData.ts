import { LogEntry } from './types';

export const logs: LogEntry[] = [
  { 
    id: 1, 
    user: "Dr. Rajesh Kumar", 
    role: "Scientist",
    action: "Uploaded dataset", 
    module: "Data Management",
    details: "Delhi_samples_Q2_2023.csv", 
    timestamp: "2025-11-10 21:45:32", 
    type: "upload",
    status: "success",
    ip: "192.168.0.34",
    severity: "info"
  },
  { 
    id: 2, 
    user: "System", 
    role: "Background Job",
    action: "Data synchronization", 
    module: "Scheduler",
    details: "Automated backup process", 
    timestamp: "2025-11-10 21:30:15", 
    type: "system",
    status: "running",
    ip: "Internal",
    severity: "info"
  },
  { 
    id: 3, 
    user: "Priya Sharma", 
    role: "Scientist",
    action: "Calculated HMPI", 
    module: "HMPI Engine",
    details: "Mumbai region analysis - 450 samples", 
    timestamp: "2025-11-10 20:15:22", 
    type: "analysis",
    status: "success",
    ip: "192.168.1.15",
    severity: "info"
  },
  { 
    id: 4, 
    user: "Admin User", 
    role: "Administrator",
    action: "Failed login attempt", 
    module: "Authentication",
    details: "Invalid credentials - 3 attempts", 
    timestamp: "2025-11-10 19:45:10", 
    type: "security",
    status: "failed",
    ip: "203.45.67.89",
    severity: "warning"
  },
  { 
    id: 5, 
    user: "Amit Patel", 
    role: "Policymaker",
    action: "Generated report", 
    module: "Reports",
    details: "WHO Compliance Report - Q3 2025", 
    timestamp: "2025-11-10 18:30:45", 
    type: "report",
    status: "success",
    ip: "192.168.2.22",
    severity: "info"
  },
  { 
    id: 6, 
    user: "Dr. Sneha Reddy", 
    role: "Scientist",
    action: "Modified formula", 
    module: "Formula Editor",
    details: "Updated HMPI calculation parameters", 
    timestamp: "2025-11-10 17:15:30", 
    type: "edit",
    status: "success",
    ip: "192.168.0.45",
    severity: "info"
  },
  { 
    id: 7, 
    user: "System", 
    role: "Background Job",
    action: "Database backup", 
    module: "Backup Service",
    details: "Critical database backup failed", 
    timestamp: "2025-11-10 16:00:00", 
    type: "system",
    status: "failed",
    ip: "Internal",
    severity: "critical"
  },
  { 
    id: 8, 
    user: "Priya Sharma", 
    role: "Scientist",
    action: "Exported results", 
    module: "Data Export",
    details: "Sample analysis results - 250MB", 
    timestamp: "2025-11-10 15:42:18", 
    type: "export",
    status: "success",
    ip: "192.168.1.15",
    severity: "info"
  },
];

export const activityData = [
  { time: "00:00", logs: 12 },
  { time: "04:00", logs: 8 },
  { time: "08:00", logs: 45 },
  { time: "12:00", logs: 78 },
  { time: "16:00", logs: 92 },
  { time: "20:00", logs: 65 },
  { time: "24:00", logs: 28 },
];

export const actionTypeData = [
  { name: "Create", value: 35, color: "#10b981" },
  { name: "Update", value: 28, color: "#3b82f6" },
  { name: "Delete", value: 15, color: "#ef4444" },
  { name: "Read", value: 22, color: "#8b5cf6" },
];

export const severityData = [
  { severity: "Info", count: 124, color: "#10b981" },
  { severity: "Warning", count: 23, color: "#f59e0b" },
  { severity: "Error", count: 8, color: "#ef4444" },
  { severity: "Critical", count: 3, color: "#dc2626" },
];
