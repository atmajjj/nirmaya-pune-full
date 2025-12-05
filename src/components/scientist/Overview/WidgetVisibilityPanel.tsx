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
import {
  Settings2,
  BarChart3,
  PieChart,
  AlertTriangle,
  Shield,
  LayoutGrid,
  Eye,
  EyeOff,
  Save,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  DashboardWidget,
  getWidgetVisibility,
  saveWidgetVisibility,
  resetWidgetVisibility,
} from './widgetVisibility';

interface WidgetVisibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  onVisibilityChange: (widgets: DashboardWidget[]) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="h-5 w-5" />,
  BarChart: <BarChart3 className="h-5 w-5" />,
  PieChart: <PieChart className="h-5 w-5" />,
  AlertTriangle: <AlertTriangle className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  LayoutGrid: <LayoutGrid className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  stats: 'bg-blue-100 text-blue-700',
  charts: 'bg-emerald-100 text-emerald-700',
  alerts: 'bg-amber-100 text-amber-700',
  custom: 'bg-purple-100 text-purple-700',
};

const categoryLabels: Record<string, string> = {
  stats: 'Statistics',
  charts: 'Charts',
  alerts: 'Alerts & Risk',
  custom: 'Custom',
};

const WidgetVisibilityPanel: React.FC<WidgetVisibilityPanelProps> = ({
  isOpen,
  onClose,
  dashboardId,
  onVisibilityChange,
}) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [originalWidgets, setOriginalWidgets] = useState<DashboardWidget[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadedWidgets = getWidgetVisibility(dashboardId);
      setWidgets(loadedWidgets);
      setOriginalWidgets(JSON.parse(JSON.stringify(loadedWidgets)));
      setHasChanges(false);
    }
  }, [isOpen, dashboardId]);

  const handleToggle = (widgetId: string) => {
    const updated = widgets.map(w =>
      w.id === widgetId ? { ...w, isVisible: !w.isVisible } : w
    );
    setWidgets(updated);
    
    // Check if there are changes
    const changed = updated.some((w, i) => w.isVisible !== originalWidgets[i]?.isVisible);
    setHasChanges(changed);
  };

  const handleSave = () => {
    saveWidgetVisibility(dashboardId, widgets);
    onVisibilityChange(widgets);
    setOriginalWidgets(JSON.parse(JSON.stringify(widgets)));
    setHasChanges(false);
    onClose();
  };

  const handleReset = () => {
    const defaultWidgets = resetWidgetVisibility(dashboardId);
    setWidgets(defaultWidgets);
    onVisibilityChange(defaultWidgets);
    setOriginalWidgets(JSON.parse(JSON.stringify(defaultWidgets)));
    setHasChanges(false);
  };

  const handleCancel = () => {
    setWidgets(originalWidgets);
    setHasChanges(false);
    onClose();
  };

  const visibleCount = widgets.filter(w => w.isVisible).length;
  const totalCount = widgets.length;

  // Group widgets by category
  const groupedWidgets = widgets.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, DashboardWidget[]>);

  return (
    <Sheet open={isOpen} onOpenChange={handleCancel}>
      <SheetContent className="w-[420px] sm:w-[480px] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-brand to-brand-light flex-shrink-0">
          <SheetTitle className="text-white flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-brand-accent" />
            Customize Dashboard
          </SheetTitle>
          <SheetDescription className="text-slate-300">
            Toggle widgets to show or hide them on your dashboard
          </SheetDescription>
        </SheetHeader>

        {/* Status Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600">
              {visibleCount} of {totalCount} widgets visible
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                Unsaved changes
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Widget List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {Object.entries(groupedWidgets).map(([category, categoryWidgets]) => (
              <div key={category}>
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${categoryColors[category]} border-0`}>
                    {categoryLabels[category]}
                  </Badge>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Widgets in Category */}
                <div className="space-y-3">
                  {categoryWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        widget.isVisible
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-slate-50 border-slate-100 opacity-70'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`p-2.5 rounded-lg transition-colors ${
                          widget.isVisible
                            ? 'bg-brand/10 text-brand'
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          {iconMap[widget.icon] || <LayoutGrid className="h-5 w-5" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold ${
                              widget.isVisible ? 'text-slate-800' : 'text-slate-500'
                            }`}>
                              {widget.name}
                            </h4>
                            {widget.isVisible ? (
                              <Eye className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            widget.isVisible ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {widget.description}
                          </p>
                        </div>

                        {/* Toggle */}
                        <Switch
                          checked={widget.isVisible}
                          onCheckedChange={() => handleToggle(widget.id)}
                          className="data-[state=checked]:bg-brand"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex justify-end gap-3 flex-shrink-0">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-gradient-to-r from-brand to-brand-light text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WidgetVisibilityPanel;
