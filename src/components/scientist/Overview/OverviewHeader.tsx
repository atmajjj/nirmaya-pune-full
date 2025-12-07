import { useState, useCallback } from 'react';
import { BarChart3, Settings2, CheckCircle2 } from "lucide-react";
import { AddVisualizationMenu } from "@/components/scientist/Visualizations";
import { VisualizationType } from "@/components/scientist/Visualizations/types";
import { UniversalOptions, ChartSpecificOptions, SaveAsType } from "@/components/scientist/Visualizations/customizationTypes";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardSelectorModal from './DashboardSelectorModal';
import SimplifiedCustomizePanel from './SimplifiedCustomizePanel';
import { DashboardWidget } from './widgetVisibility';
import {
  SavedVisualization,
  DashboardPage,
  generateVisualizationId,
  saveVisualizationToDashboard,
  getDashboardVisualizations,
} from './dashboardTypes';

interface OverviewHeaderProps {
  onAddVisualization?: (vizType: VisualizationType) => void;
  onVisualizationsChange?: () => void;
  onWidgetVisibilityChange?: (widgets: DashboardWidget[]) => void;
  dashboardId?: string;
}

export const OverviewHeader = ({ 
  onAddVisualization, 
  onVisualizationsChange,
  onWidgetVisibilityChange,
  dashboardId = 'scientist-overview'
}: OverviewHeaderProps) => {
const { toast } = useToast();
  
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
    // Store the pending visualization and show dashboard selector
    setPendingVisualization({ vizType, config });
    setShowDashboardSelector(true);
  };

  const handleDashboardSelect = useCallback((
    dashboard: DashboardPage, 
    position: 'top' | 'middle' | 'bottom' | 'auto'
  ) => {
    if (!pendingVisualization) return;

    const { vizType, config } = pendingVisualization;
    
    // Calculate position number
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

    // Determine chart type from visualization ID
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

    // Create the saved visualization
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
      ownerRole: 'scientist',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to storage
    saveVisualizationToDashboard(savedViz);

    // Close modal and reset state
    setShowDashboardSelector(false);
    setPendingVisualization(null);

    // Notify parent
    if (onVisualizationsChange) {
      onVisualizationsChange();
    }

    if (onAddVisualization) {
      onAddVisualization(vizType);
    }

    // Show success toast
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Visualization Added</span>
        </div>
      ),
      description: `"${savedViz.title}" has been added to ${dashboard.name}`,
      duration: 4000,
    });
  }, [pendingVisualization, onVisualizationsChange, onAddVisualization, toast]);

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
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Scientist Dashboard</h1>
              <p className="text-sm text-slate-600">Real-time groundwater monitoring and analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AddVisualizationMenu onSelectVisualization={handleSelectVisualization} />
            <Button 
              variant="outline" 
              className="gap-2 bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700"
              onClick={() => setShowCustomizePanel(true)}
            >
              <Settings2 className="h-4 w-4" />
              "Customize"
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

