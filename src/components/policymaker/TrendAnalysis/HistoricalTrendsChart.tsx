import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HistoricalDataPoint } from "./types";

interface HistoricalTrendsChartProps {
  data: HistoricalDataPoint[];
}

const HistoricalTrendsChart = ({ data }: HistoricalTrendsChartProps) => {
return (
    <Card className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <CardHeader className="border-b border-slate-100 pb-6 bg-gradient-to-r from-slate-50 to-teal-50">
        <CardTitle className="text-3xl font-bold text-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          Historical Trends
        </CardTitle>
        <p className="text-slate-600 text-lg mt-2">Historical Trends Subtitle</p>
      </CardHeader>
      <CardContent className="p-8">
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
            <XAxis dataKey="year" stroke="#64748b" fontSize={14} fontWeight="500" />
            <YAxis stroke="#64748b" fontSize={14} fontWeight="500" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                fontSize: "14px",
                fontWeight: "500"
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: "20px",
                fontSize: "14px",
                fontWeight: "600"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="delhi" 
              stroke="#ef4444" 
              strokeWidth={3} 
              name="Delhi" 
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="mumbai" 
              stroke="#f59e0b" 
              strokeWidth={3} 
              name="Mumbai" 
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="bangalore" 
              stroke="#10b981" 
              strokeWidth={3} 
              name="Bangalore" 
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="chennai" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              name="Chennai" 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="kolkata" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              name="Kolkata" 
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrendsChart;
