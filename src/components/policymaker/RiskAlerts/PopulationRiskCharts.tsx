import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRiskDistributionData } from "./districtPopulationData";

const RISK_COLORS = {
  "High Risk": "#ef4444",
  "Moderate Risk": "#f59e0b",
  "Low Risk": "#22c55e",
};

export function RiskDistributionChart() {
  const data = useMemo(() => getRiskDistributionData(), []);

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          Population Risk Distribution by District
        </CardTitle>
        <p className="text-sm text-slate-500">
          Population in millions by risk category
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="district"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={{ stroke: "#cbd5e1" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Population (M)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
                formatter={(value: number) => [
                  `${value.toFixed(2)}M`,
                  "",
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 12 }}>{value}</span>
                )}
              />
              <Bar
                dataKey="High Risk"
                stackId="a"
                fill={RISK_COLORS["High Risk"]}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Moderate Risk"
                stackId="a"
                fill={RISK_COLORS["Moderate Risk"]}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Low Risk"
                stackId="a"
                fill={RISK_COLORS["Low Risk"]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function PopulationRiskCharts() {
  return (
    <div className="space-y-6">
      <RiskDistributionChart />
    </div>
  );
}
