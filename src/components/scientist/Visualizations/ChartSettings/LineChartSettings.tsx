import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LineChartOptions } from '../customizationTypes';
import { TrendingUp } from 'lucide-react';

interface LineChartSettingsProps {
  options: LineChartOptions;
  onChange: (options: LineChartOptions) => void;
}

export const LineChartSettings: React.FC<LineChartSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof LineChartOptions>(key: K, value: LineChartOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
        <TrendingUp className="h-4 w-4" />
        Line Chart Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Line Thickness</Label>
          <span className="text-xs text-slate-500">{options.lineThickness}px</span>
        </div>
        <Slider
          value={[options.lineThickness]}
          onValueChange={([value]) => update('lineThickness', value)}
          min={1}
          max={8}
          step={0.5}
        />
      </div>

      <div>
        <Label className="text-xs text-slate-600">Marker Style</Label>
        <Select value={options.markerStyle} onValueChange={(v) => update('markerStyle', v as LineChartOptions['markerStyle'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="circle">● Circle</SelectItem>
            <SelectItem value="square">■ Square</SelectItem>
            <SelectItem value="diamond">◆ Diamond</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {options.markerStyle !== 'none' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs text-slate-600">Marker Size</Label>
            <span className="text-xs text-slate-500">{options.markerSize}px</span>
          </div>
          <Slider
            value={[options.markerSize]}
            onValueChange={([value]) => update('markerSize', value)}
            min={2}
            max={12}
            step={1}
          />
        </div>
      )}

      <div>
        <Label className="text-xs text-slate-600">Line Style</Label>
        <Select value={options.lineStyle} onValueChange={(v) => update('lineStyle', v as LineChartOptions['lineStyle'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">━ Solid</SelectItem>
            <SelectItem value="dashed">╌ Dashed</SelectItem>
            <SelectItem value="dotted">┄ Dotted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Smooth Line (Curved)</Label>
          <Switch checked={options.smoothLine} onCheckedChange={(v) => update('smoothLine', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Data Labels</Label>
          <Switch checked={options.showDataLabels} onCheckedChange={(v) => update('showDataLabels', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Area Fill</Label>
          <Switch checked={options.showAreaFill} onCheckedChange={(v) => update('showAreaFill', v)} />
        </div>

        {options.showAreaFill && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Fill Opacity</Label>
              <span className="text-xs text-slate-500">{(options.areaFillOpacity * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[options.areaFillOpacity]}
              onValueChange={([value]) => update('areaFillOpacity', value)}
              min={0.1}
              max={0.8}
              step={0.1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChartSettings;
