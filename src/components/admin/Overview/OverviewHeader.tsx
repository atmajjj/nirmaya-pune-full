import { useState } from 'react';
import { Monitor, RefreshCw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SimplifiedCustomizePanel from '@/components/scientist/Overview/SimplifiedCustomizePanel';
import { DashboardWidget } from '@/components/scientist/Overview/widgetVisibility';

interface OverviewHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
  onVisualizationsChange?: () => void;
  onWidgetVisibilityChange?: (widgets: DashboardWidget[]) => void;
  dashboardId?: string;
}

const OverviewHeader = ({ 
  onRefresh, 
  refreshing,
  onVisualizationsChange,
  onWidgetVisibilityChange,
  dashboardId = 'admin-overview'
}: OverviewHeaderProps) => {
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
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
        onVisualizationsChange={() => {
          if (onVisualizationsChange) {
            onVisualizationsChange();
          }
        }}
      />
    </>
  );
};

export default OverviewHeader;
