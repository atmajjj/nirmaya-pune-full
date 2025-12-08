import { useState, useEffect, useCallback } from 'react';
import { LayoutGrid } from "lucide-react";

// Import Overview components
import OverviewHeader from "@/components/admin/Overview/OverviewHeader";
import TopSummaryCards from "@/components/admin/Overview/TopSummaryCards";
import SystemPerformanceChart from "@/components/admin/Overview/SystemPerformanceChart";
import UserActivityChart from "@/components/admin/Overview/UserActivityChart";
import UserDistributionChart from "@/components/admin/Overview/UserDistributionChart";
import APIEndpoints from "@/components/admin/Overview/APIEndpoints";
import SystemServices from "@/components/admin/Overview/SystemServices";
import SystemAlerts from "@/components/admin/Overview/SystemAlerts";
import RecentLoginActivity from "@/components/admin/Overview/RecentLoginActivity";
import AdminActions from "@/components/admin/Overview/AdminActions";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";

// Import data
import {
  systemPerformanceData,
  networkData,
  userActivityData,
  apiEndpoints,
  systemServices,
  systemAlerts,
  recentLogins
} from "@/components/admin/Overview/systemData";

const DASHBOARD_ID = 'admin-overview';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [refreshing, setRefreshing] = useState(false);
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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

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
          refreshing={refreshing} 
          onRefresh={handleRefresh}
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

        {/* Summary Cards */}
        {isWidgetVisible('summary-cards') && <TopSummaryCards />}

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

        {/* Performance Charts */}
        {(isWidgetVisible('system-performance') || isWidgetVisible('user-activity')) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isWidgetVisible('system-performance') && (
              <SystemPerformanceChart 
                data={systemPerformanceData} 
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            )}
            {isWidgetVisible('user-activity') && <UserActivityChart data={networkData} />}
          </div>
        )}

        {/* User Distribution & API Performance */}
        {(isWidgetVisible('user-distribution') || isWidgetVisible('api-endpoints')) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {isWidgetVisible('user-distribution') && <UserDistributionChart data={userActivityData} />}
            {isWidgetVisible('api-endpoints') && <APIEndpoints endpoints={apiEndpoints} />}
          </div>
        )}

        {/* System Services & Alerts */}
        {(isWidgetVisible('system-services') || isWidgetVisible('system-alerts')) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isWidgetVisible('system-services') && <SystemServices services={systemServices} />}
            {isWidgetVisible('system-alerts') && <SystemAlerts alerts={systemAlerts} />}
          </div>
        )}

        {/* Recent Activity & Admin Actions */}
        {(isWidgetVisible('recent-logins') || isWidgetVisible('admin-actions')) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {isWidgetVisible('recent-logins') && <RecentLoginActivity recentLogins={recentLogins} />}
            {isWidgetVisible('admin-actions') && <AdminActions />}
          </div>
        )}

      <Toaster />
    </div>
  );
};

export default AdminOverview;
