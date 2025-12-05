import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Info, Settings2, LayoutDashboard } from 'lucide-react';
import { VisualizationType } from './types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  sampleHMPITrendData,
  sampleContaminantData,
  sampleRadarData,
  sampleQualityData,
  sampleScatterData,
  sampleHistogramData,
  sampleBubbleData
} from './visualizationData';

interface VisualizationPreviewProps {
  visualization: VisualizationType;
  onBack: () => void;
  onAdd: () => void;
  onCustomize?: () => void;
  iconMap: Record<string, React.ReactNode>;
  categoryColors: Record<string, string>;
}

const chartColors = {
  primary: '#0A3D62',
  secondary: '#0ea5e9',
  tertiary: '#6EDFF6',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  gradient1: '#0ea5e9',
  gradient2: '#06b6d4'
};

const VisualizationPreview: React.FC<VisualizationPreviewProps> = ({
  visualization,
  onBack,
  onAdd,
  onCustomize,
  iconMap,
  categoryColors
}) => {
  const renderChartPreview = () => {
    switch (visualization.id) {
      case 'hmpi-trend-line':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={sampleHMPITrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="location1" stroke={chartColors.primary} strokeWidth={2} dot={{ fill: chartColors.primary }} name="Location 1" />
              <Line type="monotone" dataKey="location2" stroke={chartColors.secondary} strokeWidth={2} dot={{ fill: chartColors.secondary }} name="Location 2" />
              <Line type="monotone" dataKey="location3" stroke={chartColors.accent} strokeWidth={2} dot={{ fill: chartColors.accent }} name="Location 3" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'contaminant-bar':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sampleContaminantData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={40} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`${value} mg/L`, 'Concentration']}
              />
              <Bar dataKey="value" fill={chartColors.secondary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'multi-metal-radar':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={sampleRadarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metal" stroke="#64748b" fontSize={12} />
              <PolarRadiusAxis stroke="#64748b" fontSize={10} />
              <Radar name="Sample A" dataKey="A" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.3} />
              <Radar name="Sample B" dataKey="B" stroke={chartColors.secondary} fill={chartColors.secondary} fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'spatial-heatmap':
        return (
          <div className="h-[280px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              {/* Simulated heatmap background */}
              <div className="absolute top-10 left-20 w-24 h-24 bg-green-400 rounded-full blur-xl"></div>
              <div className="absolute top-20 right-32 w-32 h-32 bg-yellow-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-16 left-40 w-20 h-20 bg-red-400 rounded-full blur-xl"></div>
              <div className="absolute bottom-24 right-20 w-28 h-28 bg-orange-400 rounded-full blur-xl"></div>
            </div>
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                {iconMap['Map']}
              </div>
              <p className="text-slate-600 font-medium">Geographic Heatmap Preview</p>
              <p className="text-sm text-slate-500">Interactive map with contamination zones</p>
            </div>
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-2 shadow-md">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Safe</span>
                <div className="w-3 h-3 bg-yellow-500 rounded ml-2"></div>
                <span>Moderate</span>
                <div className="w-3 h-3 bg-red-500 rounded ml-2"></div>
                <span>Unsafe</span>
              </div>
            </div>
          </div>
        );

      case 'safe-limit-comparison':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sampleContaminantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="value" fill={chartColors.secondary} name="Sample Value" radius={[4, 4, 0, 0]} />
              <Bar dataKey="limit" fill={chartColors.danger} name="WHO Limit" radius={[4, 4, 0, 0]} fillOpacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'hmpi-histogram':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sampleHistogramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill={chartColors.primary} radius={[4, 4, 0, 0]}>
                {sampleHistogramData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index < 2 ? chartColors.accent : index < 4 ? chartColors.warning : chartColors.danger} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'correlation-heatmap':
        return (
          <div className="h-[280px] bg-white rounded-lg p-4">
            <div className="grid grid-cols-6 gap-1 h-full">
              {['', 'Pb', 'As', 'Cd', 'Cr', 'Fe'].map((header, i) => (
                <div key={`header-${i}`} className="flex items-center justify-center text-xs font-medium text-slate-600">
                  {header}
                </div>
              ))}
              {['Pb', 'As', 'Cd', 'Cr', 'Fe'].map((row, rowIndex) => (
                <React.Fragment key={`row-${rowIndex}`}>
                  <div className="flex items-center justify-center text-xs font-medium text-slate-600">{row}</div>
                  {[1, 0.85, 0.72, 0.45, 0.30].slice(0, 5).map((val, colIndex) => {
                    const adjustedVal = rowIndex === colIndex ? 1 : Math.abs(Math.sin((rowIndex + colIndex) * 0.5)) * 0.7 + 0.2;
                    const colorIntensity = Math.floor(adjustedVal * 255);
                    return (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="rounded-sm flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: `rgba(10, 61, 98, ${adjustedVal})`,
                          color: adjustedVal > 0.5 ? 'white' : '#334155'
                        }}
                      >
                        {adjustedVal.toFixed(2)}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'contaminant-boxplots':
        return (
          <div className="h-[280px] bg-white rounded-lg p-4 flex items-end justify-around gap-4">
            {['Pb', 'As', 'Cd', 'Cr', 'Fe', 'Mn'].map((metal, index) => {
              const colors = [chartColors.primary, chartColors.secondary, chartColors.accent, chartColors.warning, '#8b5cf6', '#ec4899'];
              return (
                <div key={metal} className="flex flex-col items-center flex-1">
                  {/* Boxplot */}
                  <div className="relative w-full flex justify-center mb-2" style={{ height: '180px' }}>
                    {/* Whisker line */}
                    <div className="absolute w-0.5 bg-slate-400" style={{ 
                      height: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}></div>
                    {/* Top whisker cap */}
                    <div className="absolute w-4 h-0.5 bg-slate-400" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}></div>
                    {/* Bottom whisker cap */}
                    <div className="absolute w-4 h-0.5 bg-slate-400" style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }}></div>
                    {/* Box */}
                    <div 
                      className="absolute w-10 rounded"
                      style={{ 
                        backgroundColor: colors[index],
                        top: '25%',
                        height: '50%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0.8
                      }}
                    >
                      {/* Median line */}
                      <div className="absolute w-full h-0.5 bg-white" style={{ top: '50%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{metal}</span>
                </div>
              );
            })}
          </div>
        );

      case 'quality-pie':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sampleQualityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {sampleQualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'time-series-multiline':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={sampleHMPITrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="location1" stroke="#ef4444" strokeWidth={2} name="Pb" dot={false} />
              <Line type="monotone" dataKey="location2" stroke="#f59e0b" strokeWidth={2} name="As" dot={false} />
              <Line type="monotone" dataKey="location3" stroke="#10b981" strokeWidth={2} name="Cd" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'depth-scatter':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="depth" name="Depth" unit="m" stroke="#64748b" fontSize={12} />
              <YAxis type="number" dataKey="hmpi" name="HMPI" stroke="#64748b" fontSize={12} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Scatter name="Wells" data={sampleScatterData} fill={chartColors.primary}>
                {sampleScatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.hmpi > 1 ? chartColors.danger : chartColors.accent} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'sampling-bubble':
        return (
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="Longitude" stroke="#64748b" fontSize={12} domain={[0, 500]} />
              <YAxis type="number" dataKey="y" name="Latitude" stroke="#64748b" fontSize={12} domain={[0, 400]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value: string | number, name: string) => {
                  if (name === 'z') return [`${value}`, 'Contamination Level'];
                  return [value, name];
                }}
              />
              <Scatter name="Sites" data={sampleBubbleData} fill={chartColors.secondary}>
                {sampleBubbleData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.z > 100 ? chartColors.danger : entry.z > 60 ? chartColors.warning : chartColors.accent}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="h-[280px] bg-slate-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-500">Preview not available</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-3 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to all visualizations</span>
        </button>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${categoryColors[visualization.category]} shadow-lg`}>
            {iconMap[visualization.icon]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{visualization.name}</h2>
            <p className="text-slate-300 text-sm mt-1">{visualization.description}</p>
          </div>
        </div>
      </div>

      {/* Chart Preview */}
      <div className="flex-1 px-6 py-4 overflow-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-[#0A3D62]" />
            <span className="text-sm font-medium text-slate-700">Preview with Sample Data</span>
          </div>
          {renderChartPreview()}
        </div>

        {/* Features & Tags */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Key Features</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D62]"></div>
                Interactive tooltips
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D62]"></div>
                Responsive design
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D62]"></div>
                Export options
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {visualization.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white text-slate-600">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={onCustomize || onAdd}
          className="border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62]/10 gap-2"
        >
          <Settings2 className="h-4 w-4" />
          Customize
        </Button>
        <Button
          onClick={onAdd}
          className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white gap-2"
        >
          <LayoutDashboard className="h-4 w-4" />
          Add to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VisualizationPreview;
