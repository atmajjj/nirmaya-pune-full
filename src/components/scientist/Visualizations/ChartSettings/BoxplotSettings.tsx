import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BoxplotOptions } from '../customizationTypes';
import { BoxSelect } from 'lucide-react';

interface BoxplotSettingsProps {
  options: BoxplotOptions;
  onChange: (options: BoxplotOptions) => void;
}

export const BoxplotSettings: React.FC<BoxplotSettingsProps> = ({ options, onChange }) => {
  const update = <K extends keyof BoxplotOptions>(key: K, value: BoxplotOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
        <BoxSelect className="h-4 w-4" />
        Boxplot Options
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Box Width</Label>
          <span className="text-xs text-slate-500">{options.boxWidth}px</span>
        </div>
        <Slider
          value={[options.boxWidth]}
          onValueChange={([value]) => update('boxWidth', value)}
          min={20}
          max={80}
          step={5}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-slate-600">Whisker Length (IQR multiplier)</Label>
          <span className="text-xs text-slate-500">{options.whiskerLength}x</span>
        </div>
        <Slider
          value={[options.whiskerLength]}
          onValueChange={([value]) => update('whiskerLength', value)}
          min={1}
          max={3}
          step={0.5}
        />
      </div>

      <div>
        <Label className="text-xs text-slate-600">Whisker Style</Label>
        <Select value={options.whiskerStyle} onValueChange={(v) => update('whiskerStyle', v as BoxplotOptions['whiskerStyle'])}>
          <SelectTrigger className="mt-1 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="capped">Capped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Mean Marker</Label>
          <Switch checked={options.showMeanMarker} onCheckedChange={(v) => update('showMeanMarker', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Notch</Label>
          <Switch checked={options.showNotch} onCheckedChange={(v) => update('showNotch', v)} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-slate-600">Show Outliers</Label>
          <Switch checked={options.showOutliers} onCheckedChange={(v) => update('showOutliers', v)} />
        </div>

        {options.showOutliers && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-slate-600">Outlier Marker Size</Label>
                <span className="text-xs text-slate-500">{options.outlierMarkerSize}px</span>
              </div>
              <Slider
                value={[options.outlierMarkerSize]}
                onValueChange={([value]) => update('outlierMarkerSize', value)}
                min={3}
                max={12}
                step={1}
              />
            </div>

            <div>
              <Label className="text-xs text-slate-600">Outlier Style</Label>
              <Select value={options.outlierMarkerStyle} onValueChange={(v) => update('outlierMarkerStyle', v as BoxplotOptions['outlierMarkerStyle'])}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">● Circle</SelectItem>
                  <SelectItem value="diamond">◆ Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BoxplotSettings;
