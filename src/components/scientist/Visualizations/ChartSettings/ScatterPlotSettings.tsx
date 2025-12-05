import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScatterPlotOptions } from '../customizationTypes';
import { ScatterChart } from 'lucide-react';

interface ScatterPlotSettingsProps {
  options: ScatterPlotOptions;
  onChange: (options: ScatterPlotOptions) => void;
}

export const ScatterPlotSettings: React.FC<ScatterPlotSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof ScatterPlotOptions>(key: K, value: ScatterPlotOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-rose-700">
        <ScatterChart className="h-4 w-4" />
        Scatter Plot Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Point Size</Label>
          <span className="text-xs text-slate-500">{options.pointSize}px</span>
        </div>
        <Slider
          value={[options.pointSize]}
          onValueChange={([value]) => update('pointSize', value)}
          min={4}
          max={20}
          step={1}
        />
      </div>

      <div>
        <Label className="text-xs text-slate-600">Point Shape</Label>
        <Select value={options.pointShape} onValueChange={(v) => update('pointShape', v as ScatterPlotOptions['pointShape'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="circle">● Circle</SelectItem>
            <SelectItem value="square">■ Square</SelectItem>
            <SelectItem value="triangle">▲ Triangle</SelectItem>
            <SelectItem value="diamond">◆ Diamond</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Point Opacity</Label>
          <span className="text-xs text-slate-500">{(options.pointOpacity * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={[options.pointOpacity]}
          onValueChange={([value]) => update('pointOpacity', value)}
          min={0.3}
          max={1}
          step={0.1}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Trend Line</Label>
          <Switch checked={options.showTrendLine} onCheckedChange={(v) => update('showTrendLine', v)} />
        </div>

        {options.showTrendLine && (
          <div>
            <Label className="text-xs text-slate-600">Trend Line Type</Label>
            <Select value={options.trendLineType} onValueChange={(v) => update('trendLineType', v as ScatterPlotOptions['trendLineType'])}>
              <SelectTrigger className="mt-1 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="polynomial">Polynomial</SelectItem>
                <SelectItem value="exponential">Exponential</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Confidence Interval</Label>
          <Switch checked={options.showConfidenceInterval} onCheckedChange={(v) => update('showConfidenceInterval', v)} />
        </div>
      </div>
    </div>
  );
};

export default ScatterPlotSettings;
