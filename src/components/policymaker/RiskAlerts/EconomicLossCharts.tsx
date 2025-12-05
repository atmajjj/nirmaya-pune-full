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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getLossBreakdownData,
  getEconomicSummary,
} from "./economicLossData";
import { TrendingDown, CheckCircle } from "lucide-react";

// Monthly risk alerts data
const monthlyAlertsData = [
  { month: "Jan", alerts: 25 },
  { month: "Feb", alerts: 34 },
  { month: "Mar", alerts: 31 },
  { month: "Apr", alerts: 42 },
  { month: "May", alerts: 38 },
  { month: "Jun", alerts: 48 },
  { month: "Jul", alerts: 45 },
  { month: "Aug", alerts: 53 },
  { month: "Sep", alerts: 44 },
  { month: "Oct", alerts: 41 },
  { month: "Nov", alerts: 39 },
  { month: "Dec", alerts: 55 },
];

// Zone category distribution data
const zoneDistributionData = [
  { name: "Safe Zone", value: 25, color: "#22c55e" },
  { name: "Moderate Contamination", value: 35, color: "#f59e0b" },
  { name: "Critical / Unsafe", value: 40, color: "#ef4444" },
];

// State-wise monthly HMPI data
const stateMonthlyHMPIData = [
  { month: "Jan", "Tamil Nadu": 52, "Maharashtra": 46, "Uttar Pradesh": 55, "Gujarat": 41, "Andhra Pradesh": 48, "Karnataka": 38 },
  { month: "Feb", "Tamil Nadu": 55, "Maharashtra": 48, "Uttar Pradesh": 58, "Gujarat": 44, "Andhra Pradesh": 50, "Karnataka": 40 },
  { month: "Mar", "Tamil Nadu": 60, "Maharashtra": 53, "Uttar Pradesh": 63, "Gujarat": 49, "Andhra Pradesh": 55, "Karnataka": 45 },
  { month: "Apr", "Tamil Nadu": 68, "Maharashtra": 61, "Uttar Pradesh": 70, "Gujarat": 56, "Andhra Pradesh": 62, "Karnataka": 52 },
  { month: "May", "Tamil Nadu": 72, "Maharashtra": 66, "Uttar Pradesh": 75, "Gujarat": 60, "Andhra Pradesh": 67, "Karnataka": 56 },
  { month: "Jun", "Tamil Nadu": 78, "Maharashtra": 70, "Uttar Pradesh": 82, "Gujarat": 63, "Andhra Pradesh": 71, "Karnataka": 59 },
  { month: "Jul", "Tamil Nadu": 74, "Maharashtra": 65, "Uttar Pradesh": 77, "Gujarat": 59, "Andhra Pradesh": 69, "Karnataka": 58 },
  { month: "Aug", "Tamil Nadu": 80, "Maharashtra": 69, "Uttar Pradesh": 83, "Gujarat": 62, "Andhra Pradesh": 73, "Karnataka": 61 },
  { month: "Sep", "Tamil Nadu": 71, "Maharashtra": 62, "Uttar Pradesh": 74, "Gujarat": 55, "Andhra Pradesh": 65, "Karnataka": 54 },
  { month: "Oct", "Tamil Nadu": 63, "Maharashtra": 55, "Uttar Pradesh": 66, "Gujarat": 48, "Andhra Pradesh": 58, "Karnataka": 47 },
  { month: "Nov", "Tamil Nadu": 58, "Maharashtra": 51, "Uttar Pradesh": 60, "Gujarat": 45, "Andhra Pradesh": 54, "Karnataka": 43 },
  { month: "Dec", "Tamil Nadu": 54, "Maharashtra": 48, "Uttar Pradesh": 57, "Gujarat": 42, "Andhra Pradesh": 50, "Karnataka": 40 },
];

const STATE_COLORS = {
  "Tamil Nadu": "#ef4444",
  "Maharashtra": "#f59e0b",
  "Uttar Pradesh": "#8b5cf6",
  "Gujarat": "#22c55e",
  "Andhra Pradesh": "#3b82f6",
  "Karnataka": "#06b6d4",
};

const LOSS_COLORS = {
  "Agriculture": "#22c55e",
  "Health Burden": "#ef4444",
  "Industrial": "#3b82f6",
  "Water Purification": "#8b5cf6",
  "Emergency Response": "#f59e0b",
};

export function EconomicLossBreakdownChart() {
  const data = useMemo(() => getLossBreakdownData(), []);

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          Economic Loss Breakdown by District
        </CardTitle>
        <p className="text-sm text-slate-500">
          Category-wise economic losses in ₹ Crores
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
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
                  value: "Loss (₹ Cr)",
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
                formatter={(value: number, name: string) => [
                  `₹${value} Cr`,
                  name,
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 12 }}>{value}</span>
                )}
              />
              <Bar dataKey="Agriculture" stackId="a" fill={LOSS_COLORS["Agriculture"]} />
              <Bar dataKey="Health Burden" stackId="a" fill={LOSS_COLORS["Health Burden"]} />
              <Bar dataKey="Industrial" stackId="a" fill={LOSS_COLORS["Industrial"]} />
              <Bar dataKey="Water Purification" stackId="a" fill={LOSS_COLORS["Water Purification"]} />
              <Bar dataKey="Emergency Response" stackId="a" fill={LOSS_COLORS["Emergency Response"]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function EconomicSummaryCards() {
  const summary = useMemo(() => getEconomicSummary(), []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Economic Loss</p>
              <p className="text-xl font-bold text-slate-800">₹{summary.totalLoss} Cr</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Loss Avoided</p>
              <p className="text-xl font-bold text-slate-800">₹{summary.totalAvoided} Cr</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MonthlyAlertsChart() {
  const totalAlerts = useMemo(() => 
    monthlyAlertsData.reduce((sum, item) => sum + item.alerts, 0), 
    []
  );

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          Number of Risk Alerts Sent Every Month
        </CardTitle>
        <p className="text-sm text-slate-500">
          Monthly trend of risk alerts issued • Total: {totalAlerts} alerts
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyAlertsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                domain={[20, 60]}
                label={{
                  value: "Alerts",
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
                formatter={(value: number) => [`${value} alerts`, "Risk Alerts"]}
              />
              <Line
                type="linear"
                dataKey="alerts"
                stroke="#1e3a5f"
                strokeWidth={2}
                dot={{ fill: "#1e3a5f", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#0ea5e9" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ZoneDistributionChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          Monitoring Sites by Zone Category
        </CardTitle>
        <p className="text-sm text-slate-500">
          Distribution of monitoring sites across contamination zones
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={zoneDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
                labelLine={{ stroke: "#64748b", strokeWidth: 1 }}
              >
                {zoneDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          {zoneDistributionData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-500">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function StateHMPITrendChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          State-wise Monthly HMPI Trends
        </CardTitle>
        <p className="text-sm text-slate-500">
          Health Monitoring & Pollution Index across states over 12 months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stateMonthlyHMPIData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                domain={[30, 90]}
                label={{
                  value: "HMPI",
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
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 11 }}>{value}</span>
                )}
              />
              {Object.entries(STATE_COLORS).map(([state, color]) => (
                <Line
                  key={state}
                  type="monotone"
                  dataKey={state}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5, fill: color }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function EconomicLossCharts() {
  return (
    <div className="space-y-6">
      <EconomicSummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyAlertsChart />
        <ZoneDistributionChart />
      </div>
      <StateHMPITrendChart />
      <EconomicLossBreakdownChart />
    </div>
  );
}
