import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Settings2,
  Trash2,
  EyeOff,
  Maximize2,
  TrendingUp,
  BarChart3,
  PieChart,
  Radar,
  Grid3x3,
  LineChart,
  BoxSelect,
  Circle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SavedVisualization, updateVisualizationVisibility, deleteVisualizationFromDashboard } from './dashboardTypes';

// Sample data for rendering
const sampleLineData = [
  { month: 'Jan', value1: 0.8, value2: 1.2, value3: 0.9 },
  { month: 'Feb', value1: 1.1, value2: 1.0, value3: 1.3 },
  { month: 'Mar', value1: 0.9, value2: 1.4, value3: 1.1 },
  { month: 'Apr', value1: 1.3, value2: 1.1, value3: 0.8 },
  { month: 'May', value1: 1.0, value2: 0.9, value3: 1.2 },
  { month: 'Jun', value1: 1.2, value2: 1.3, value3: 1.0 },
];

const sampleBarData = [
  { name: 'Pb', value: 0.045 },
  { name: 'As', value: 0.012 },
  { name: 'Cd', value: 0.008 },
  { name: 'Cr', value: 0.035 },
  { name: 'Fe', value: 0.28 },
  { name: 'Mn', value: 0.15 },
];

const samplePieData = [
  { name: 'Safe', value: 45, color: '#10b981' },
  { name: 'Moderate', value: 30, color: '#f59e0b' },
  { name: 'Critical', value: 25, color: '#ef4444' },
];

const sampleRadarData = [
  { subject: 'Pb', A: 80, B: 60, fullMark: 100 },
  { subject: 'As', A: 75, B: 85, fullMark: 100 },
  { subject: 'Cd', A: 60, B: 70, fullMark: 100 },
  { subject: 'Cr', A: 85, B: 55, fullMark: 100 },
  { subject: 'Fe', A: 70, B: 90, fullMark: 100 },
  { subject: 'Mn', A: 65, B: 75, fullMark: 100 },
];

interface SavedVisualizationCardProps {
  visualization: SavedVisualization;
  onUpdate: () => void;
  onEdit?: (viz: SavedVisualization) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  line: <LineChart className="h-4 w-4" />,
  bar: <BarChart3 className="h-4 w-4" />,
  pie: <PieChart className="h-4 w-4" />,
  radar: <Radar className="h-4 w-4" />,
  scatter: <Circle className="h-4 w-4" />,
  heatmap: <Grid3x3 className="h-4 w-4" />,
  histogram: <BarChart3 className="h-4 w-4" />,
  boxplot: <BoxSelect className="h-4 w-4" />,
  bubble: <Circle className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
};

const SavedVisualizationCard: React.FC<SavedVisualizationCardProps> = ({
  visualization,
  onUpdate,
  onEdit,
}) => {
  const handleHide = () => {
    updateVisualizationVisibility(visualization.id, false);
    onUpdate();
  };

  const handleDelete = () => {
    deleteVisualizationFromDashboard(visualization.id);
    onUpdate();
  };

  const renderChart = () => {
    const colors = visualization.config.universal?.colors || ['#0A3D62', '#0ea5e9', '#10b981'];
    
    switch (visualization.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={sampleLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip />
              <Line type="monotone" dataKey="value1" stroke={colors[0]} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="value2" stroke={colors[1]} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="value3" stroke={colors[2]} strokeWidth={2} dot={{ r: 3 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip />
              <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={samplePieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {samplePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={sampleRadarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 8 }} />
              <RechartsRadar name="Sample A" dataKey="A" stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} />
              <RechartsRadar name="Sample B" dataKey="B" stroke={colors[1]} fill={colors[1]} fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="X" stroke="#64748b" fontSize={10} />
              <YAxis type="number" dataKey="y" name="Y" stroke="#64748b" fontSize={10} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="Data"
                data={[
                  { x: 10, y: 30 }, { x: 20, y: 50 }, { x: 30, y: 40 },
                  { x: 40, y: 70 }, { x: 50, y: 60 }, { x: 60, y: 80 },
                ]}
                fill={colors[0]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="h-[200px] bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="p-3 rounded-full bg-slate-100 inline-block mb-2">
                {iconMap[visualization.type] || <BarChart3 className="h-6 w-6 text-slate-400" />}
              </div>
              <p className="text-sm text-slate-500">{visualization.type} chart</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200">
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0A3D62]/10 text-[#0A3D62]">
              {iconMap[visualization.type] || <BarChart3 className="h-4 w-4" />}
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-slate-800">
                {visualization.title}
              </CardTitle>
              {visualization.subtitle && (
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {visualization.subtitle}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit?.(visualization)}>
                <Settings2 className="h-4 w-4 mr-2" />
                Edit Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Maximize2 className="h-4 w-4 mr-2" />
                Expand View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleHide}>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide from Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs bg-[#0A3D62]/10 text-[#0A3D62]">
            {visualization.type}
          </Badge>
          <span className="text-xs text-slate-400">
            Added {new Date(visualization.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default SavedVisualizationCard;
