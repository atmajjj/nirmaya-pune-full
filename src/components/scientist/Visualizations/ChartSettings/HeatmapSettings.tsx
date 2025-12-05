import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HeatmapOptions } from '../customizationTypes';
import { Grid3x3 } from 'lucide-react';

interface HeatmapSettingsProps {
  options: HeatmapOptions;
  onChange: (options: HeatmapOptions) => void;
}

export const HeatmapSettings: React.FC<HeatmapSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof HeatmapOptions>(key: K, value: HeatmapOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
        <Grid3x3 className="h-4 w-4" />
        Heatmap Options
      </div>

      <div>
        <Label className="text-xs text-slate-600">Color Scale</Label>
        <Select value={options.colorScale} onValueChange={(v) => update('colorScale', v as HeatmapOptions['colorScale'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red-blue">🔴🔵 Red to Blue</SelectItem>
            <SelectItem value="yellow-green">🟡🟢 Yellow to Green</SelectItem>
            <SelectItem value="multi-gradient">🌈 Multi Gradient</SelectItem>
            <SelectItem value="viridis">🟣 Viridis</SelectItem>
            <SelectItem value="plasma">🔥 Plasma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Grid Size</Label>
          <span className="text-xs text-slate-500">{options.gridSize}px</span>
        </div>
        <Slider
          value={[options.gridSize]}
          onValueChange={([value]) => update('gridSize', value)}
          min={10}
          max={50}
          step={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-600">Range Min</Label>
          <Input
            type="number"
            value={options.rangeMin}
            onChange={(e) => update('rangeMin', parseFloat(e.target.value) || 0)}
            className="mt-1 h-9 text-sm"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-600">Range Max</Label>
          <Input
            type="number"
            value={options.rangeMax}
            onChange={(e) => update('rangeMax', parseFloat(e.target.value) || 100)}
            className="mt-1 h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Intensity Smoothing</Label>
          <Switch checked={options.intensitySmoothing} onCheckedChange={(v) => update('intensitySmoothing', v)} />
        </div>

        {options.intensitySmoothing && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Smoothing Level</Label>
              <span className="text-xs text-slate-500">{options.smoothingLevel}</span>
            </div>
            <Slider
              value={[options.smoothingLevel]}
              onValueChange={([value]) => update('smoothingLevel', value)}
              min={1}
              max={5}
              step={1}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Cell Values</Label>
          <Switch checked={options.showCellValues} onCheckedChange={(v) => update('showCellValues', v)} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs text-slate-600">Cell Border Width</Label>
            <span className="text-xs text-slate-500">{options.cellBorderWidth}px</span>
          </div>
          <Slider
            value={[options.cellBorderWidth]}
            onValueChange={([value]) => update('cellBorderWidth', value)}
            min={0}
            max={3}
            step={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default HeatmapSettings;
