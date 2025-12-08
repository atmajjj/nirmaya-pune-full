import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { useState } from "react";
import { Users, BarChart3, FileCheck, Database, MessageCircle, Settings } from "lucide-react";

// Import extracted components
import DataLogsHeader from "@/components/admin/DataLogs/DataLogsHeader";
import SummaryCards from "@/components/admin/DataLogs/SummaryCards";
import LogVisualizationCharts from "@/components/admin/DataLogs/LogVisualizationCharts";
import LogFilters from "@/components/admin/DataLogs/LogFilters";
import ActivityLogTable from "@/components/admin/DataLogs/ActivityLogTable";
import SecurityComplianceSection from "@/components/admin/DataLogs/SecurityComplianceSection";
import { logs, activityData, actionTypeData, severityData } from "@/components/admin/DataLogs/logsData";
import { LogEntry } from "@/components/admin/DataLogs/types";

const navItems = [
  { title: "Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const DataLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [viewMode, setViewMode] = useState("table");

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || log.role === filterRole;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;
    
    return matchesSearch && matchesRole && matchesStatus && matchesSeverity;
  });

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        {/* Header Section */}
        <DataLogsHeader />

        {/* Enhanced Summary Cards */}
        <SummaryCards />

        {/* Log Visualization Section */}
        <LogVisualizationCharts
          activityData={activityData}
          actionTypeData={actionTypeData}
          severityData={severityData}
        />

        {/* Filters and Search */}
        <LogFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterRole={filterRole}
          onRoleFilterChange={setFilterRole}
          filterStatus={filterStatus}
          onStatusFilterChange={setFilterStatus}
          filterSeverity={filterSeverity}
          onSeverityFilterChange={setFilterSeverity}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Enhanced Activity Log */}
        <ActivityLogTable
          logs={filteredLogs}
          viewMode={viewMode}
          onLogSelect={setSelectedLog}
        />

        {/* Security & Compliance Section */}
        <SecurityComplianceSection />
      </div>
      
      {/* NIRA AI Assistant Chatbot */}
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default DataLogs;
