import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PredictiveDataPoint } from "./types";

interface PredictiveModelChartProps {
  data: PredictiveDataPoint[];
}

const PredictiveModelChart = ({ data }: PredictiveModelChartProps) => {
return (
    <Card className="bg-white rounded-3xl shadow-xl border border-slate-200">
      <CardHeader className="border-b border-slate-100 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          Predictive Forecast
        </CardTitle>
        <p className="text-slate-600 mt-2">Predictive Subtitle</p>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
            <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontWeight="500" />
            <YAxis stroke="#64748b" fontSize={12} fontWeight="500" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              fill="url(#actualGradient)"
              fillOpacity={0.8}
              name="Actual H M P I"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#ef4444"
              fill="url(#predictedGradient)"
              fillOpacity={0.6}
              strokeDasharray="8 8"
              name="Predicted H M P I"
              strokeWidth={3}
            />
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PredictiveModelChart;
