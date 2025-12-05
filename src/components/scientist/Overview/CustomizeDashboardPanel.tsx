import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Settings2,
  TrendingUp,
  BarChart3,
  PieChart,
  Map as MapIcon,
  Grid3x3,
  LineChart,
  BoxSelect,
  Circle,
  Radar,
  Eye,
  EyeOff,
  Trash2,
  Save,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  SavedVisualization,
  getDashboardVisualizations,
  updateMultipleVisibilitySettings,
  deleteVisualizationFromDashboard,
} from './dashboardTypes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomizeDashboardPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  dashboardName: string;
  onVisualizationsChange: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  BarChart: <BarChart3 className="h-4 w-4" />,
  PieChart: <PieChart className="h-4 w-4" />,
  Map: <MapIcon className="h-4 w-4" />,
  Grid3x3: <Grid3x3 className="h-4 w-4" />,
  LineChart: <LineChart className="h-4 w-4" />,
  BoxSelect: <BoxSelect className="h-4 w-4" />,
  Circle: <Circle className="h-4 w-4" />,
  Radar: <Radar className="h-4 w-4" />,
  line: <LineChart className="h-4 w-4" />,
  bar: <BarChart3 className="h-4 w-4" />,
  pie: <PieChart className="h-4 w-4" />,
  radar: <Radar className="h-4 w-4" />,
  scatter: <Circle className="h-4 w-4" />,
  heatmap: <Grid3x3 className="h-4 w-4" />,
  histogram: <BarChart3 className="h-4 w-4" />,
  boxplot: <BoxSelect className="h-4 w-4" />,
  bubble: <Circle className="h-4 w-4" />,
};

const CustomizeDashboardPanel: React.FC<CustomizeDashboardPanelProps> = ({
  isOpen,
  onClose,
  dashboardId,
  dashboardName,
  onVisualizationsChange,
}) => {
  const [visualizations, setVisualizations] = useState<SavedVisualization[]>([]);
  const [visibilityChanges, setVisibilityChanges] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const vizs = getDashboardVisualizations(dashboardId);
      setVisualizations(vizs.sort((a, b) => a.position - b.position));
      setVisibilityChanges({});
      setHasChanges(false);
    }
  }, [isOpen, dashboardId]);

  const handleVisibilityToggle = (vizId: string, currentVisible: boolean) => {
    const newChanges = { ...visibilityChanges };
    const viz = visualizations.find(v => v.id === vizId);
    if (viz) {
      const originalValue = viz.isVisible;
      const newValue = !currentVisible;
      
      if (newValue === originalValue) {
        delete newChanges[vizId];
      } else {
        newChanges[vizId] = newValue;
      }
      
      setVisibilityChanges(newChanges);
      setHasChanges(Object.keys(newChanges).length > 0);
    }
  };

  const getCurrentVisibility = (viz: SavedVisualization): boolean => {
    if (viz.id in visibilityChanges) {
      return visibilityChanges[viz.id];
    }
    return viz.isVisible;
  };

  const handleSave = () => {
    if (Object.keys(visibilityChanges).length > 0) {
      const updates = Object.entries(visibilityChanges).map(([id, isVisible]) => ({
        id,
        isVisible,
      }));
      updateMultipleVisibilitySettings(updates);
      onVisualizationsChange();
    }
    onClose();
  };

  const handleDelete = (vizId: string) => {
    deleteVisualizationFromDashboard(vizId);
    setVisualizations(visualizations.filter(v => v.id !== vizId));
    setDeleteConfirmId(null);
    onVisualizationsChange();
  };

  const handleCancel = () => {
    setVisibilityChanges({});
    setHasChanges(false);
    onClose();
  };

  const visibleCount = visualizations.filter(v => getCurrentVisibility(v)).length;
  const totalCount = visualizations.length;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleCancel}>
        <SheetContent className="w-[400px] sm:w-[450px] p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75]">
            <SheetTitle className="text-white flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-[#6EDFF6]" />
              Customize Dashboard
            </SheetTitle>
            <SheetDescription className="text-slate-300">
              Manage visualizations on {dashboardName}
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 py-3 bg-slate-50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                {visibleCount} of {totalCount} visible
              </span>
            </div>
            {hasChanges && (
              <Badge className="bg-amber-100 text-amber-700">
                Unsaved changes
              </Badge>
            )}
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {visualizations.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-2">No visualizations added yet</p>
                  <p className="text-sm text-slate-400">
                    Use "Add Visualization" to create charts for this dashboard
                  </p>
                </div>
              ) : (
                visualizations.map((viz) => {
                  const isVisible = getCurrentVisibility(viz);
                  const hasChange = viz.id in visibilityChanges;
                  
                  return (
                    <div
                      key={viz.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isVisible 
                          ? 'bg-white border-slate-200' 
                          : 'bg-slate-50 border-slate-100 opacity-60'
                      } ${hasChange ? 'ring-2 ring-amber-200' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          isVisible 
                            ? 'bg-[#0A3D62]/10 text-[#0A3D62]' 
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          {iconMap[viz.type] || <BarChart3 className="h-4 w-4" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium truncate ${
                              isVisible ? 'text-slate-800' : 'text-slate-500'
                            }`}>
                              {viz.title}
                            </h4>
                            {hasChange && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">
                                Modified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {viz.subtitle || `${viz.type} chart`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {viz.type}
                            </Badge>
                            <span className="text-xs text-slate-400">
                              Position: {viz.position + 1}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={isVisible}
                            onCheckedChange={() => handleVisibilityToggle(viz.id, isVisible)}
                            className="data-[state=checked]:bg-[#0A3D62]"
                          />
                          <button
                            onClick={() => setDeleteConfirmId(viz.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete visualization"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-white flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Visualization</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this visualization? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomizeDashboardPanel;
