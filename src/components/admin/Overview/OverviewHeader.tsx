import { useState, useCallback } from 'react';
import { Monitor, RefreshCw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddVisualizationMenu } from "@/components/scientist/Visualizations";
import { VisualizationType } from "@/components/scientist/Visualizations/types";
import { UniversalOptions, ChartSpecificOptions, SaveAsType } from "@/components/scientist/Visualizations/customizationTypes";
import { showSuccessToast } from '@/lib/toast-utils';
import DashboardSelectorModal from '@/components/scientist/Overview/DashboardSelectorModal';
import SimplifiedCustomizePanel from '@/components/scientist/Overview/SimplifiedCustomizePanel';
import { DashboardWidget } from '@/components/scientist/Overview/widgetVisibility';
import {
  SavedVisualization,
  DashboardPage,
  generateVisualizationId,
  saveVisualizationToDashboard,
  getDashboardVisualizations,
} from '@/components/scientist/Overview/dashboardTypes';

interface OverviewHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
  onAddVisualization?: (vizType: VisualizationType) => void;
  onVisualizationsChange?: () => void;
  onWidgetVisibilityChange?: (widgets: DashboardWidget[]) => void;
  dashboardId?: string;
}

const OverviewHeader = ({ 
  onRefresh, 
  refreshing,
  onAddVisualization, 
  onVisualizationsChange,
  onWidgetVisibilityChange,
  dashboardId = 'admin-overview'
}: OverviewHeaderProps) => {
  const [showDashboardSelector, setShowDashboardSelector] = useState(false);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [pendingVisualization, setPendingVisualization] = useState<{
    vizType: VisualizationType;
    config?: { universal: UniversalOptions; chartSpecific: ChartSpecificOptions; saveAs: SaveAsType };
  } | null>(null);

  const handleSelectVisualization = (
    vizType: VisualizationType, 
    config?: { universal: UniversalOptions; chartSpecific: ChartSpecificOptions; saveAs: SaveAsType }
  ) => {
    setPendingVisualization({ vizType, config });
    setShowDashboardSelector(true);
  };

  const handleDashboardSelect = useCallback((
    dashboard: DashboardPage, 
    position: 'top' | 'middle' | 'bottom' | 'auto'
  ) => {
    if (!pendingVisualization) return;

    const { vizType, config } = pendingVisualization;
    const existingVisualizations = getDashboardVisualizations(dashboard.id);
    let positionNum: number;
    
    if (position === 'auto') {
      positionNum = existingVisualizations.length;
    } else if (position === 'top') {
      positionNum = 0;
    } else if (position === 'bottom') {
      positionNum = existingVisualizations.length;
    } else {
      positionNum = Math.floor(existingVisualizations.length / 2);
    }

    const chartTypeMap: Record<string, string> = {
      'hmpi-trend-line': 'line',
      'contaminant-bar': 'bar',
      'multi-metal-radar': 'radar',
      'spatial-heatmap': 'heatmap',
      'safe-limit-comparison': 'bar',
      'hmpi-histogram': 'histogram',
      'correlation-heatmap': 'heatmap',
      'contaminant-boxplots': 'boxplot',
      'quality-pie': 'pie',
      'time-series-multiline': 'line',
      'depth-scatter': 'scatter',
      'sampling-bubble': 'bubble',
    };

    const savedViz: SavedVisualization = {
      id: generateVisualizationId(),
      visualizationId: vizType.id,
      dashboardId: dashboard.id,
      type: chartTypeMap[vizType.id] || 'bar',
      title: config?.universal?.title || vizType.name,
      subtitle: config?.universal?.subtitle || vizType.description.slice(0, 60),
      config: {
        universal: config?.universal || {},
        chartSpecific: config?.chartSpecific || {},
      },
      position: positionNum,
      isVisible: true,
      ownerRole: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveVisualizationToDashboard(savedViz);
    setShowDashboardSelector(false);
    setPendingVisualization(null);

    if (onVisualizationsChange) {
      onVisualizationsChange();
    }

    if (onAddVisualization) {
      onAddVisualization(vizType);
    }

    showSuccessToast("Visualization Added", `"${savedViz.title}" has been added to ${dashboard.name}`);
  }, [pendingVisualization, onVisualizationsChange, onAddVisualization]);

  const handleVisualizationsChange = useCallback(() => {
    if (onVisualizationsChange) {
      onVisualizationsChange();
    }
  }, [onVisualizationsChange]);
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Admin Dashboard</h1>
              <p className="text-sm text-slate-600">Comprehensive system monitoring and administration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={refreshing}
              className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2"
            >
              <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              Refresh
            </Button>
            
            <AddVisualizationMenu onSelectVisualization={handleSelectVisualization} />
            
            <Button 
              variant="outline" 
              className="gap-2 bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700"
              onClick={() => setShowCustomizePanel(true)}
            >
              <Settings2 className="h-4 w-4" />
              Customize
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Selector Modal */}
      <DashboardSelectorModal
        isOpen={showDashboardSelector}
        onClose={() => {
          setShowDashboardSelector(false);
          setPendingVisualization(null);
        }}
        onSelect={handleDashboardSelect}
        visualizationName={pendingVisualization?.vizType?.name || ''}
      />

      {/* Simplified Customize Panel */}
      <SimplifiedCustomizePanel
        isOpen={showCustomizePanel}
        onClose={() => setShowCustomizePanel(false)}
        dashboardId={dashboardId}
        onVisibilityChange={(widgets) => {
          if (onWidgetVisibilityChange) {
            onWidgetVisibilityChange(widgets);
          }
        }}
        onVisualizationsChange={handleVisualizationsChange}
      />
    </>
  );
};

export default OverviewHeader;
