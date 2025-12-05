import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HistogramOptions } from '../customizationTypes';
import { BarChart3 } from 'lucide-react';

interface HistogramSettingsProps {
  options: HistogramOptions;
  onChange: (options: HistogramOptions) => void;
}

export const HistogramSettings: React.FC<HistogramSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof HistogramOptions>(key: K, value: HistogramOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
        <BarChart3 className="h-4 w-4" />
        Histogram Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Number of Bins</Label>
          <span className="text-xs text-slate-500">{options.numberOfBins}</span>
        </div>
        <Slider
          value={[options.numberOfBins]}
          onValueChange={([value]) => update('numberOfBins', value)}
          min={5}
          max={30}
          step={1}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Bin Opacity</Label>
          <span className="text-xs text-slate-500">{(options.binOpacity * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={[options.binOpacity]}
          onValueChange={([value]) => update('binOpacity', value)}
          min={0.3}
          max={1}
          step={0.1}
        />
      </div>

      <div>
        <Label className="text-xs text-slate-600">Bin Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="color"
            value={options.binColor}
            onChange={(e) => update('binColor', e.target.value)}
            className="h-9 w-12 rounded border border-slate-200 cursor-pointer"
          />
          <Input
            value={options.binColor}
            onChange={(e) => update('binColor', e.target.value)}
            className="h-9 text-sm flex-1"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Mean Line</Label>
          <Switch checked={options.showMeanLine} onCheckedChange={(v) => update('showMeanLine', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Median Line</Label>
          <Switch checked={options.showMedianLine} onCheckedChange={(v) => update('showMedianLine', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Threshold Lines</Label>
          <Switch checked={options.showThresholdLines} onCheckedChange={(v) => update('showThresholdLines', v)} />
        </div>
      </div>
    </div>
  );
};

export default HistogramSettings;
