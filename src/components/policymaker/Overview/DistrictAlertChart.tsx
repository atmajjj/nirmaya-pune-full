import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const data = [
  { district: "Coimbatore", alerts: 12, severity: "critical" },
  { district: "Chennai", alerts: 10, severity: "critical" },
  { district: "Madurai", alerts: 8, severity: "moderate" },
  { district: "Kanpur", alerts: 7, severity: "critical" },
  { district: "Surat", alerts: 6, severity: "moderate" },
  { district: "Bengaluru", alerts: 5, severity: "moderate" },
  { district: "Vadodara", alerts: 4, severity: "low" },
  { district: "Erode", alerts: 3, severity: "low" },
];

const getColor = (severity: string) => {
  switch (severity) {
    case "critical": return "#ef4444";
    case "moderate": return "#f59e0b";
    case "low": return "#10b981";
    default: return "#64748b";
  }
};

export const DistrictAlertChart = () => {
  return (
    <Card className="bg-white border border-slate-200 rounded-xl shadow-lg">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            Top Districts by Active Alerts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              type="category"
              dataKey="district" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any, name: string) => {
                if (name === "alerts") return [value, "Active Alerts"];
                return [value, name];
              }}
            />
            <Bar dataKey="alerts" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.severity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-600">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-600">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600">Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
