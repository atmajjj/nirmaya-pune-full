import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { AlertTriangle, FileText, TrendingUp, MapPin, Target, Bell, Shield, Clock, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Components
import RiskAlertsHeader from "@/components/policymaker/RiskAlerts/RiskAlertsHeader";
import SummaryMetrics from "@/components/policymaker/RiskAlerts/SummaryMetrics";
import AlertFilters from "@/components/policymaker/RiskAlerts/AlertFilters";
import RiskAlertsList from "@/components/policymaker/RiskAlerts/RiskAlertsList";
import RiskInsightsPanel from "@/components/policymaker/RiskAlerts/RiskInsightsPanel";
import ActionLogsPanel from "@/components/policymaker/RiskAlerts/ActionLogsPanel";
import { PopulationRiskCharts } from "@/components/policymaker/RiskAlerts/PopulationRiskCharts";
import { EconomicLossCharts } from "@/components/policymaker/RiskAlerts/EconomicLossCharts";
import { ContaminationFlowInsights } from "@/components/policymaker/RiskAlerts/ContaminationFlowCharts";
import { PolicyImpactSimulator } from "@/components/policymaker/RiskAlerts/PolicyImpactSimulator";

// Data
import { summaryMetricsData, alertsData, riskInsightsData, actionLogsData } from "@/components/policymaker/RiskAlerts/riskAlertsData";
import { SummaryMetric, RiskInsight } from "@/components/policymaker/RiskAlerts/types";

// Add icons to summary metrics
const summaryMetrics: SummaryMetric[] = summaryMetricsData.map((metric, index) => ({
  ...metric,
  icon: [
    <Target className="w-5 h-5" />,
    <Bell className="w-5 h-5" />,
    <AlertTriangle className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Clock className="w-5 h-5" />
  ][index]
}));

// Add icons to risk insights
const riskInsights: RiskInsight[] = riskInsightsData.map((insight, index) => ({
  ...insight,
  icon: [
    <AlertTriangle className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
    <AlertTriangle className="w-4 h-4" />,
    <Target className="w-4 h-4" />,
    <Shield className="w-4 h-4" />
  ][index]
}));

const RiskAlerts = () => {
const navItems = [
    { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "Who Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
    { title: "Trend Analysis", path: "/policymaker/trend-analysis", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Early Warning", path: "/policymaker/early-warning", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "Geo Map", path: "/policymaker/geo-map", icon: <MapPin className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ];

  const [dateRange, setDateRange] = useState("7days");
  const [regionFilter, setRegionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

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
    <DashboardLayout navItems={navItems} userRole="policymaker">
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

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <TabsTrigger value="overview">"Overview"</TabsTrigger>
              <TabsTrigger value="alerts">"All Alerts" ({filteredAlerts.length})</TabsTrigger>
              <TabsTrigger value="insights">"Risk Insights"</TabsTrigger>
              <TabsTrigger value="actions">"Actions"</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Economic Loss Visualizations */}
              <EconomicLossCharts />
              
              {/* Population Risk Visualizations */}
              <PopulationRiskCharts />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <RiskAlertsList 
                alerts={filteredAlerts} 
                onAlertClick={setSelectedAlert}
              />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <ContaminationFlowInsights />
              <PolicyImpactSimulator />
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <ActionLogsPanel logs={actionLogsData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default RiskAlerts;
