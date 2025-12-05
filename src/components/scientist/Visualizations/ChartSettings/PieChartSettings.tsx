import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PieChartOptions } from '../customizationTypes';
import { PieChart } from 'lucide-react';

interface PieChartSettingsProps {
  options: PieChartOptions;
  onChange: (options: PieChartOptions) => void;
}

export const PieChartSettings: React.FC<PieChartSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof PieChartOptions>(key: K, value: PieChartOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-pink-700">
        <PieChart className="h-4 w-4" />
        Pie/Donut Chart Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Inner Radius (0 = Pie, &gt;0 = Donut)</Label>
          <span className="text-xs text-slate-500">{options.innerRadius}%</span>
        </div>
        <Slider
          value={[options.innerRadius]}
          onValueChange={([value]) => update('innerRadius', value)}
          min={0}
          max={80}
          step={5}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Segment Spacing</Label>
          <span className="text-xs text-slate-500">{options.segmentSpacing}px</span>
        </div>
        <Slider
          value={[options.segmentSpacing]}
          onValueChange={([value]) => update('segmentSpacing', value)}
          min={0}
          max={10}
          step={1}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Start Angle</Label>
          <span className="text-xs text-slate-500">{options.startAngle}°</span>
        </div>
        <Slider
          value={[options.startAngle]}
          onValueChange={([value]) => update('startAngle', value)}
          min={0}
          max={360}
          step={15}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Segment Labels</Label>
          <Switch checked={options.showSegmentLabels} onCheckedChange={(v) => update('showSegmentLabels', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Percentage Labels</Label>
          <Switch checked={options.showPercentageLabels} onCheckedChange={(v) => update('showPercentageLabels', v)} />
        </div>

        {(options.showSegmentLabels || options.showPercentageLabels) && (
          <div>
            <Label className="text-xs text-slate-600">Label Position</Label>
            <Select value={options.labelPosition} onValueChange={(v) => update('labelPosition', v as PieChartOptions['labelPosition'])}>
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

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Sort Segments by Value</Label>
          <Switch checked={options.sortSegments} onCheckedChange={(v) => update('sortSegments', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Highlight on Hover</Label>
          <Switch checked={options.highlightOnHover} onCheckedChange={(v) => update('highlightOnHover', v)} />
        </div>
      </div>
    </div>
  );
};

export default PieChartSettings;
