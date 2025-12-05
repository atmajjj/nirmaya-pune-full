import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine,
  LabelList
} from 'recharts';
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface CityHMPIData {
  city: string;
  value: number;
}

interface HMPIBarChartProps {
  data?: CityHMPIData[];
}

// Default data for major industrial cities
const defaultCityData: CityHMPIData[] = [
  { city: "Kanpur", value: 87 },
  { city: "Ludhiana", value: 82 },
  { city: "Ahmedabad", value: 76 },
  { city: "Surat", value: 71 },
  { city: "Jamshedpur", value: 68 },
  { city: "Coimbatore", value: 58 },
  { city: "Nagpur", value: 52 },
  { city: "Pune", value: 45 },
  { city: "Hyderabad", value: 38 },
  { city: "Bangalore", value: 32 },
  { city: "Chennai", value: 28 },
  { city: "Mysore", value: 22 },
];

// Color functions for HMPI values
const getHMPIColor = (value: number): string => {
  if (value <= 25) return "#0ea5e9"; // Sky blue - Safe
  if (value <= 50) return "#06b6d4"; // Cyan/Teal - Moderate
  if (value <= 75) return "#f59e0b"; // Amber - High
  return "#ef4444"; // Red - Critical
};

const getGradientId = (value: number): string => {
  if (value <= 25) return "url(#hmpiGradientSafe)";
  if (value <= 50) return "url(#hmpiGradientModerate)";
  if (value <= 75) return "url(#hmpiGradientHigh)";
  return "url(#hmpiGradientCritical)";
};

type ColorStyle = "gradient" | "single" | "threshold";
type SortOrder = "desc" | "asc";

