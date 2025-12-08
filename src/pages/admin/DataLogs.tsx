import { useState } from "react";

// Import extracted components
import DataLogsHeader from "@/components/admin/DataLogs/DataLogsHeader";
import SummaryCards from "@/components/admin/DataLogs/SummaryCards";
import LogVisualizationCharts from "@/components/admin/DataLogs/LogVisualizationCharts";
import LogFilters from "@/components/admin/DataLogs/LogFilters";
import ActivityLogTable from "@/components/admin/DataLogs/ActivityLogTable";
import SecurityComplianceSection from "@/components/admin/DataLogs/SecurityComplianceSection";
import { logs, activityData, actionTypeData, severityData } from "@/components/admin/DataLogs/logsData";
import { LogEntry } from "@/components/admin/DataLogs/types";

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
  );
};

export default DataLogs;
