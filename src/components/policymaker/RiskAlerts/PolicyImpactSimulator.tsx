import { useMemo, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  Factory, 
  Mountain, 
  Leaf, 
  TrendingDown,
  Users,
  IndianRupee,
  Activity
} from "lucide-react";

// District baseline data
const districtBaselineData = [
  { district: "Chennai", hmpi: 72.4, highRisk: 2050000, moderateRisk: 1830000, economicLoss: 908 },
  { district: "Coimbatore", hmpi: 84.2, highRisk: 1120000, moderateRisk: 980000, economicLoss: 827 },
  { district: "Madurai", hmpi: 78.9, highRisk: 660000, moderateRisk: 520000, economicLoss: 492 },
  { district: "Nellore", hmpi: 73.1, highRisk: 890000, moderateRisk: 590000, economicLoss: 549 },
];

// RO Plant Deployment options
const roPlantOptions = [
  { action: "Deploy 5 RO Plants", hmpiReduction: 4.5, popReduction: 6, lossAvoided: 40 },
  { action: "Deploy 10 RO Plants", hmpiReduction: 9, popReduction: 13, lossAvoided: 85 },
  { action: "Deploy 20 RO Plants", hmpiReduction: 18, popReduction: 22, lossAvoided: 185 },
  { action: "Deploy 30 RO Plants", hmpiReduction: 25, popReduction: 32, lossAvoided: 265 },
];

// Industrial Regulation options
const industrialOptions = [
  { action: "10% Industrial Cut", hmpiReduction: 6, popReduction: 5, lossAvoided: 60 },
  { action: "25% Industrial Cut", hmpiReduction: 15, popReduction: 14, lossAvoided: 150 },
  { action: "Shutdown 5 Units", hmpiReduction: 22, popReduction: 20, lossAvoided: 310 },
  { action: "Shutdown 10 Units", hmpiReduction: 31, popReduction: 27, lossAvoided: 470 },
];

// Groundwater Recharge options
const rechargeOptions = [
  { action: "50 Recharge Pits", hmpiReduction: 4, popReduction: 3, lossAvoided: 25 },
  { action: "200 Recharge Pits", hmpiReduction: 10, popReduction: 8, lossAvoided: 70 },
  { action: "2 Check Dams", hmpiReduction: 15, popReduction: 12, lossAvoided: 110 },
  { action: "5 Check Dams", hmpiReduction: 26, popReduction: 20, lossAvoided: 190 },
];

// Agricultural Policy options
const agriculturalOptions = [
  { action: "Safe Fertilizers", hmpiReduction: 6, popReduction: 4, lossAvoided: 30 },
  { action: "Ban Metal Pesticides", hmpiReduction: 12, popReduction: 10, lossAvoided: 75 },
  { action: "Full Compliance", hmpiReduction: 22, popReduction: 18, lossAvoided: 160 },
];

// Chennai simulation results (example)
const chennaiSimulation = {
  before: { hmpi: 72.4, highRisk: 2050000, economicLoss: 908 },
  after: { hmpi: 59.3, highRisk: 1599000, economicLoss: 723 },
  lossAvoided: 185,
};

const COLORS = {
  hmpi: "#8b5cf6",
  population: "#3b82f6", 
  economic: "#22c55e",
};

interface PolicyOptionChartProps {
  data: { action: string; hmpiReduction: number; popReduction: number; lossAvoided: number }[];
  title: string;
  icon: React.ReactNode;
}

