import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadarChartOptions } from '../customizationTypes';
import { Radar } from 'lucide-react';

interface RadarChartSettingsProps {
  options: RadarChartOptions;
  onChange: (options: RadarChartOptions) => void;
}

export const RadarChartSettings: React.FC<RadarChartSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof RadarChartOptions>(key: K, value: RadarChartOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-700">
        <Radar className="h-4 w-4" />
        Radar Chart Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Fill Opacity</Label>
          <span className="text-xs text-slate-500">{(options.fillOpacity * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={[options.fillOpacity]}
          onValueChange={([value]) => update('fillOpacity', value)}
          min={0.1}
          max={0.8}
          step={0.05}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Line Stroke Width</Label>
          <span className="text-xs text-slate-500">{options.lineStrokeWidth}px</span>
        </div>
        <Slider
          value={[options.lineStrokeWidth]}
          onValueChange={([value]) => update('lineStrokeWidth', value)}
          min={1}
          max={5}
          step={0.5}
        />
      </div>

      <div>
        <Label className="text-xs text-slate-600">Grid Type</Label>
        <Select value={options.gridType} onValueChange={(v) => update('gridType', v as RadarChartOptions['gridType'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Grid Levels</Label>
          <span className="text-xs text-slate-500">{options.levels}</span>
        </div>
        <Slider
          value={[options.levels]}
          onValueChange={([value]) => update('levels', value)}
          min={3}
          max={10}
          step={1}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Point Markers</Label>
          <Switch checked={options.showPointMarkers} onCheckedChange={(v) => update('showPointMarkers', v)} />
        </div>

        {options.showPointMarkers && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Point Size</Label>
              <span className="text-xs text-slate-500">{options.pointMarkerSize}px</span>
            </div>
            <Slider
              value={[options.pointMarkerSize]}
              onValueChange={([value]) => update('pointMarkerSize', value)}
              min={2}
              max={10}
              step={1}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Axis Labels</Label>
          <Switch checked={options.showAxisLabels} onCheckedChange={(v) => update('showAxisLabels', v)} />
        </div>
      </div>
    </div>
  );
};

export default RadarChartSettings;
