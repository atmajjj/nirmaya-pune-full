import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BarChart3, Beaker, MapPin, LayoutGrid, Grid3X3 } from "lucide-react";
import { OverviewHeader } from "@/components/scientist/Overview/OverviewHeader";
import { StatsCards } from "@/components/scientist/Overview/StatsCards";
import { HMPIBarChart } from "@/components/scientist/Overview/HMPIBarChart";
import { HMPITrendLineChart } from "@/components/scientist/Overview/HMPITrendLineChart";
import { WHOLimitComparisonChart } from "@/components/scientist/Overview/WHOLimitComparisonChart";
import { ContaminantRadarChart } from "@/components/scientist/Overview/ContaminantRadarChart";
import { WaterQualityPieChart } from "@/components/scientist/Overview/WaterQualityPieChart";
import { SeasonalComparisonChart } from "@/components/scientist/Overview/SeasonalComparisonChart";
import { CorrelationHeatmap } from "@/components/scientist/Overview/CorrelationHeatmap";
import { cityHMPI, contaminants, recentAlerts, riskDistributionData } from "@/components/scientist/Overview/overviewData";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";

const DASHBOARD_ID = 'scientist-overview';

const ScientistOverview = () => {
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

  // Helper to check if a widget is visible
  const isWidgetVisible = (widgetId: string): boolean => {
    const widget = widgetVisibility.find(w => w.id === widgetId);
    return widget?.isVisible ?? true;
  };

  const navItems = [
    { title: "Overview", path: "/scientist/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Beaker className="w-5 h-5" /> },
    { title: "Formula Editor", path: "/scientist/formula-editor", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Geo-Map", path: "/scientist/geo-map", icon: <MapPin className="w-5 h-5" /> },
  ];

  const visibleVisualizations = savedVisualizations.filter(v => v.isVisible);

  // Check if all widgets are hidden
  const allWidgetsHidden = widgetVisibility.length > 0 && widgetVisibility.every(w => !w.isVisible);

  return (
    <DashboardLayout navItems={navItems} userRole="scientist">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <OverviewHeader 
          onVisualizationsChange={handleVisualizationsChange}
          onWidgetVisibilityChange={handleWidgetVisibilityChange}
          dashboardId={DASHBOARD_ID}
        />

        {/* Show message if all widgets are hidden */}
        {allWidgetsHidden && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <LayoutGrid className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No Widgets Visible
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              All dashboard widgets are hidden. Click "Customize" to enable widgets you want to see.
            </p>
          </div>
        )}

        {/* Stats Cards - Key Metrics */}
        {isWidgetVisible('stats-cards') && <StatsCards />}
        
        {/* Saved Visualizations Section */}
        {savedVisualizations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Custom Visualizations
                {visibleVisualizations.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({visibleVisualizations.length} visible)
                  </span>
                )}
              </h2>
            </div>
            <SavedVisualizationsGrid 
              visualizations={savedVisualizations} 
              onUpdate={handleVisualizationsChange}
            />
          </div>
        )}

        {/* Section: HMPI Analysis - Full Width Trend Chart */}
        {isWidgetVisible('hmpi-bar-chart') && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand" />
              HMPI Analysis
            </h2>
            <HMPITrendLineChart />
          </section>
        )}

        {/* Section: City-wise & Standards Comparison - 2 Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HMPI Horizontal Bar Chart - Cities */}
          {isWidgetVisible('hmpi-bar-chart') && (
            <HMPIBarChart data={cityHMPI} />
          )}
          
          {/* WHO Safe Limits Comparison */}
          {isWidgetVisible('contaminant-pie-chart') && (
            <WHOLimitComparisonChart />
          )}
        </section>

        {/* Section: Contamination Profile & Quality Distribution - 2 Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Multi-Metal Radar Chart */}
          {isWidgetVisible('recent-alerts') && (
            <ContaminantRadarChart />
          )}
          
          {/* Water Quality Pie Chart */}
          {isWidgetVisible('risk-distribution') && (
            <WaterQualityPieChart />
          )}
        </section>

        {/* Section: Seasonal Comparison - Full Width */}
        {(isWidgetVisible('recent-alerts') || isWidgetVisible('risk-distribution')) && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <Beaker className="h-5 w-5 text-brand" />
              Seasonal Analysis
            </h2>
            <SeasonalComparisonChart />
          </section>
        )}

        {/* Section: Correlation Analysis - Full Width Heatmap */}
        {isWidgetVisible('contaminant-pie-chart') && (
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <Grid3X3 className="h-5 w-5 text-brand" />
              Correlation Analysis
            </h2>
            <CorrelationHeatmap />
          </section>
        )}
      </div>
      <NIRAChatbot />
      <Toaster />
    </DashboardLayout>
  );
};

export default ScientistOverview;
