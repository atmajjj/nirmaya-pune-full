import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Award, FlaskConical, DollarSign, LayoutGrid } from "lucide-react";
import { OverviewHeader } from "@/components/researcher/Overview/OverviewHeader";
import { MetricsCards } from "@/components/researcher/Overview/MetricsCards";
import { CitationsChart } from "@/components/researcher/Overview/CitationsChart";
import { ResearchAreasChart } from "@/components/researcher/Overview/ResearchAreasChart";
import { PublicationsList } from "@/components/researcher/Overview/PublicationsList";
import { ResearchStatusPanel } from "@/components/researcher/Overview/ResearchStatusPanel";
import { monthlyCitationsData, researchAreasData, recentPublications } from "@/components/researcher/Overview/overviewData";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";
import type { MetricCard } from "@/components/researcher/Overview/types";

const metricsData: MetricCard[] = [
  { title: "Publications", value: "156", icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
  { title: "Citations", value: "42", icon: Award, gradient: "from-green-500 to-emerald-500" },
  { title: "Projects", value: "8", icon: FlaskConical, gradient: "from-purple-500 to-pink-500" },
  { title: "Research Grants", value: "8", icon: DollarSign, gradient: "from-orange-500 to-red-500" }
];

const DASHBOARD_ID = 'researcher-overview';

const ResearcherOverview = () => {
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
    // Also reload widget visibility in case it changed
    loadWidgetVisibility();
  }, [loadVisualizations, loadWidgetVisibility]);

  const handleWidgetVisibilityChange = useCallback((widgets: DashboardWidget[]) => {
    setWidgetVisibility(widgets);
  }, []);

  // Helper to check if a widget is visible
  const isWidgetVisible = (widgetId: string): boolean => {
    const widget = widgetVisibility.find(w => w.id === widgetId);
    return widget?.isVisible ?? true;
  };

  const visibleVisualizations = savedVisualizations.filter(v => v.isVisible);

  // Check if all widgets are hidden
  const allWidgetsHidden = widgetVisibility.length > 0 && widgetVisibility.every(w => !w.isVisible);

  return (
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

        {/* Key Research Metrics */}
        {isWidgetVisible('key-research-metrics') && <MetricsCards metrics={metricsData} />}
        
        {/* Saved Visualizations Section - Always show */}
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

        {/* Research Trends */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {isWidgetVisible('research-trend-chart') && <CitationsChart data={monthlyCitationsData} />}
          {isWidgetVisible('top-research-areas') && <ResearchAreasChart data={researchAreasData} />}
        </div>

        {/* Publications and Status */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          {isWidgetVisible('recent-publications') && (
            <div className="xl:col-span-2">
              <PublicationsList publications={recentPublications} />
            </div>
          )}
          {isWidgetVisible('research-status-panel') && (
            <div>
              <ResearchStatusPanel />
            </div>
          )}
        </div>

      <Toaster />
    </div>
  );
};

export default ResearcherOverview;
