import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { SystemStats } from '@/types/admin.types';

interface CalculationsByIndexChartProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const CalculationsByIndexChart = ({ stats, loading }: CalculationsByIndexChartProps) => {
  if (loading || !stats) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Calculations by Index</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    { name: 'HPI', value: stats.calculations.by_index.hpi, fullName: 'Health Pollution Index' },
    { name: 'MI', value: stats.calculations.by_index.mi, fullName: 'Metal Index' },
    { name: 'CDEG', value: stats.calculations.by_index.cdeg, fullName: 'Contamination Degree' },
    { name: 'HEI', value: stats.calculations.by_index.hei, fullName: 'Heavy Metal Evaluation Index' },
    { name: 'PIG', value: stats.calculations.by_index.pig, fullName: 'Pollution Index of Groundwater' },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Calculations by Water Quality Index</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Total: {stats.calculations.total.toLocaleString()} calculations
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [value.toLocaleString(), 'Calculations']}
            />
            <Bar 
              dataKey="value" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CalculationsByIndexChart;
