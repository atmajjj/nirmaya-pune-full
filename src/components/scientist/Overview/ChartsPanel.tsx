import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { CityHMPI, Contaminant } from './types';

interface ChartsPanelProps {
  cityData: CityHMPI[];
  contaminants: Contaminant[];
  showHMPIChart?: boolean;
  showContaminantChart?: boolean;
}

export const ChartsPanel = ({ 
  cityData, 
  contaminants,
  showHMPIChart = true,
  showContaminantChart = true
}: ChartsPanelProps) => {
const barData = useMemo(() => cityData.map((d, idx) => ({ name: d.city, value: d.value, idx })), [cityData]);

  // If both charts are hidden, don't render anything
  if (!showHMPIChart && !showContaminantChart) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 ${showHMPIChart && showContaminantChart ? 'lg:grid-cols-2' : ''} gap-6`}>
      {showHMPIChart && (
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg font-semibold">Heavy Metal Pollution Index</CardTitle>
            <p className="text-sm text-slate-500 mt-1">HMPI values across monitoring locations</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} />
                <YAxis dataKey="name" type="category" width={80} stroke="#64748b" fontSize={12} />
                <Tooltip 
                  formatter={(value: string | number) => [`${value}%`, 'HMPI']} 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="value" isAnimationActive animationDuration={900} radius={[0, 4, 4, 0]} fillOpacity={1}>
                  {barData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-3 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
              Hover over bars for detailed information
            </div>
          </CardContent>
        </Card>
      )}

      {showContaminantChart && (
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 text-lg font-semibold">Metal Distribution</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Percentage breakdown by contaminant</p>
          </CardHeader>
          <CardContent className="p-6">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={contaminants}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    isAnimationActive
                    animationDuration={800}
                  >
                    {contaminants.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {contaminants.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">{c.sites} sites</span>
                    <span className="text-sm font-semibold text-slate-800">{c.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
