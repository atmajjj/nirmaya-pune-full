import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";

// HMPI trend data over months
const hmpiTrendData = [
  { month: 'Jan', delhi: 72, mumbai: 68, kolkata: 58, chennai: 52, bangalore: 45 },
  { month: 'Feb', delhi: 74, mumbai: 65, kolkata: 61, chennai: 50, bangalore: 43 },
  { month: 'Mar', delhi: 78, mumbai: 70, kolkata: 64, chennai: 55, bangalore: 48 },
  { month: 'Apr', delhi: 82, mumbai: 73, kolkata: 68, chennai: 58, bangalore: 52 },
  { month: 'May', delhi: 85, mumbai: 76, kolkata: 72, chennai: 62, bangalore: 55 },
  { month: 'Jun', delhi: 80, mumbai: 72, kolkata: 65, chennai: 56, bangalore: 50 },
  { month: 'Jul', delhi: 75, mumbai: 68, kolkata: 60, chennai: 52, bangalore: 46 },
  { month: 'Aug', delhi: 70, mumbai: 64, kolkata: 55, chennai: 48, bangalore: 42 },
  { month: 'Sep', delhi: 68, mumbai: 62, kolkata: 53, chennai: 46, bangalore: 40 },
  { month: 'Oct', delhi: 72, mumbai: 66, kolkata: 58, chennai: 50, bangalore: 44 },
  { month: 'Nov', delhi: 76, mumbai: 69, kolkata: 62, chennai: 54, bangalore: 48 },
  { month: 'Dec', delhi: 79, mumbai: 71, kolkata: 65, chennai: 56, bangalore: 51 },
];

type CityKey = 'delhi' | 'mumbai' | 'kolkata' | 'chennai' | 'bangalore';

const cityColors: Record<CityKey, string> = {
  delhi: '#ef4444',
  mumbai: '#f59e0b',
  kolkata: '#10b981',
  chennai: '#0ea5e9',
  bangalore: '#8b5cf6',
};

const cityLabels: Record<CityKey, string> = {
  delhi: 'Delhi',
  mumbai: 'Mumbai',
  kolkata: 'Kolkata',
  chennai: 'Chennai',
  bangalore: 'Bangalore',
};

export const HMPITrendLineChart = () => {
const [showSettings, setShowSettings] = useState(false);
  const [selectedCities, setSelectedCities] = useState<CityKey[]>(['delhi', 'mumbai', 'kolkata']);
  const [showDots, setShowDots] = useState(true);
  const [showThresholds, setShowThresholds] = useState(true);
  const [curveType, setCurveType] = useState<'monotone' | 'linear'>('monotone');

  const toggleCity = (city: CityKey) => {
    if (selectedCities.includes(city)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(c => c !== city));
      }
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  // Calculate trends
  const calculateTrend = (city: CityKey): { direction: 'up' | 'down' | 'stable'; change: number } => {
    const firstValue = hmpiTrendData[0][city];
    const lastValue = hmpiTrendData[hmpiTrendData.length - 1][city];
    const change = ((lastValue - firstValue) / firstValue) * 100;
    
    if (change > 2) return { direction: 'up', change };
    if (change < -2) return { direction: 'down', change };
    return { direction: 'stable', change };
  };

  const resetSettings = () => {
    setSelectedCities(['delhi', 'mumbai', 'kolkata']);
    setShowDots(true);
    setShowThresholds(true);
    setCurveType('monotone');
  };

  const handleSave = () => {
    alert("H M P I  Trend chart saved to dashboard!");
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-slate-800 mb-2">{label} 2024</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {cityLabels[entry.name as CityKey]}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
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
              HMPI Trend Analysis (12 Months)
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Monthly HMPI progression across major cities
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Cities</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(cityColors) as CityKey[]).map((city) => (
                    <button
                      key={city}
                      onClick={() => toggleCity(city)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedCities.includes(city)
                          ? 'text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      style={{
                        backgroundColor: selectedCities.includes(city) ? cityColors[city] : undefined
                      }}
                    >
                      {cityLabels[city]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Line Style</Label>
                <Select value={curveType} onValueChange={(v) => setCurveType(v as 'monotone' | 'linear')}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monotone">Smooth Curve</SelectItem>
                    <SelectItem value="linear">Straight Lines</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Data Points</Label>
                <Switch checked={showDots} onCheckedChange={setShowDots} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Thresholds</Label>
                <Switch checked={showThresholds} onCheckedChange={setShowThresholds} />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart 
            data={hmpiTrendData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              domain={[30, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => <span className="text-sm text-slate-600">{cityLabels[value as CityKey]}</span>}
            />
            
            {showThresholds && (
              <>
                <ReferenceLine y={50} stroke="#10b981" strokeDasharray="5 5" strokeOpacity={0.6} />
                <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="5 5" strokeOpacity={0.6} />
              </>
            )}
            
            {selectedCities.map((city) => (
              <Line
                key={city}
                type={curveType}
                dataKey={city}
                stroke={cityColors[city]}
                strokeWidth={2}
                dot={showDots ? { fill: cityColors[city], strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Trend indicators */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {selectedCities.map((city) => {
            const trend = calculateTrend(city);
            return (
              <div 
                key={city} 
                className="p-3 rounded-lg border"
                style={{ 
                  backgroundColor: `${cityColors[city]}10`,
                  borderColor: `${cityColors[city]}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: cityColors[city] }}>
                    {cityLabels[city]}
                  </span>
                  {trend.direction === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : trend.direction === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </div>
                <p className={`text-xs mt-1 ${
                  trend.direction === 'up' ? 'text-red-600' : 
                  trend.direction === 'down' ? 'text-green-600' : 'text-slate-500'
                }`}>
                  {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}% YTD
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HMPITrendLineChart;
