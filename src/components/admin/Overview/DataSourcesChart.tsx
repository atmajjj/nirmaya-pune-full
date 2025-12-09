import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { SystemStats } from '@/types/admin.types';

interface DataSourcesChartProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const COLORS = {
  csv: '#10b981',   // green
  xlsx: '#3b82f6',  // blue
  xls: '#f59e0b'    // amber
};

const DataSourcesChart = ({ stats, loading }: DataSourcesChartProps) => {
  if (loading || !stats) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Data Sources by File Type</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    { name: 'CSV', value: stats?.data_sources?.by_file_type?.csv ?? 0, color: COLORS.csv },
    { name: 'XLSX', value: stats?.data_sources?.by_file_type?.xlsx ?? 0, color: COLORS.xlsx },
    { name: 'XLS', value: stats?.data_sources?.by_file_type?.xls ?? 0, color: COLORS.xls },
  ].filter(item => item.value > 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Data Sources by File Type</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Total: {stats?.data_sources?.total?.toLocaleString() ?? 0} files ({(stats?.data_sources?.total_size_mb ?? 0).toFixed(1)} MB)
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data sources available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSourcesChart;
