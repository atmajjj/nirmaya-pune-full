import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Beaker,
  Calculator,
  MapPin,
  LayoutDashboard,
  Check,
  ArrowRight,
  Database,
  Code,
  Bell,
  FileText,
} from 'lucide-react';
import { DashboardPage, SCIENTIST_DASHBOARDS } from './dashboardTypes';

interface DashboardSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dashboard: DashboardPage, position: 'top' | 'middle' | 'bottom' | 'auto') => void;
  visualizationName: string;
  dashboards?: DashboardPage[];
}

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Beaker: <Beaker className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  MapPin: <MapPin className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  Bell: <Bell className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
};

type Position = 'top' | 'middle' | 'bottom' | 'auto';

const DashboardSelectorModal: React.FC<DashboardSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  visualizationName,
  dashboards = SCIENTIST_DASHBOARDS,
}) => {
  const [selectedDashboard, setSelectedDashboard] = useState<string>(dashboards[0]?.id || '');
  const [selectedPosition, setSelectedPosition] = useState<Position>('auto');

  const handleConfirm = () => {
    const dashboard = dashboards.find(d => d.id === selectedDashboard);
    if (dashboard) {
      onSelect(dashboard, selectedPosition);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] p-0 gap-0 overflow-hidden">
        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-[#0A3D62]" />
              Add to Dashboard
            </DialogTitle>
            <DialogDescription>
              Choose where to place "{visualizationName}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 px-6 overflow-y-auto flex-1">
            {/* Dashboard Selection */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Select Dashboard Page
              </Label>
              <RadioGroup
                value={selectedDashboard}
                onValueChange={setSelectedDashboard}
                className="space-y-2"
              >
                {dashboards.map((dashboard) => (
                  <div
                    key={dashboard.id}
                    className={`flex items-center space-x-3 p-2.5 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedDashboard === dashboard.id
                        ? 'border-[#0A3D62] bg-[#0A3D62]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedDashboard(dashboard.id)}
                  >
                    <RadioGroupItem value={dashboard.id} id={dashboard.id} className="sr-only" />
                    <div className={`p-2 rounded-lg ${
                      selectedDashboard === dashboard.id 
                        ? 'bg-[#0A3D62] text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {iconMap[dashboard.icon]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${
                          selectedDashboard === dashboard.id ? 'text-[#0A3D62]' : 'text-slate-700'
                        }`}>
                          {dashboard.name}
                        </span>
                        {selectedDashboard === dashboard.id && (
                          <Check className="h-4 w-4 text-[#0A3D62]" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{dashboard.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Position Selection */}
            <div className="pb-4">
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Position Preference
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'auto', label: 'Auto' },
                  { value: 'top', label: 'Top' },
                  { value: 'middle', label: 'Middle' },
                  { value: 'bottom', label: 'Bottom' },
                ].map((pos) => (
                  <button
                    key={pos.value}
                    onClick={() => setSelectedPosition(pos.value as Position)}
                    className={`px-2.5 py-2 text-sm rounded-lg border-2 transition-all ${
                      selectedPosition === pos.value
                        ? 'border-[#0A3D62] bg-[#0A3D62] text-white'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {selectedPosition === 'auto' 
                  ? 'System will place it in the best available position'
                  : `Visualization will be placed at the ${selectedPosition} of the dashboard`
                }
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t flex-shrink-0 bg-slate-50">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] text-white gap-2"
            >
              Add to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardSelectorModal;
