import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { SystemStats } from '@/types/admin.types';

interface UploadStatusChartProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const COLORS = {
  completed: '#10b981', // green
  pending: '#f59e0b',   // amber
  processing: '#3b82f6', // blue
  failed: '#ef4444'     // red
};

const UploadStatusChart = ({ stats, loading }: UploadStatusChartProps) => {
  if (loading || !stats) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Upload Status</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    { name: 'Completed', value: stats.uploads.by_status.completed, color: COLORS.completed },
    { name: 'Pending', value: stats.uploads.by_status.pending, color: COLORS.pending },
    { name: 'Processing', value: stats.uploads.by_status.processing, color: COLORS.processing },
    { name: 'Failed', value: stats.uploads.by_status.failed, color: COLORS.failed },
  ].filter(item => item.value > 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upload Status Distribution</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Total: {stats.uploads.total.toLocaleString()} uploads ({stats.uploads.total_size_mb.toFixed(1)} MB)
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No upload data available
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

export default UploadStatusChart;
