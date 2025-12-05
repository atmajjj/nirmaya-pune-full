import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Type, Palette, Grid3x3, Move, Settings2 } from 'lucide-react';
import { UniversalOptions } from './customizationTypes';

interface UniversalSettingsPanelProps {
  options: UniversalOptions;
  onChange: (options: UniversalOptions) => void;
}

const colorSchemes = {
  water: ['#0A3D62', '#0ea5e9', '#6EDFF6', '#10b981', '#06b6d4'],
  earth: ['#78350f', '#a16207', '#ca8a04', '#65a30d', '#059669'],
  scientific: ['#1e3a5f', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444'],
};

export const UniversalSettingsPanel: React.FC<UniversalSettingsPanelProps> = ({ options, onChange }) => {
  const updateOption = <K extends keyof UniversalOptions>(key: K, value: UniversalOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title & Labels Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Type className="h-4 w-4" />
          Title & Labels
        </div>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-slate-600">Chart Title</Label>
            <Input
              value={options.title}
              onChange={(e) => updateOption('title', e.target.value)}
              placeholder="Enter chart title..."
              className="mt-1 h-9 text-sm"
            />
          </div>
          
          <div>
            <Label className="text-xs text-slate-600">Subtitle</Label>
            <Input
              value={options.subtitle}
              onChange={(e) => updateOption('subtitle', e.target.value)}
              placeholder="Optional subtitle..."
              className="mt-1 h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-slate-600">X-Axis Label</Label>
              <Input
                value={options.xAxisLabel}
                onChange={(e) => updateOption('xAxisLabel', e.target.value)}
                placeholder="X-Axis"
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-600">Y-Axis Label</Label>
              <Input
                value={options.yAxisLabel}
                onChange={(e) => updateOption('yAxisLabel', e.target.value)}
                placeholder="Y-Axis"
                className="mt-1 h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Color Scheme Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Palette className="h-4 w-4" />
          Color Scheme
        </div>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-slate-600">Preset Scheme</Label>
            <Select
              value={options.colorScheme}
              onValueChange={(value) => updateOption('colorScheme', value as UniversalOptions['colorScheme'])}
            >
              <SelectTrigger className="mt-1 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="water">🌊 Water Theme</SelectItem>
                <SelectItem value="earth">🌍 Earth Theme</SelectItem>
                <SelectItem value="scientific">🔬 Scientific Theme</SelectItem>
                <SelectItem value="custom">🎨 Custom Colors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Preview */}
          <div className="flex gap-1">
            {(options.colorScheme !== 'custom' 
              ? colorSchemes[options.colorScheme as keyof typeof colorSchemes] || colorSchemes.water
              : options.customColors
            ).map((color, i) => (
              <div
                key={i}
                className="h-6 flex-1 rounded-md border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <div>
            <Label className="text-xs text-slate-600">Background Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={options.backgroundColor}
                onChange={(e) => updateOption('backgroundColor', e.target.value)}
                className="h-9 w-12 rounded border border-slate-200 cursor-pointer"
              />
              <Input
                value={options.backgroundColor}
                onChange={(e) => updateOption('backgroundColor', e.target.value)}
                className="h-9 text-sm flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Grid & Axes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Grid3x3 className="h-4 w-4" />
          Grid & Axes
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-slate-600">Show Grid</Label>
            <Switch
              checked={options.showGrid}
              onCheckedChange={(checked) => updateOption('showGrid', checked)}
            />
          </div>

          {options.showGrid && (
            <div>
              <Label className="text-xs text-slate-600">Grid Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={options.gridColor}
                  onChange={(e) => updateOption('gridColor', e.target.value)}
                  className="h-8 w-10 rounded border border-slate-200 cursor-pointer"
                />
                <Input
                  value={options.gridColor}
                  onChange={(e) => updateOption('gridColor', e.target.value)}
                  className="h-8 text-sm flex-1"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-600">X-Axis</Label>
              <Switch
                checked={options.showXAxis}
                onCheckedChange={(checked) => updateOption('showXAxis', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-600">Y-Axis</Label>
              <Switch
                checked={options.showYAxis}
                onCheckedChange={(checked) => updateOption('showYAxis', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Size & Layout Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Move className="h-4 w-4" />
          Size & Layout
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Width</Label>
              <span className="text-xs text-slate-500">{options.width}px</span>
            </div>
            <Slider
              value={[options.width]}
              onValueChange={([value]) => updateOption('width', value)}
              min={400}
              max={1200}
              step={50}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Height</Label>
              <span className="text-xs text-slate-500">{options.height}px</span>
            </div>
            <Slider
              value={[options.height]}
              onValueChange={([value]) => updateOption('height', value)}
              min={200}
              max={800}
              step={50}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Padding</Label>
              <span className="text-xs text-slate-500">{options.padding}px</span>
            </div>
            <Slider
              value={[options.padding]}
              onValueChange={([value]) => updateOption('padding', value)}
              min={0}
              max={60}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Legend & Animation Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Settings2 className="h-4 w-4" />
          Legend & Animation
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-slate-600">Show Legend</Label>
            <Switch
              checked={options.showLegend}
              onCheckedChange={(checked) => updateOption('showLegend', checked)}
            />
          </div>

          {options.showLegend && (
            <div>
              <Label className="text-xs text-slate-600">Legend Position</Label>
              <Select
                value={options.legendPosition}
                onValueChange={(value) => updateOption('legendPosition', value as UniversalOptions['legendPosition'])}
              >
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label className="text-xs text-slate-600">Enable Animation</Label>
            <Switch
              checked={options.animationEnabled}
              onCheckedChange={(checked) => updateOption('animationEnabled', checked)}
            />
          </div>

          {options.animationEnabled && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-slate-600">Animation Duration</Label>
                <span className="text-xs text-slate-500">{options.animationDuration}ms</span>
              </div>
              <Slider
                value={[options.animationDuration]}
                onValueChange={([value]) => updateOption('animationDuration', value)}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-slate-600">Font Size</Label>
              <span className="text-xs text-slate-500">{options.fontSize}px</span>
            </div>
            <Slider
              value={[options.fontSize]}
              onValueChange={([value]) => updateOption('fontSize', value)}
              min={8}
              max={18}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalSettingsPanel;
