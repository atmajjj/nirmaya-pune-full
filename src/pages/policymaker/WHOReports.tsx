import { useState, useEffect } from "react";
import { AlertTriangle, FileText, TrendingUp, MapPin, Settings } from "lucide-react";

// Components
import WHOReportsHeader from "@/components/policymaker/WHOReports/WHOReportsHeader";
import ReportFilters from "@/components/policymaker/WHOReports/ReportFilters";
import RecentReportsList from "@/components/policymaker/WHOReports/RecentReportsList";
import MetalComparisonChart from "@/components/policymaker/WHOReports/MetalComparisonChart";

// Data
import { comparisonData, recentReports } from "@/components/policymaker/WHOReports/whoReportsData";

const WHOReports = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [reportType, setReportType] = useState("annual");
  const [geographicScope, setGeographicScope] = useState("national");
  const [timePeriod, setTimePeriod] = useState("2024-11-10");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Auto-refresh pulse every 10s
  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date()), 10000);
    return () => clearInterval(id);
  }, []);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => setIsGeneratingReport(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="space-y-6 p-6">
          {/* Header */}
          <WHOReportsHeader />
          
          {/* Report Filters */}
          <ReportFilters
            reportType={reportType}
            onReportTypeChange={setReportType}
            geographicScope={geographicScope}
            onGeographicScopeChange={setGeographicScope}
            timePeriod={timePeriod}
            onTimePeriodChange={setTimePeriod}
            isGeneratingReport={isGeneratingReport}
            onGenerateReport={handleGenerateReport}
            lastUpdated={lastUpdated}
          />

          {/* Recent Reports */}
          <RecentReportsList reports={recentReports} />

          {/* WHO Standards Comparison Chart */}
          <MetalComparisonChart data={comparisonData} />
        </div>
      </div>
  );
};

export default WHOReports;
