import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  Legend,
  Tooltip
} from 'recharts';
import { Settings2, Save, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

// Combined data for radar chart with all zones
const radarData = [
  { metal: 'Pb', industrial: 85, residential: 35, agricultural: 48, fullMark: 100 },
  { metal: 'As', industrial: 72, residential: 42, agricultural: 55, fullMark: 100 },
  { metal: 'Cd', industrial: 65, residential: 28, agricultural: 42, fullMark: 100 },
  { metal: 'Cr', industrial: 78, residential: 38, agricultural: 35, fullMark: 100 },
  { metal: 'Fe', industrial: 45, residential: 52, agricultural: 68, fullMark: 100 },
  { metal: 'Mn', industrial: 58, residential: 45, agricultural: 62, fullMark: 100 },
];

type ZoneType = 'industrial' | 'residential' | 'agricultural';

const zoneColors: Record<ZoneType, string> = {
  industrial: '#ef4444',
  residential: '#0ea5e9',
  agricultural: '#10b981',
};

const zoneLabels: Record<ZoneType, string> = {
  industrial: 'Industrial Zone',
  residential: 'Residential Zone',
  agricultural: 'Agricultural Zone',
};

export const ContaminantRadarChart = () => {
const [showSettings, setShowSettings] = useState(false);
  const [selectedZones, setSelectedZones] = useState<ZoneType[]>(['industrial', 'residential']);
  const [showDots, setShowDots] = useState(true);
  const [fillOpacity, setFillOpacity] = useState(0.3);

  const toggleZone = (zone: ZoneType) => {
    if (selectedZones.includes(zone)) {
      if (selectedZones.length > 1) {
        setSelectedZones(selectedZones.filter(z => z !== zone));
      }
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const resetSettings = () => {
    setSelectedZones(['industrial', 'residential']);
    setShowDots(true);
    setFillOpacity(0.3);
  };

  const handleSave = () => {
    alert("Radar chart configuration saved to dashboard!");
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-slate-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {zoneLabels[entry.name as ZoneType] || entry.name}: <span className="font-bold">{entry.value}%</span>
            </p>
          ))}
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
            <CardTitle className="text-slate-800 text-lg font-semibold">
              Multi-Metal Contamination Profile
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Compare metal contamination across different zone types
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Zone Selection</Label>
                <div className="flex flex-col gap-2">
                  {(['industrial', 'residential', 'agricultural'] as ZoneType[]).map((zone) => (
                    <div key={zone} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedZones.includes(zone)}
                        onChange={() => toggleZone(zone)}
                        className="rounded"
                      />
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zoneColors[zone] }} />
                      <span className="text-sm text-slate-600">{zoneLabels[zone]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-600">Show Data Points</Label>
                <Switch checked={showDots} onCheckedChange={setShowDots} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">Fill Opacity: {Math.round(fillOpacity * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fillOpacity * 100}
                  onChange={(e) => setFillOpacity(Number(e.target.value) / 100)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="metal" 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
            />
            
            {selectedZones.includes('industrial') && (
              <Radar
                name="industrial"
                dataKey="industrial"
                stroke={zoneColors.industrial}
                fill={zoneColors.industrial}
                fillOpacity={fillOpacity}
                dot={showDots}
              />
            )}
            
            {selectedZones.includes('residential') && (
              <Radar
                name="residential"
                dataKey="residential"
                stroke={zoneColors.residential}
                fill={zoneColors.residential}
                fillOpacity={fillOpacity}
                dot={showDots}
              />
            )}
            
            {selectedZones.includes('agricultural') && (
              <Radar
                name="agricultural"
                dataKey="agricultural"
                stroke={zoneColors.agricultural}
                fill={zoneColors.agricultural}
                fillOpacity={fillOpacity}
                dot={showDots}
              />
            )}
            
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-sm text-slate-600">{zoneLabels[value as ZoneType]}</span>}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>

        <div className="mt-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
          Values represent normalized contamination levels (0-100 scale)
        </div>
      </CardContent>
    </Card>
  );
};

export default ContaminantRadarChart;
