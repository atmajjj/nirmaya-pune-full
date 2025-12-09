import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { SystemStats } from '@/types/admin.types';

interface UsersByRoleChartProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const COLORS = {
  admin: '#ef4444',          // red
  scientist: '#3b82f6',      // blue
  field_technician: '#8b5cf6', // purple
  researcher: '#10b981',     // green
  policymaker: '#f59e0b'     // amber
};

const UsersByRoleChart = ({ stats, loading }: UsersByRoleChartProps) => {
  if (loading || !stats) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Users by Role</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    { name: 'Admin', value: stats?.users?.by_role?.admin ?? 0, color: COLORS.admin },
    { name: 'Scientist', value: stats?.users?.by_role?.scientist ?? 0, color: COLORS.scientist },
    { name: 'Field Technician', value: stats?.users?.by_role?.field_technician ?? 0, color: COLORS.field_technician },
    { name: 'Researcher', value: stats?.users?.by_role?.researcher ?? 0, color: COLORS.researcher },
    { name: 'Policymaker', value: stats?.users?.by_role?.policymaker ?? 0, color: COLORS.policymaker },
  ].filter(item => item.value > 0);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Users by Role Distribution</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Total: {stats?.overview?.total_users?.toLocaleString() ?? 0} users
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No users available
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

export default UsersByRoleChart;
