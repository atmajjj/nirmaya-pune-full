import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, FileText } from "lucide-react";
import { OverviewHeader } from "@/components/policymaker/Overview/OverviewHeader";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskTrendChart } from "@/components/policymaker/Overview/RiskTrendChart";
import { DistrictAlertChart } from "@/components/policymaker/Overview/DistrictAlertChart";
import { AlertCategoryChart } from "@/components/policymaker/Overview/AlertCategoryChart";

const DASHBOARD_ID = 'policymaker-overview';

const PolicymakerOverview = () => {
  const [savedVisualizations, setSavedVisualizations] = useState<SavedVisualization[]>([]);
  const [widgetVisibility, setWidgetVisibility] = useState<DashboardWidget[]>([]);

  const loadVisualizations = useCallback(() => {
    const vizs = getDashboardVisualizations(DASHBOARD_ID);
    setSavedVisualizations(vizs);
  }, []);

  const loadWidgetVisibility = useCallback(() => {
    const widgets = getWidgetVisibility(DASHBOARD_ID);
    setWidgetVisibility(widgets);
  }, []);

  useEffect(() => {
    loadVisualizations();
    loadWidgetVisibility();
  }, [loadVisualizations, loadWidgetVisibility]);

  const handleVisualizationsChange = useCallback(() => {
    loadVisualizations();
  }, [loadVisualizations]);

  const handleWidgetVisibilityChange = useCallback((widgets: DashboardWidget[]) => {
    setWidgetVisibility(widgets);
  }, []);

  const policyMetrics = [
    {
      title: "Active Risk Zones",
      value: "28",
      icon: AlertTriangle,
      gradient: "from-red-500 to-orange-500",
      description: "High-priority areas requiring immediate attention"
    },
    {
      title: "Policy Reports",
      value: "156",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      description: "BIS and WHO compliance reports generated"
    }
  ];

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <Toaster />

      {/* Header with Add Visualization and Customize buttons */}
      <OverviewHeader 
        onVisualizationsChange={handleVisualizationsChange}
        onWidgetVisibilityChange={handleWidgetVisibilityChange}
        dashboardId={DASHBOARD_ID}
      />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policyMetrics.map((metric, index) => (
          <Card key={index} className={`border-2 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer rounded-xl ${
            index === 0 ? 'border-red-300 bg-red-50 hover:bg-red-100' :
            'border-blue-300 bg-blue-50 hover:bg-blue-100'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium mb-2 ${
                    index === 0 ? 'text-red-600' : 'text-blue-600'
                  }`}>{metric.title}</p>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${
                    index === 0 ? 'text-red-800' : 'text-blue-800'
                  }`}>{metric.value}</h3>
                  <p className={`text-xs ${
                    index === 0 ? 'text-red-600' : 'text-blue-600'
                  }`}>{metric.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-red-100 border border-red-300' : 'bg-blue-100 border border-blue-300'
                }`}>
                  <metric.icon className={`w-6 h-6 ${
                    index === 0 ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-amber-300 bg-amber-50 hover:shadow-xl transition-all duration-200 cursor-pointer rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-amber-800">Critical Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700">High-risk zones</span>
                <Badge className="bg-red-100 text-red-700 border border-red-300">28 active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700">Response time</span>
                <span className="text-sm font-semibold text-emerald-700">3.8 hours avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-300 bg-emerald-50 hover:shadow-xl transition-all duration-200 cursor-pointer rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-emerald-800">Recent Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-700">This month</span>
                <span className="text-sm font-semibold text-emerald-800">23 reports</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-700">Pending review</span>
                <Badge className="bg-amber-100 text-amber-700 border border-amber-300">5 pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskTrendChart />
        <AlertCategoryChart />
      </div>

      <DistrictAlertChart />

      {/* Saved Visualizations */}
      <SavedVisualizationsGrid
        visualizations={savedVisualizations}
        onUpdate={handleVisualizationsChange}
      />
    </div>
  );
};

export default PolicymakerOverview;