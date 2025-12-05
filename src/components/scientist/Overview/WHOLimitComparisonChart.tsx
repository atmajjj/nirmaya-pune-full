import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  LabelList
} from 'recharts';
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw, AlertTriangle } from "lucide-react";

// WHO Drinking Water Standards (mg/L)
const whoLimits: Record<string, number> = {
  Pb: 0.01,
  As: 0.01,
  Cd: 0.003,
  Cr: 0.05,
  Fe: 0.3,
  Mn: 0.1,
};

// Sample measured values
const sampleData = [
  { metal: 'Pb', value: 0.015, limit: 0.01, label: 'Lead' },
  { metal: 'As', value: 0.008, limit: 0.01, label: 'Arsenic' },
  { metal: 'Cd', value: 0.004, limit: 0.003, label: 'Cadmium' },
  { metal: 'Cr', value: 0.035, limit: 0.05, label: 'Chromium' },
  { metal: 'Fe', value: 0.42, limit: 0.3, label: 'Iron' },
  { metal: 'Mn', value: 0.08, limit: 0.1, label: 'Manganese' },
];

// Normalize values as percentage of limit
const getNormalizedData = () => {
  return sampleData.map(item => ({
    ...item,
    percentage: (item.value / item.limit) * 100,
    exceedsLimit: item.value > item.limit,
  }));
};

const getBarColor = (percentage: number): string => {
  if (percentage <= 50) return '#10b981'; // Green - Safe
  if (percentage <= 80) return '#f59e0b'; // Amber - Caution
  if (percentage <= 100) return '#f97316'; // Orange - Warning
  return '#ef4444'; // Red - Exceeds limit
};

export const WHOLimitComparisonChart = () => {
const [showSettings, setShowSettings] = useState(false);
  const [showLimitLine, setShowLimitLine] = useState(true);
  const [showValues, setShowValues] = useState(true);
  const [showPercentage, setShowPercentage] = useState(true);

  const normalizedData = getNormalizedData();
  const exceedingCount = normalizedData.filter(d => d.exceedsLimit).length;

  const resetSettings = () => {
    setShowLimitLine(true);
    setShowValues(true);
    setShowPercentage(true);
  };

  const handleSave = () => {
    alert("W H O  Limit comparison chart saved to dashboard!");
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof normalizedData[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-slate-800">{data.label} ({data.metal})</p>
          <p className="text-sm text-slate-600">
            Measured: <span className="font-bold">{data.value} mg/L</span>
          </p>
          <p className="text-sm text-slate-600">
            WHO Limit: <span className="font-bold">{data.limit} mg/L</span>
          </p>
          <p className={`text-sm font-semibold ${data.exceedsLimit ? 'text-red-600' : 'text-green-600'}`}>
            {data.percentage.toFixed(0)}% of limit
            {data.exceedsLimit && ' ⚠️ EXCEEDS'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm h-full">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold flex items-center gap-2">
              WHO Safe Limit Comparison
              {exceedingCount > 0 && (
                <span className="flex items-center gap-1 text-xs font-normal text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <AlertTriangle className="h-3 w-3" />
                  {exceedingCount} exceeding
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Metal concentrations vs WHO drinking water standards
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4" />
              {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="flex items-center gap-2 bg-brand hover:bg-brand-light"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-700">Display Options</h4>
              <Button variant="ghost" size="sm" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show 100% Limit Line</Label>
                <Switch checked={showLimitLine} onCheckedChange={setShowLimitLine} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Actual Values</Label>
                <Switch checked={showValues} onCheckedChange={setShowValues} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Percentage</Label>
                <Switch checked={showPercentage} onCheckedChange={setShowPercentage} />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
          <span className="text-sm font-medium text-slate-600">Status:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600">Safe (≤50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">Caution (51-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-slate-600">Warning (81-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-slate-600">Exceeds (&gt;100%)</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart 
            data={normalizedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
            <XAxis 
              dataKey="metal" 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              domain={[0, 'auto']}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {showLimitLine && (
              <ReferenceLine 
                y={100} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                label={{ 
                  value: 'WHO Limit (100%)', 
                  position: 'right', 
                  fill: '#ef4444',
                  fontSize: 11
                }}
              />
            )}
            
            <Bar 
              dataKey="percentage" 
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            >
              {normalizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
              ))}
              {showPercentage && (
                <LabelList 
                  dataKey="percentage" 
                  position="top" 
                  fill="#64748b"
                  fontSize={11}
                  formatter={(value: number) => `${value.toFixed(0)}%`}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 p-3 rounded-lg text-center border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-700">
              {normalizedData.filter(d => d.percentage <= 80).length}
            </p>
            <p className="text-xs text-emerald-600">Within Safe Range</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-center border border-amber-200">
            <p className="text-2xl font-bold text-amber-700">
              {normalizedData.filter(d => d.percentage > 80 && d.percentage <= 100).length}
            </p>
            <p className="text-xs text-amber-600">Near Limit</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
            <p className="text-2xl font-bold text-red-700">
              {normalizedData.filter(d => d.percentage > 100).length}
            </p>
            <p className="text-xs text-red-600">Exceeds Limit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WHOLimitComparisonChart;
