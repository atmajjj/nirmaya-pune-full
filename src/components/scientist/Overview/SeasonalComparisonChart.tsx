import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, LabelList 
} from 'recharts';
import { Settings2, Save, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample seasonal data for different locations
const seasonalData = {
  hmpi: [
    { location: 'Mumbai', preMonsoon: 78, postMonsoon: 62 },
    { location: 'Delhi', preMonsoon: 85, postMonsoon: 71 },
    { location: 'Chennai', preMonsoon: 65, postMonsoon: 52 },
    { location: 'Kolkata', preMonsoon: 72, postMonsoon: 58 },
    { location: 'Bangalore', preMonsoon: 55, postMonsoon: 45 },
    { location: 'Hyderabad', preMonsoon: 68, postMonsoon: 54 },
  ],
  lead: [
    { location: 'Mumbai', preMonsoon: 0.045, postMonsoon: 0.032 },
    { location: 'Delhi', preMonsoon: 0.058, postMonsoon: 0.041 },
    { location: 'Chennai', preMonsoon: 0.038, postMonsoon: 0.028 },
    { location: 'Kolkata', preMonsoon: 0.042, postMonsoon: 0.035 },
    { location: 'Bangalore', preMonsoon: 0.029, postMonsoon: 0.022 },
    { location: 'Hyderabad', preMonsoon: 0.035, postMonsoon: 0.027 },
  ],
  arsenic: [
    { location: 'Mumbai', preMonsoon: 0.012, postMonsoon: 0.008 },
    { location: 'Delhi', preMonsoon: 0.018, postMonsoon: 0.012 },
    { location: 'Chennai', preMonsoon: 0.009, postMonsoon: 0.006 },
    { location: 'Kolkata', preMonsoon: 0.025, postMonsoon: 0.018 },
    { location: 'Bangalore', preMonsoon: 0.007, postMonsoon: 0.005 },
    { location: 'Hyderabad', preMonsoon: 0.011, postMonsoon: 0.008 },
  ],
  cadmium: [
    { location: 'Mumbai', preMonsoon: 0.003, postMonsoon: 0.002 },
    { location: 'Delhi', preMonsoon: 0.005, postMonsoon: 0.003 },
    { location: 'Chennai', preMonsoon: 0.002, postMonsoon: 0.001 },
    { location: 'Kolkata', preMonsoon: 0.004, postMonsoon: 0.003 },
    { location: 'Bangalore', preMonsoon: 0.002, postMonsoon: 0.001 },
    { location: 'Hyderabad', preMonsoon: 0.003, postMonsoon: 0.002 },
  ],
  chromium: [
    { location: 'Mumbai', preMonsoon: 0.028, postMonsoon: 0.021 },
    { location: 'Delhi', preMonsoon: 0.035, postMonsoon: 0.025 },
    { location: 'Chennai', preMonsoon: 0.022, postMonsoon: 0.016 },
    { location: 'Kolkata', preMonsoon: 0.031, postMonsoon: 0.024 },
    { location: 'Bangalore', preMonsoon: 0.018, postMonsoon: 0.013 },
    { location: 'Hyderabad', preMonsoon: 0.025, postMonsoon: 0.019 },
  ],
};

type DatasetKey = keyof typeof seasonalData;

interface ChartConfig {
  barThickness: number;
  barSpacing: number;
  dataset: DatasetKey;
  showLabels: boolean;
  orientation: 'horizontal' | 'vertical';
  preMonsoonColor: string;
  postMonsoonColor: string;
  autoRange: boolean;
  minValue: number;
  maxValue: number;
}

const defaultConfig: ChartConfig = {
  barThickness: 20,
  barSpacing: 20,
  dataset: 'hmpi',
  showLabels: true,
  orientation: 'vertical',
  preMonsoonColor: '#0ea5e9',
  postMonsoonColor: '#10b981',
  autoRange: true,
  minValue: 0,
  maxValue: 100,
};

const datasetLabels: Record<DatasetKey, { name: string; unit: string }> = {
  hmpi: { name: 'HMPI Score', unit: '' },
  lead: { name: 'Lead (Pb)', unit: 'mg/L' },
  arsenic: { name: 'Arsenic (As)', unit: 'mg/L' },
  cadmium: { name: 'Cadmium (Cd)', unit: 'mg/L' },
  chromium: { name: 'Chromium (Cr)', unit: 'mg/L' },
};

interface SeasonalComparisonChartProps {
  onSave?: (config: ChartConfig) => void;
}

export const SeasonalComparisonChart = ({ onSave }: SeasonalComparisonChartProps) => {
const [config, setConfig] = useState<ChartConfig>(defaultConfig);
  const [showSettings, setShowSettings] = useState(false);

  const data = useMemo(() => seasonalData[config.dataset], [config.dataset]);

  const domain = useMemo(() => {
    if (config.autoRange) {
      const allValues = data.flatMap(d => [d.preMonsoon, d.postMonsoon]);
      const max = Math.max(...allValues);
      return [0, Math.ceil(max * 1.1)];
    }
    return [config.minValue, config.maxValue];
  }, [data, config.autoRange, config.minValue, config.maxValue]);

  const updateConfig = <K extends keyof ChartConfig>(key: K, value: ChartConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const resetConfig = () => setConfig(defaultConfig);

  const handleSave = () => {
    onSave?.(config);
  };

  const formatValue = (value: number) => {
    if (config.dataset === 'hmpi') return value.toFixed(0);
    return value.toFixed(3);
  };

  const currentDatasetInfo = datasetLabels[config.dataset];

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">
              Seasonal Groundwater Comparison
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Pre-Monsoon vs Post-Monsoon {currentDatasetInfo.name} values across monitoring locations
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="gap-2"
          >
            <Settings2 className="h-4 w-4" />
            Customize
            {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <Collapsible open={showSettings} onOpenChange={setShowSettings}>
        <CollapsibleContent>
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Dataset Selection */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">Dataset</Label>
                <Select value={config.dataset} onValueChange={(v) => updateConfig('dataset', v as DatasetKey)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hmpi">HMPI Score</SelectItem>
                    <SelectItem value="lead">Lead (Pb)</SelectItem>
                    <SelectItem value="arsenic">Arsenic (As)</SelectItem>
                    <SelectItem value="cadmium">Cadmium (Cd)</SelectItem>
                    <SelectItem value="chromium">Chromium (Cr)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orientation */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">Orientation</Label>
                <Select value={config.orientation} onValueChange={(v) => updateConfig('orientation', v as 'horizontal' | 'vertical')}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vertical">Vertical Bars</SelectItem>
                    <SelectItem value="horizontal">Horizontal Bars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bar Thickness */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-slate-600">Bar Thickness</Label>
                  <span className="text-xs text-slate-500">{config.barThickness}px</span>
                </div>
                <Slider
                  value={[config.barThickness]}
                  onValueChange={([v]) => updateConfig('barThickness', v)}
                  min={10}
                  max={40}
                  step={2}
                />
              </div>

              {/* Bar Spacing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-slate-600">Bar Spacing</Label>
                  <span className="text-xs text-slate-500">{config.barSpacing}%</span>
                </div>
                <Slider
                  value={[config.barSpacing]}
                  onValueChange={([v]) => updateConfig('barSpacing', v)}
                  min={5}
                  max={50}
                  step={5}
                />
              </div>

              {/* Show Labels Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-xs text-slate-600">Show Value Labels</Label>
                <Switch
                  checked={config.showLabels}
                  onCheckedChange={(v) => updateConfig('showLabels', v)}
                />
              </div>

              {/* Auto Range Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-xs text-slate-600">Auto Range</Label>
                <Switch
                  checked={config.autoRange}
                  onCheckedChange={(v) => updateConfig('autoRange', v)}
                />
              </div>

              {/* Pre-Monsoon Color */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">Pre-Monsoon Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.preMonsoonColor}
                    onChange={(e) => updateConfig('preMonsoonColor', e.target.value)}
                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">{config.preMonsoonColor}</span>
                </div>
              </div>

              {/* Post-Monsoon Color */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">Post-Monsoon Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.postMonsoonColor}
                    onChange={(e) => updateConfig('postMonsoonColor', e.target.value)}
                    className="h-9 w-12 rounded border border-slate-200 cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">{config.postMonsoonColor}</span>
                </div>
              </div>
            </div>

            {/* Manual Range Controls */}
            {!config.autoRange && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Min Value</Label>
                  <input
                    type="number"
                    value={config.minValue}
                    onChange={(e) => updateConfig('minValue', Number(e.target.value))}
                    className="h-9 w-full rounded border border-slate-200 px-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Max Value</Label>
                  <input
                    type="number"
                    value={config.maxValue}
                    onChange={(e) => updateConfig('maxValue', Number(e.target.value))}
                    className="h-9 w-full rounded border border-slate-200 px-3 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={resetConfig} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-2 bg-brand hover:bg-brand-light">
                <Save className="h-4 w-4" />
                Save to Dashboard
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={380}>
          {config.orientation === 'vertical' ? (
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barCategoryGap={`${config.barSpacing}%`}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis 
                dataKey="location" 
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                domain={domain}
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
                tickFormatter={formatValue}
                label={currentDatasetInfo.unit ? { 
                  value: currentDatasetInfo.unit, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#64748b' }
                } : undefined}
              />
              <Tooltip
                formatter={(value: number) => [formatValue(value), '']}
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
              />
              <Bar 
                dataKey="preMonsoon" 
                name="Pre-Monsoon" 
                fill={config.preMonsoonColor}
                radius={[4, 4, 0, 0]}
                maxBarSize={config.barThickness}
              >
                {config.showLabels && (
                  <LabelList 
                    dataKey="preMonsoon" 
                    position="top" 
                    formatter={formatValue}
                    style={{ fontSize: 10, fill: '#64748b' }}
                  />
                )}
              </Bar>
              <Bar 
                dataKey="postMonsoon" 
                name="Post-Monsoon" 
                fill={config.postMonsoonColor}
                radius={[4, 4, 0, 0]}
                maxBarSize={config.barThickness}
              >
                {config.showLabels && (
                  <LabelList 
                    dataKey="postMonsoon" 
                    position="top" 
                    formatter={formatValue}
                    style={{ fontSize: 10, fill: '#64748b' }}
                  />
                )}
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
              barCategoryGap={`${config.barSpacing}%`}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
              <XAxis 
                type="number"
                domain={domain}
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
                tickFormatter={formatValue}
              />
              <YAxis 
                type="category"
                dataKey="location"
                stroke="#64748b" 
                fontSize={12}
                tickLine={false}
                width={70}
              />
              <Tooltip
                formatter={(value: number) => [formatValue(value), '']}
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
              />
              <Bar 
                dataKey="preMonsoon" 
                name="Pre-Monsoon" 
                fill={config.preMonsoonColor}
                radius={[0, 4, 4, 0]}
                maxBarSize={config.barThickness}
              >
                {config.showLabels && (
                  <LabelList 
                    dataKey="preMonsoon" 
                    position="right" 
                    formatter={formatValue}
                    style={{ fontSize: 10, fill: '#64748b' }}
                  />
                )}
              </Bar>
              <Bar 
                dataKey="postMonsoon" 
                name="Post-Monsoon" 
                fill={config.postMonsoonColor}
                radius={[0, 4, 4, 0]}
                maxBarSize={config.barThickness}
              >
                {config.showLabels && (
                  <LabelList 
                    dataKey="postMonsoon" 
                    position="right" 
                    formatter={formatValue}
                    style={{ fontSize: 10, fill: '#64748b' }}
                  />
                )}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>

        {/* Legend Info */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: config.preMonsoonColor }}></div>
            <span>Pre-Monsoon (Dry Season)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: config.postMonsoonColor }}></div>
            <span>Post-Monsoon (Wet Season)</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
          📊 Comparing {currentDatasetInfo.name} levels between pre-monsoon and post-monsoon seasons. 
          Post-monsoon values typically show dilution effects from rainfall.
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalComparisonChart;
