import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { SystemPerformanceData } from './types';

interface SystemPerformanceChartProps {
  data: SystemPerformanceData[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const SystemPerformanceChart = ({ data, timeRange, onTimeRangeChange }: SystemPerformanceChartProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">System Performance</CardTitle>
        <div className="flex gap-1">
          {['24h', '7d', '30d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeRangeChange(range)}
              className={cn(
                "text-xs px-2 py-1 h-7",
                timeRange === range 
                  ? "bg-blue-600 text-white" 
                  : "bg-white/70 hover:bg-blue-50"
              )}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
            <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="Memory %" />
            <Line type="monotone" dataKey="diskIO" stroke="#f59e0b" strokeWidth={2} name="Disk I/O %" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SystemPerformanceChart;
