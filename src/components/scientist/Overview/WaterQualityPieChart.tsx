import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

// Water quality category data
const qualityData = [
  { name: 'Excellent', value: 42, color: '#10b981', description: 'HMPI < 25' },
  { name: 'Good', value: 85, color: '#0ea5e9', description: 'HMPI 25-50' },
  { name: 'Poor', value: 68, color: '#f59e0b', description: 'HMPI 50-75' },
  { name: 'Very Poor', value: 35, color: '#f97316', description: 'HMPI 75-100' },
  { name: 'Unsuitable', value: 17, color: '#ef4444', description: 'HMPI > 100' },
];

const RADIAN = Math.PI / 180;

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

export const WaterQualityPieChart = () => {
const [showSettings, setShowSettings] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [innerRadius, setInnerRadius] = useState(60);
  const [outerRadius, setOuterRadius] = useState(100);

  const total = qualityData.reduce((sum, item) => sum + item.value, 0);

  const resetSettings = () => {
    setShowLabels(true);
    setShowLegend(true);
    setInnerRadius(60);
    setOuterRadius(100);
  };

  const handleSave = () => {
    alert("Water Quality pie chart saved to dashboard!");
  };

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomLabelProps) => {
    if (!showLabels || percent < 0.05) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof qualityData[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
            <p className="font-semibold text-slate-800">{data.name}</p>
          </div>
          <p className="text-sm text-slate-600">Sites: <span className="font-bold">{data.value}</span></p>
          <p className="text-sm text-slate-600">
            Percentage: <span className="font-bold">{((data.value / total) * 100).toFixed(1)}%</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = () => {
    return (
      <div className="grid grid-cols-1 gap-2 mt-4">
        {qualityData.map((entry) => (
          <div 
            key={entry.name} 
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-sm font-medium text-slate-700">{entry.name}</span>
              <span className="text-xs text-slate-400">({entry.description})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{entry.value} sites</span>
              <span className="text-sm font-semibold text-slate-800">
                {((entry.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm h-full">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">
              Water Quality Distribution
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Site classification by HMPI categories
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
              <h4 className="font-medium text-slate-700">Chart Settings</h4>
              <Button variant="ghost" size="sm" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show % Labels</Label>
                <Switch checked={showLabels} onCheckedChange={setShowLabels} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Legend</Label>
                <Switch checked={showLegend} onCheckedChange={setShowLegend} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Inner Radius: {innerRadius}px</Label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={innerRadius}
                  onChange={(e) => setInnerRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Outer Radius: {outerRadius}px</Label>
                <input
                  type="range"
                  min="60"
                  max="120"
                  value={outerRadius}
                  onChange={(e) => setOuterRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div style={{ width: 240, height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive
                  animationDuration={800}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {showLegend && (
            <div className="flex-1 w-full">
              {renderLegend()}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Total Monitoring Sites: <span className="font-bold text-slate-800">{total}</span>
            </span>
            <span className="text-sm text-slate-600">
              Safe Sites (Excellent + Good): 
              <span className="font-bold text-emerald-600 ml-1">
                {qualityData[0].value + qualityData[1].value} ({(((qualityData[0].value + qualityData[1].value) / total) * 100).toFixed(1)}%)
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityPieChart;
