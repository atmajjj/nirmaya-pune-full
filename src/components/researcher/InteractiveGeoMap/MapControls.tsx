import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface MapControlsProps {
  mapMode: string;
  setMapMode: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  metalFilter: string;
  setMetalFilter: (value: string) => void;
  riskFilter: string;
  setRiskFilter: (value: string) => void;
}

export const MapControls = ({
  mapMode,
  setMapMode,
  timeRange,
  setTimeRange,
  metalFilter,
  setMetalFilter,
  riskFilter,
  setRiskFilter
}: MapControlsProps) => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardHeader className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-brand" />
          <h3 className="text-sm font-semibold text-slate-900">Map Controls</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">Map Mode</label>
          <Select value={mapMode} onValueChange={setMapMode}>
            <SelectTrigger className="bg-white border-slate-300 rounded-md text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="satellite">Satellite</SelectItem>
              <SelectItem value="terrain">Terrain</SelectItem>
              <SelectItem value="roadmap">Roadmap</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-white border-slate-300 rounded-md text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">Metal Filter</label>
          <Select value={metalFilter} onValueChange={setMetalFilter}>
            <SelectTrigger className="bg-white border-slate-300 rounded-md text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metals</SelectItem>
              <SelectItem value="arsenic">Arsenic</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="chromium">Chromium</SelectItem>
              <SelectItem value="cadmium">Cadmium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">Risk Level</label>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="bg-white border-slate-300 rounded-md text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