function PolicyOptionChart({ data, title, icon }: PolicyOptionChartProps) {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="action"
                tick={{ fill: "#64748b", fontSize: 9 }}
                axisLine={{ stroke: "#cbd5e1" }}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                  fontSize: 12,
                }}
                formatter={(value: number, name: string) => {
                  if (name === "hmpiReduction") return [`-${value}%`, "HMPI Reduction"];
                  if (name === "popReduction") return [`-${value}%`, "High-Risk Pop Reduction"];
                  if (name === "lossAvoided") return [`₹${value} Cr`, "Loss Avoided"];
                  return [value, name];
                }}
              />
              <Bar dataKey="hmpiReduction" fill={COLORS.hmpi} name="hmpiReduction" radius={[2, 2, 0, 0]} />
              <Bar dataKey="popReduction" fill={COLORS.population} name="popReduction" radius={[2, 2, 0, 0]} />
              <Bar dataKey="lossAvoided" fill={COLORS.economic} name="lossAvoided" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.hmpi }} />
            <span className="text-[10px] text-slate-500">HMPI %</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.population }} />
            <span className="text-[10px] text-slate-500">Pop %</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.economic }} />
            <span className="text-[10px] text-slate-500">₹ Cr</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DistrictBaselineChart() {
  const chartData = districtBaselineData.map(d => ({
    district: d.district,
    HMPI: d.hmpi,
    "High Risk (L)": d.highRisk / 100000,
    "Loss (₹ Cr)": d.economicLoss / 10,
  }));

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-500" />
          District Baseline Metrics
        </CardTitle>
        <p className="text-sm text-slate-500">
          Current HMPI, high-risk population, and economic loss by district
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="district"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 11 }}>{value}</span>
                )}
              />
              <Bar dataKey="HMPI" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="High Risk (L)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Loss (₹ Cr)" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function SimulationResultCard() {
  const { before, after, lossAvoided } = chennaiSimulation;
  
  const metrics = [
    {
      label: "HMPI",
      before: before.hmpi,
      after: after.hmpi,
      change: ((after.hmpi - before.hmpi) / before.hmpi * 100).toFixed(1),
      icon: <Activity className="w-4 h-4" />,
      color: "purple",
    },
    {
      label: "High-Risk Population",
      before: (before.highRisk / 1000000).toFixed(2) + "M",
      after: (after.highRisk / 1000000).toFixed(2) + "M",
      change: ((after.highRisk - before.highRisk) / before.highRisk * 100).toFixed(1),
      icon: <Users className="w-4 h-4" />,
      color: "blue",
    },
    {
      label: "Economic Loss",
      before: "₹" + before.economicLoss + " Cr",
      after: "₹" + after.economicLoss + " Cr",
      change: ((after.economicLoss - before.economicLoss) / before.economicLoss * 100).toFixed(1),
      icon: <IndianRupee className="w-4 h-4" />,
      color: "green",
    },
  ];

  return (
    <Card className="border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-green-600" />
          Chennai District - Simulation Results
        </CardTitle>
        <p className="text-sm text-slate-500">
          Impact of deploying 20 RO Plants intervention
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg bg-${metric.color}-100`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-slate-700">{metric.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Before</p>
                  <p className="text-lg font-bold text-slate-600">{metric.before}</p>
                </div>
                <div className="text-2xl text-slate-300">→</div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">After</p>
                  <p className="text-lg font-bold text-green-600">{metric.after}</p>
                </div>
              </div>
              <div className="mt-2 text-center">
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {metric.change}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200 text-center">
          <p className="text-sm text-green-700">Total Loss Avoided</p>
          <p className="text-3xl font-bold text-green-800">₹{lossAvoided} Cr</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function PolicyImpactSimulator() {
  const [activeTab, setActiveTab] = useState("baseline");
  
  const chartData = districtBaselineData.map(d => ({
    district: d.district,
    HMPI: d.hmpi,
    "High Risk (L)": d.highRisk / 100000,
    "Loss (₹ Cr)": d.economicLoss / 10,
  }));

  return (
    <div className="space-y-6">
      {/* Combined District Baseline & Policy Options */}
      <Card className="border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-500" />
            District Metrics & Policy Interventions
          </CardTitle>
          <p className="text-sm text-slate-500">
            Current district status and compare intervention options
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-lg mb-4">
              <TabsTrigger value="baseline" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Baseline
              </TabsTrigger>
              <TabsTrigger value="ro" className="text-xs">
                <Droplets className="w-3 h-3 mr-1" />
                RO Plants
              </TabsTrigger>
              <TabsTrigger value="industrial" className="text-xs">
                <Factory className="w-3 h-3 mr-1" />
                Industrial
              </TabsTrigger>
              <TabsTrigger value="recharge" className="text-xs">
                <Mountain className="w-3 h-3 mr-1" />
                Recharge
              </TabsTrigger>
              <TabsTrigger value="agricultural" className="text-xs">
                <Leaf className="w-3 h-3 mr-1" />
                Agricultural
              </TabsTrigger>
            </TabsList>

            <TabsContent value="baseline">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="district"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        color: "#1e293b",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: "10px" }}
                      formatter={(value) => (
                        <span style={{ color: "#64748b", fontSize: 11 }}>{value}</span>
                      )}
                    />
                    <Bar dataKey="HMPI" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="High Risk (L)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Loss (₹ Cr)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 text-center mt-2">
                Current HMPI, High-Risk Population (in Lakhs), and Economic Loss (₹ Cr scaled /10)
              </p>
            </TabsContent>

            <TabsContent value="ro">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={roPlantOptions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="action"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b" }}
                      formatter={(value: number, name: string) => {
                        if (name === "hmpiReduction") return [`-${value}%`, "HMPI Reduction"];
                        if (name === "popReduction") return [`-${value}%`, "Pop Reduction"];
                        if (name === "lossAvoided") return [`₹${value} Cr`, "Loss Avoided"];
                        return [value, name];
                      }}
                    />
                    <Legend formatter={(value) => (<span style={{ color: "#64748b", fontSize: 11 }}>{value === "hmpiReduction" ? "HMPI %" : value === "popReduction" ? "Pop %" : "₹ Cr"}</span>)} />
                    <Bar dataKey="hmpiReduction" fill={COLORS.hmpi} name="hmpiReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="popReduction" fill={COLORS.population} name="popReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lossAvoided" fill={COLORS.economic} name="lossAvoided" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="industrial">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={industrialOptions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="action"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b" }}
                      formatter={(value: number, name: string) => {
                        if (name === "hmpiReduction") return [`-${value}%`, "HMPI Reduction"];
                        if (name === "popReduction") return [`-${value}%`, "Pop Reduction"];
                        if (name === "lossAvoided") return [`₹${value} Cr`, "Loss Avoided"];
                        return [value, name];
                      }}
                    />
                    <Legend formatter={(value) => (<span style={{ color: "#64748b", fontSize: 11 }}>{value === "hmpiReduction" ? "HMPI %" : value === "popReduction" ? "Pop %" : "₹ Cr"}</span>)} />
                    <Bar dataKey="hmpiReduction" fill={COLORS.hmpi} name="hmpiReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="popReduction" fill={COLORS.population} name="popReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lossAvoided" fill={COLORS.economic} name="lossAvoided" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="recharge">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={rechargeOptions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="action"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b" }}
                      formatter={(value: number, name: string) => {
                        if (name === "hmpiReduction") return [`-${value}%`, "HMPI Reduction"];
                        if (name === "popReduction") return [`-${value}%`, "Pop Reduction"];
                        if (name === "lossAvoided") return [`₹${value} Cr`, "Loss Avoided"];
                        return [value, name];
                      }}
                    />
                    <Legend formatter={(value) => (<span style={{ color: "#64748b", fontSize: 11 }}>{value === "hmpiReduction" ? "HMPI %" : value === "popReduction" ? "Pop %" : "₹ Cr"}</span>)} />
                    <Bar dataKey="hmpiReduction" fill={COLORS.hmpi} name="hmpiReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="popReduction" fill={COLORS.population} name="popReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lossAvoided" fill={COLORS.economic} name="lossAvoided" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="agricultural">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={agriculturalOptions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="action"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b" }}
                      formatter={(value: number, name: string) => {
                        if (name === "hmpiReduction") return [`-${value}%`, "HMPI Reduction"];
                        if (name === "popReduction") return [`-${value}%`, "Pop Reduction"];
                        if (name === "lossAvoided") return [`₹${value} Cr`, "Loss Avoided"];
                        return [value, name];
                      }}
                    />
                    <Legend formatter={(value) => (<span style={{ color: "#64748b", fontSize: 11 }}>{value === "hmpiReduction" ? "HMPI %" : value === "popReduction" ? "Pop %" : "₹ Cr"}</span>)} />
                    <Bar dataKey="hmpiReduction" fill={COLORS.hmpi} name="hmpiReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="popReduction" fill={COLORS.population} name="popReduction" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lossAvoided" fill={COLORS.economic} name="lossAvoided" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
}
