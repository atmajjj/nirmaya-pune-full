import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, FileText, TrendingUp, Users, Shield, BarChart3 } from "lucide-react";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    },
    {
      title: "Population Protected",
      value: "54.2M",
      icon: Users,
      gradient: "from-green-500 to-emerald-500",
      description: "People covered by current policy measures"
    },
    {
      title: "Compliance Rate",
      value: "87%",
      icon: Shield,
      gradient: "from-purple-500 to-pink-500",
      description: "Industry compliance with water quality standards"
    }
  ];

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <Toaster />

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        <div className="relative flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Policy Overview</h1>
              <p className="text-sm text-slate-600">Comprehensive dashboard for groundwater policy management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {policyMetrics.map((metric, index) => (
          <Card key={index} className="bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.description}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white border border-slate-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">High-risk zones</span>
                <Badge variant="destructive">28 active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Response time</span>
                <span className="text-sm font-semibold text-green-600">3.8 hours avg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">This month</span>
                <span className="text-sm font-semibold">23 reports</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Pending review</span>
                <Badge variant="secondary">5 pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Policy Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Compliance rate</span>
                <span className="text-sm font-semibold text-green-600">↑ 12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Risk reduction</span>
                <span className="text-sm font-semibold text-green-600">↑ 8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Visualizations */}
      <SavedVisualizationsGrid
        visualizations={savedVisualizations}
        onUpdate={handleVisualizationsChange}
      />
    </div>
  );
};

export default PolicymakerOverview;