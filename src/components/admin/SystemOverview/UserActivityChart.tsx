import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { NetworkData } from './types';

interface UserActivityChartProps {
  data: NetworkData[];
}

const UserActivityChart = ({ data }: UserActivityChartProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Network Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
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
            <Area type="monotone" dataKey="incoming" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Incoming (MB/s)" />
            <Area type="monotone" dataKey="outgoing" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Outgoing (MB/s)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserActivityChart;
