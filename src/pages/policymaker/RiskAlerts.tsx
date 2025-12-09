import { useState } from "react";
import { AlertTriangle, Target, Bell, MapPin } from "lucide-react";

// Components
import RiskAlertsHeader from "@/components/policymaker/RiskAlerts/RiskAlertsHeader";
import SummaryMetrics from "@/components/policymaker/RiskAlerts/SummaryMetrics";
import AlertFilters from "@/components/policymaker/RiskAlerts/AlertFilters";
import RiskAlertsList from "@/components/policymaker/RiskAlerts/RiskAlertsList";

// Data
import { summaryMetricsData, alertsData } from "@/components/policymaker/RiskAlerts/riskAlertsData";
import { SummaryMetric } from "@/components/policymaker/RiskAlerts/types";

// Add icons to summary metrics (first 3 + new location metric)
const summaryMetrics: SummaryMetric[] = [
  ...summaryMetricsData.slice(0, 3).map((metric, index) => ({
    ...metric,
    icon: [
      <Target className="w-5 h-5" />,
      <Bell className="w-5 h-5" />,
      <AlertTriangle className="w-5 h-5" />
    ][index]
  })),
  {
    title: "Locations Covered",
    value: 34,
    trend: "+5",
    trendDirection: "up" as const,
    description: "Districts under monitoring",
    icon: <MapPin className="w-5 h-5" />,
    color: "purple"
  }
];

const RiskAlerts = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [regionFilter, setRegionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "all" || 
                         alert.district === regionFilter || 
                         alert.region === regionFilter;
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    
    return matchesSearch && matchesRegion && matchesSeverity;
  }).sort((a, b) => {
    if (a.priority !== b.priority) {
      return (a.priority || 999) - (b.priority || 999);
    }
    return b.hmpi - a.hmpi;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="space-y-6 p-6">
          {/* Header */}
          <RiskAlertsHeader />

          {/* Filters */}
          <AlertFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            regionFilter={regionFilter}
            onRegionFilterChange={setRegionFilter}
            severityFilter={severityFilter}
            onSeverityFilterChange={setSeverityFilter}
          />
          
          {/* Summary Metrics */}
          <SummaryMetrics metrics={summaryMetrics} />

          {/* Active Alerts List */}
          <RiskAlertsList 
            alerts={filteredAlerts} 
            onAlertClick={setSelectedAlert}
          />
        </div>
      </div>
  );
};

export default RiskAlerts;