export const HMPIBarChart = ({ data = defaultCityData }: HMPIBarChartProps) => {
// Customization state
  const [showSettings, setShowSettings] = useState(false);
  const [barThickness, setBarThickness] = useState(24);
  const [barSpacing, setBarSpacing] = useState(8);
  const [colorStyle, setColorStyle] = useState<ColorStyle>("gradient");
  const [showLabels, setShowLabels] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showThresholds, setShowThresholds] = useState(true);
  const [singleColor, setSingleColor] = useState("#0ea5e9");

  // Process and sort data
  const chartData = useMemo(() => {
    const sorted = [...data].sort((a, b) => 
      sortOrder === "desc" ? b.value - a.value : a.value - b.value
    );
    return sorted;
  }, [data, sortOrder]);

  // Calculate dynamic height based on data and bar settings
  const chartHeight = useMemo(() => {
    const minHeight = 400;
    const calculatedHeight = chartData.length * (barThickness + barSpacing) + 80;
    return Math.max(minHeight, calculatedHeight);
  }, [chartData.length, barThickness, barSpacing]);

  // Get fill color/gradient based on style
  const getBarFill = (value: number): string => {
    switch (colorStyle) {
      case "gradient":
        return getGradientId(value);
      case "threshold":
        return getHMPIColor(value);
      case "single":
      default:
        return singleColor;
    }
  };

  // Reset to defaults
  const resetSettings = () => {
    setBarThickness(24);
    setBarSpacing(8);
    setColorStyle("gradient");
    setShowLabels(true);
    setSortOrder("desc");
    setShowThresholds(true);
    setSingleColor("#0ea5e9");
  };

  // Save configuration
  const handleSave = () => {
    const config = {
      barThickness,
      barSpacing,
      colorStyle,
      showLabels,
      sortOrder,
      showThresholds,
      singleColor,
      savedAt: new Date().toISOString()
    };
    // Save to localStorage
    try {
      localStorage.setItem('hmpi_chart_config', JSON.stringify(config));
    } catch {
      // Silently fail
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: CityHMPIData }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const riskLevel = data.value <= 25 ? "Safe" : data.value <= 50 ? "Moderate" : data.value <= 75 ? "High" : "Critical";
      const riskColor = getHMPIColor(data.value);
      
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-slate-800">{data.city}</p>
          <p className="text-sm text-slate-600">HMPI: <span className="font-bold">{data.value}</span></p>
          <p className="text-sm" style={{ color: riskColor }}>
            Risk Level: <span className="font-semibold">{riskLevel}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">
              "Heavy Metal Pollution Index"
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              "HMPI values across monitoring locations"
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
              Save
            </Button>
          </div>
        </div>

        {/* Customization Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-slate-700">Chart Customization</h4>
              <Button variant="ghost" size="sm" onClick={resetSettings} className="text-slate-500 hover:text-slate-700">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Bar Thickness */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Bar Thickness: {barThickness}px</Label>
                <Slider
                  value={[barThickness]}
                  onValueChange={(v) => setBarThickness(v[0])}
                  min={12}
                  max={40}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Bar Spacing */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Bar Spacing: {barSpacing}px</Label>
                <Slider
                  value={[barSpacing]}
                  onValueChange={(v) => setBarSpacing(v[0])}
                  min={2}
                  max={20}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Color Style */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Color Style</Label>
                <Select value={colorStyle} onValueChange={(v) => setColorStyle(v as ColorStyle)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gradient">Gradient by HMPI</SelectItem>
                    <SelectItem value="threshold">Solid by Threshold</SelectItem>
                    <SelectItem value="single">Single Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Single Color Picker (only shown when single color mode) */}
              {colorStyle === "single" && (
                <div className="space-y-2">
                  <Label className="text-sm text-slate-600">Bar Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={singleColor}
                      onChange={(e) => setSingleColor(e.target.value)}
                      className="w-10 h-10 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="text-sm text-slate-500">{singleColor}</span>
                  </div>
                </div>
              )}

              {/* Sort Order */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Sort Order</Label>
                <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Highest First</SelectItem>
                    <SelectItem value="asc">Lowest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Show Labels Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Value Labels</Label>
                <Switch
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                />
              </div>

              {/* Show Thresholds Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Threshold Lines</Label>
                <Switch
                  checked={showThresholds}
                  onCheckedChange={setShowThresholds}
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
          <span className="text-sm font-medium text-slate-600">Risk Levels:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500"></div>
            <span className="text-xs text-slate-600">Safe (0-25)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-xs text-slate-600">Moderate (26-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">High (51-75)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-slate-600">Critical (76-100)</span>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart 
            data={chartData} 
            layout="vertical" 
            margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
            barCategoryGap={barSpacing}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="hmpiGradientSafe" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="hmpiGradientModerate" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#22d3d1" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="hmpiGradientHigh" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="hmpiGradientCritical" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              strokeOpacity={0.5}
              horizontal={false}
            />
            
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            
            <YAxis 
              dataKey="city" 
              type="category" 
              width={100} 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
            
            {/* Threshold Reference Lines */}
            {showThresholds && (
              <>
                <ReferenceLine x={25} stroke="#0ea5e9" strokeDasharray="5 5" strokeOpacity={0.6}>
                  <text x={25} y={15} fill="#0ea5e9" fontSize={10}>25</text>
                </ReferenceLine>
                <ReferenceLine x={50} stroke="#06b6d4" strokeDasharray="5 5" strokeOpacity={0.6}>
                  <text x={50} y={15} fill="#06b6d4" fontSize={10}>50</text>
                </ReferenceLine>
                <ReferenceLine x={75} stroke="#f59e0b" strokeDasharray="5 5" strokeOpacity={0.6}>
                  <text x={75} y={15} fill="#f59e0b" fontSize={10}>75</text>
                </ReferenceLine>
                <ReferenceLine x={100} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.6}>
                  <text x={100} y={15} fill="#ef4444" fontSize={10}>100</text>
                </ReferenceLine>
              </>
            )}
            
            <Bar 
              dataKey="value" 
              isAnimationActive 
              animationDuration={900}
              radius={[0, 6, 6, 0]}
              barSize={barThickness}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarFill(entry.value)}
                />
              ))}
              {showLabels && (
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  fill="#64748b"
                  fontSize={11}
                  fontWeight={600}
                  formatter={(value: number) => `${value}`}
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Footer Info */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
          <span>
            "Hover over bars for detailed information"
          </span>
          <span className="text-xs text-slate-400">
            Data from {chartData.length} industrial cities • Scale 0-100
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HMPIBarChart;
