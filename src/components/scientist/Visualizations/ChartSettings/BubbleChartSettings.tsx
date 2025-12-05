import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BubbleChartOptions } from '../customizationTypes';
import { Circle } from 'lucide-react';

interface BubbleChartSettingsProps {
  options: BubbleChartOptions;
  onChange: (options: BubbleChartOptions) => void;
}

export const BubbleChartSettings: React.FC<BubbleChartSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof BubbleChartOptions>(key: K, value: BubbleChartOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
        <Circle className="h-4 w-4" />
        Bubble Chart Options
      </div>

      <div>
        <Label className="text-xs text-slate-600">Color Coding By</Label>
        <Select value={options.colorCoding} onValueChange={(v) => update('colorCoding', v as BubbleChartOptions['colorCoding'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contaminant">Contaminant Type</SelectItem>
            <SelectItem value="hmpi">HMPI Score</SelectItem>
            <SelectItem value="depth">Well Depth</SelectItem>
            <SelectItem value="risk">Risk Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Bubble Size Scale</Label>
          <span className="text-xs text-slate-500">{options.bubbleSizeScale}x</span>
        </div>
        <Slider
          value={[options.bubbleSizeScale]}
          onValueChange={([value]) => update('bubbleSizeScale', value)}
          min={0.5}
          max={3}
          step={0.25}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Bubble Opacity</Label>
          <span className="text-xs text-slate-500">{(options.bubbleOpacity * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={[options.bubbleOpacity]}
          onValueChange={([value]) => update('bubbleOpacity', value)}
          min={0.3}
          max={1}
          step={0.1}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-600">Min Bubble Size</Label>
          <Input
            type="number"
            value={options.minBubbleSize}
            onChange={(e) => update('minBubbleSize', parseInt(e.target.value) || 5)}
            className="mt-1 h-9 text-sm"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-600">Max Bubble Size</Label>
          <Input
            type="number"
            value={options.maxBubbleSize}
            onChange={(e) => update('maxBubbleSize', parseInt(e.target.value) || 100)}
            className="mt-1 h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Bubble Labels</Label>
          <Switch checked={options.showBubbleLabels} onCheckedChange={(v) => update('showBubbleLabels', v)} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs text-slate-600">Border Width</Label>
            <span className="text-xs text-slate-500">{options.bubbleBorderWidth}px</span>
          </div>
          <Slider
            value={[options.bubbleBorderWidth]}
            onValueChange={([value]) => update('bubbleBorderWidth', value)}
            min={0}
            max={5}
            step={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default BubbleChartSettings;
