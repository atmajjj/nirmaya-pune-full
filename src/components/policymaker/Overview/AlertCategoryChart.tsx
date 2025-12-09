import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Industrial", value: 42, color: "#3b82f6" },
  { name: "Agricultural", value: 28, color: "#10b981" },
  { name: "Environmental", value: 18, color: "#f59e0b" },
  { name: "Urban", value: 12, color: "#8b5cf6" },
];

const COLORS = data.map(d => d.color);

export const AlertCategoryChart = () => {
  return (
    <Card className="bg-white border border-slate-200 rounded-xl shadow-lg">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-orange-600" />
            </div>
            Alert Distribution by Category
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any) => [`${value} alerts`, "Count"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-slate-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
