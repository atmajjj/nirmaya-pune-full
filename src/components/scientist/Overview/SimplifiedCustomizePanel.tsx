import React, { useState, useEffect, useCallback } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings2,
  BarChart3,
  PieChart,
  AlertTriangle,
  Shield,
  LayoutGrid,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
  TrendingUp,
  Radar,
  LineChart,
  Grid3X3,
  Circle,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import {
  DashboardWidget,
  getWidgetVisibility,
  saveWidgetVisibility,
  resetWidgetVisibility,
} from './widgetVisibility';
import {
  SavedVisualization,
  getDashboardVisualizations,
  updateVisualizationVisibility,
  deleteVisualizationFromDashboard,
} from './dashboardTypes';

interface SimplifiedCustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  onVisibilityChange: (widgets: DashboardWidget[]) => void;
  onVisualizationsChange?: () => void;
}

const chartIconMap: Record<string, React.ReactNode> = {
  'line': <TrendingUp className="h-4 w-4" />,
  'bar': <BarChart3 className="h-4 w-4" />,
  'pie': <PieChart className="h-4 w-4" />,
  'radar': <Radar className="h-4 w-4" />,
  'heatmap': <Grid3X3 className="h-4 w-4" />,
  'scatter': <Circle className="h-4 w-4" />,
  'bubble': <Circle className="h-4 w-4" />,
  'histogram': <BarChart3 className="h-4 w-4" />,
  'boxplot': <BarChart3 className="h-4 w-4" />,
};

const widgetIconMap: Record<string, React.ReactNode> = {
  'BarChart3': <BarChart3 className="h-4 w-4" />,
  'BarChart': <BarChart3 className="h-4 w-4" />,
  'PieChart': <PieChart className="h-4 w-4" />,
  'AlertTriangle': <AlertTriangle className="h-4 w-4" />,
  'Shield': <Shield className="h-4 w-4" />,
  'LayoutGrid': <LayoutGrid className="h-4 w-4" />,
  'LineChart': <LineChart className="h-4 w-4" />,
};

const SimplifiedCustomizePanel: React.FC<SimplifiedCustomizePanelProps> = ({
  isOpen,
  onClose,
  dashboardId,
  onVisibilityChange,
  onVisualizationsChange,
}) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [savedVisualizations, setSavedVisualizations] = useState<SavedVisualization[]>([]);

  // Load data when panel opens
  const loadData = useCallback(() => {
    const loadedWidgets = getWidgetVisibility(dashboardId);
    setWidgets(loadedWidgets);
    
    const loadedViz = getDashboardVisualizations(dashboardId);
    setSavedVisualizations(loadedViz);
  }, [dashboardId]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, loadData]);

  // Toggle default widget visibility
  const handleWidgetToggle = (widgetId: string) => {
    const updated = widgets.map(w =>
      w.id === widgetId ? { ...w, isVisible: !w.isVisible } : w
    );
    setWidgets(updated);
    saveWidgetVisibility(dashboardId, updated);
    onVisibilityChange(updated);
  };

  // Toggle saved visualization visibility
  const handleVisualizationToggle = (vizId: string, currentVisible: boolean) => {
    updateVisualizationVisibility(vizId, !currentVisible);
    setSavedVisualizations(prev => 
      prev.map(v => v.id === vizId ? { ...v, isVisible: !currentVisible } : v)
    );
    if (onVisualizationsChange) {
      onVisualizationsChange();
    }
  };

  // Delete saved visualization
  const handleDeleteVisualization = (vizId: string) => {
    if (confirm('Are you sure you want to delete this visualization?')) {
      deleteVisualizationFromDashboard(vizId);
      setSavedVisualizations(prev => prev.filter(v => v.id !== vizId));
      if (onVisualizationsChange) {
        onVisualizationsChange();
      }
    }
  };

  // Reset all widgets to default
  const handleResetAll = () => {
    const defaults = resetWidgetVisibility(dashboardId);
    setWidgets(defaults);
    onVisibilityChange(defaults);
  };

  const visibleWidgetCount = widgets.filter(w => w.isVisible).length;
  const visibleVizCount = savedVisualizations.filter(v => v.isVisible).length;
  const totalVisible = visibleWidgetCount + visibleVizCount;
  const totalItems = widgets.length + savedVisualizations.length;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[380px] sm:w-[420px] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b bg-slate-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 rounded-lg">
                <Settings2 className="h-5 w-5 text-brand" />
              </div>
              <div>
                <SheetTitle className="text-lg">Customize Dashboard</SheetTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  {totalVisible} of {totalItems} items visible
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetAll}
              className="text-slate-500 hover:text-slate-700 text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            
            {/* Default Widgets Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <LayoutGrid className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Default Widgets</span>
                <span className="text-xs text-slate-400">({visibleWidgetCount}/{widgets.length})</span>
              </div>
              
              <div className="space-y-2">
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      widget.isVisible
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50 border-slate-100 opacity-60'
                    }`}
                  >
                    <div className={`p-1.5 rounded ${
                      widget.isVisible ? 'bg-brand/10 text-brand' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {widgetIconMap[widget.icon] || <LayoutGrid className="h-4 w-4" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        widget.isVisible ? 'text-slate-800' : 'text-slate-500'
                      }`}>
                        {widget.name}
                      </p>
                    </div>
                    
                    <Switch
                      checked={widget.isVisible}
                      onCheckedChange={() => handleWidgetToggle(widget.id)}
                      className="data-[state=checked]:bg-brand"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Visualizations Section */}
            {savedVisualizations.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Custom Visualizations</span>
                  <span className="text-xs text-slate-400">({visibleVizCount}/{savedVisualizations.length})</span>
                </div>
                
                <div className="space-y-2">
                  {savedVisualizations.map((viz) => (
                    <div
                      key={viz.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        viz.isVisible
                          ? 'bg-white border-slate-200'
                          : 'bg-slate-50 border-slate-100 opacity-60'
                      }`}
                    >
                      <div className={`p-1.5 rounded ${
                        viz.isVisible ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {chartIconMap[viz.type] || <BarChart3 className="h-4 w-4" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          viz.isVisible ? 'text-slate-800' : 'text-slate-500'
                        }`}>
                          {viz.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {viz.type} chart
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteVisualization(viz.id)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete visualization"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        
                        <Switch
                          checked={viz.isVisible}
                          onCheckedChange={() => handleVisualizationToggle(viz.id, viz.isVisible)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state for saved visualizations */}
            {savedVisualizations.length === 0 && (
              <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <TrendingUp className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No custom visualizations yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Click "Add Visualization" to create charts
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-slate-50 flex-shrink-0">
          <Button
            onClick={onClose}
            className="w-full bg-brand hover:bg-brand-light text-white"
          >
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SimplifiedCustomizePanel;
