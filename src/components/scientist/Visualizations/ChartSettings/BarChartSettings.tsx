import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BarChartOptions } from '../customizationTypes';
import { BarChart3 } from 'lucide-react';

interface BarChartSettingsProps {
  options: BarChartOptions;
  onChange: (options: BarChartOptions) => void;
}

export const BarChartSettings: React.FC<BarChartSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof BarChartOptions>(key: K, value: BarChartOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
        <BarChart3 className="h-4 w-4" />
        Bar Chart Options
      </div>

      <div>
        <Label className="text-xs text-slate-600">Orientation</Label>
        <Select value={options.orientation} onValueChange={(v) => update('orientation', v as BarChartOptions['orientation'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vertical">Vertical</SelectItem>
            <SelectItem value="horizontal">Horizontal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-slate-600">Bar Mode</Label>
        <Select value={options.barMode} onValueChange={(v) => update('barMode', v as BarChartOptions['barMode'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grouped">Grouped</SelectItem>
            <SelectItem value="stacked">Stacked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Bar Spacing</Label>
          <span className="text-xs text-slate-500">{options.barSpacing}px</span>
        </div>
        <Slider
          value={[options.barSpacing]}
          onValueChange={([value]) => update('barSpacing', value)}
          min={0}
          max={30}
          step={2}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Bar Thickness</Label>
          <span className="text-xs text-slate-500">{options.barThickness}px</span>
        </div>
        <Slider
          value={[options.barThickness]}
          onValueChange={([value]) => update('barThickness', value)}
          min={10}
          max={60}
          step={5}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Border Radius</Label>
          <span className="text-xs text-slate-500">{options.borderRadius}px</span>
        </div>
        <Slider
          value={[options.borderRadius]}
          onValueChange={([value]) => update('borderRadius', value)}
          min={0}
          max={20}
          step={1}
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Label className="text-xs text-slate-600">Show Bar Labels</Label>
        <Switch checked={options.showBarLabels} onCheckedChange={(v) => update('showBarLabels', v)} />
      </div>

      {options.showBarLabels && (
        <div>
          <Label className="text-xs text-slate-600">Label Position</Label>
          <Select value={options.barLabelPosition} onValueChange={(v) => update('barLabelPosition', v as BarChartOptions['barLabelPosition'])}>
            <SelectTrigger className="mt-1 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inside">Inside</SelectItem>
              <SelectItem value="outside">Outside</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default BarChartSettings;
