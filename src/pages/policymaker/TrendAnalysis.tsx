import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { AlertTriangle, FileText, TrendingUp, MapPin, Droplets, Target, Database, Factory, Activity, AlertTriangle as AlertTriangleIcon, Zap, Brain, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Components
import TrendAnalysisHeader from "@/components/policymaker/TrendAnalysis/TrendAnalysisHeader";
import SummaryStatsCards from "@/components/policymaker/TrendAnalysis/SummaryStatsCards";
import ContaminationTrendCards from "@/components/policymaker/TrendAnalysis/ContaminationTrendCards";
import HistoricalTrendsChart from "@/components/policymaker/TrendAnalysis/HistoricalTrendsChart";
import RegionalAnalysisCard from "@/components/policymaker/TrendAnalysis/RegionalAnalysisCard";
import PredictiveModelChart from "@/components/policymaker/TrendAnalysis/PredictiveModelChart";

// Data and hooks
import { historicalData, predictiveData, regionalRisks } from "@/components/policymaker/TrendAnalysis/trendAnalysisData";
import { useAnimatedCounter } from "@/components/policymaker/TrendAnalysis/useAnimatedCounter";
import { SummaryStat, ContaminationTrend } from "@/components/policymaker/TrendAnalysis/types";

const TrendAnalysis = () => {
const navItems = [
    { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "Who Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
    { title: "Trend Analysis", path: "/policymaker/trend-analysis", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Early Warning", path: "/policymaker/early-warning", icon: <Brain className="w-5 h-5" /> },
    { title: "Geo Map", path: "/policymaker/geo-map", icon: <MapPin className="w-5 h-5" /> },
    { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Animated counters for summary stats
  const districtsCount = useAnimatedCounter(276);
  const stationsCount = useAnimatedCounter(520);
  const dataPointsCount = useAnimatedCounter(35, 2000);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => setIsGeneratingReport(false), 2000);
  };

  // Summary statistics data
  const summaryStats: SummaryStat[] = [
    {
      title: "Districts with Contaminated Groundwater",
      value: districtsCount,
      change: "+5",
      changeType: "negative",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-red-500 to-orange-600",
      bgColor: "from-red-50 to-orange-50"
    },
    {
      title: "Monitoring Stations",
      value: stationsCount,
      change: "+30", 
      changeType: "positive",
      icon: <Target className="w-8 h-8" />,
      color: "from-teal-500 to-blue-600",
      bgColor: "from-teal-50 to-blue-50"
    },
    {
      title: "Data Points Collected (Mn)",
      value: dataPointsCount / 10,
      change: "+0.5",
      changeType: "positive",
      icon: <Database className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      decimal: true
    }
  ];

  // Contamination trend data
  const contaminationTrends: ContaminationTrend[] = [
    {
      title: "Groundwater Contamination",
      value: 20,
      change: "+11.1%",
      progress: 67,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <Droplets className="w-6 h-6 text-red-600" />,
      trend: "up"
    },
    {
      title: "Districts with Nitrate Contamination", 
      value: 56,
      change: "+3.7%",
      progress: 45,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: <Factory className="w-6 h-6 text-orange-600" />,
      trend: "up"
    },
    {
      title: "Wastewater Treatment Capacity",
      value: 30,
      change: "+7.1%",
      progress: 30,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50", 
      borderColor: "border-yellow-200",
      icon: <Activity className="w-6 h-6 text-yellow-600" />,
      trend: "up"
    }
  ];

  return (
    <DashboardLayout navItems={navItems} userRole="policymaker">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="space-y-6 p-6">
          {/* Header */}
          <TrendAnalysisHeader 
            isGeneratingReport={isGeneratingReport}
            onGenerateReport={handleGenerateReport}
          />

          {/* Summary Statistics Cards */}
          <SummaryStatsCards stats={summaryStats} />

          {/* Contamination Trend Cards */}
          <ContaminationTrendCards trends={contaminationTrends} />

          {/* Alert Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-2 border-red-200 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 animate-pulse"></div>
            <div className="relative p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-red-100 rounded-2xl shadow-md">
                  <AlertTriangleIcon className="w-8 h-8 text-red-600 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-red-800 mb-3">Critical Alert</h3>
                  <p className="text-lg text-red-700 leading-relaxed">
                    ⚠️ Significant groundwater contamination and nitrate levels detected in multiple districts across India. 
                    Immediate intervention and enhanced monitoring required to prevent further environmental degradation.
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2">
                      <Zap className="w-4 h-4 mr-2" />
                      High Priority
                    </Badge>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></div>
          </div>

          {/* Historical Trends Chart */}
          <HistoricalTrendsChart data={historicalData} />

          {/* Regional Analysis and Predictions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RegionalAnalysisCard regions={regionalRisks} />
            <PredictiveModelChart data={predictiveData} />
          </div>
        </div>
      </div>
      
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default TrendAnalysis;
