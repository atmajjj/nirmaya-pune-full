import { useState, useEffect, useCallback } from 'react';
import { LayoutGrid, AlertCircle } from "lucide-react";

// Import Overview components
import OverviewHeader from "@/components/admin/Overview/OverviewHeader";
import TopSummaryCards from "@/components/admin/Overview/TopSummaryCards";
import UsersByRoleChart from "@/components/admin/Overview/UsersByRoleChart";
import CalculationsByIndexChart from "@/components/admin/Overview/CalculationsByIndexChart";
import UploadStatusChart from "@/components/admin/Overview/UploadStatusChart";
import DataSourcesChart from "@/components/admin/Overview/DataSourcesChart";
import SystemHealthPanel from "@/components/admin/Overview/SystemHealthPanel";
import SavedVisualizationsGrid from "@/components/scientist/Overview/SavedVisualizationsGrid";
import { SavedVisualization, getDashboardVisualizations } from "@/components/scientist/Overview/dashboardTypes";
import { DashboardWidget, getWidgetVisibility } from "@/components/scientist/Overview/widgetVisibility";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import API services
import { adminService } from "@/services/api/adminService";
import type { SystemStats } from '@/types/admin.types';

const DASHBOARD_ID = 'admin-overview';

const AdminOverview = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [savedVisualizations, setSavedVisualizations] = useState<SavedVisualization[]>([]);
  const [widgetVisibility, setWidgetVisibility] = useState<DashboardWidget[]>([]);
  
  // Dynamic data states
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVisualizations = useCallback(() => {
    const vizs = getDashboardVisualizations(DASHBOARD_ID);
    setSavedVisualizations(vizs);
  }, []);

  const loadWidgetVisibility = useCallback(() => {
    const widgets = getWidgetVisibility(DASHBOARD_ID);
    setWidgetVisibility(widgets);
  }, []);

  // Fetch dynamic data from APIs
  const fetchDynamicData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch comprehensive system stats
      const stats = await adminService.getStats();
      setSystemStats(stats);

      // Note: Recent users list removed - endpoint not available
      // Dashboard will show stats-based data only

    } catch (err) {
      console.error('Failed to fetch admin overview data:', err);
      setError('Failed to load dashboard data. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisualizations();
    loadWidgetVisibility();
    fetchDynamicData();
  }, [loadVisualizations, loadWidgetVisibility, fetchDynamicData]);

  const handleVisualizationsChange = useCallback(() => {
    loadVisualizations();
  }, [loadVisualizations]);

  const handleWidgetVisibilityChange = useCallback((widgets: DashboardWidget[]) => {
    setWidgetVisibility(widgets);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDynamicData();
    setTimeout(() => setRefreshing(false), 500);
  }, [fetchDynamicData]);

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

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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

        {/* Summary Cards - Comprehensive Metrics */}
        {isWidgetVisible('summary-cards') && (
          <TopSummaryCards stats={systemStats} loading={loading} />
        )}

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

        {/* Users and Calculations Charts */}
        {(isWidgetVisible('users-by-role') || isWidgetVisible('calculations-by-index')) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isWidgetVisible('users-by-role') && (
              <UsersByRoleChart stats={systemStats} loading={loading} />
            )}
            {isWidgetVisible('calculations-by-index') && (
              <CalculationsByIndexChart stats={systemStats} loading={loading} />
            )}
          </div>
        )}

        {/* Upload Status and Data Sources */}
        {(isWidgetVisible('upload-status') || isWidgetVisible('data-sources')) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isWidgetVisible('upload-status') && (
              <UploadStatusChart stats={systemStats} loading={loading} />
            )}
            {isWidgetVisible('data-sources') && (
              <DataSourcesChart stats={systemStats} loading={loading} />
            )}
          </div>
        )}

        {/* System Health */}
        {isWidgetVisible('system-health') && (
          <SystemHealthPanel stats={systemStats} loading={loading} />
        )}

      <Toaster />
    </div>
  );
};

export default AdminOverview;
