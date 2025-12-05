import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, TrendingUp, Waves } from "lucide-react";

// River contamination station data
const riverContaminationData = [
  {
    river: "Ganga",
    totalStations: 120,
    contaminatedStations: 25,
    contaminationPercent: 21,
    dominantMetals: ["Cr", "Pb", "As"],
  },
  {
    river: "Yamuna",
    totalStations: 52,
    contaminatedStations: 28,
    contaminationPercent: 54,
    dominantMetals: ["Cr", "Pb", "Ni"],
  },
  {
    river: "Godavari",
    totalStations: 50,
    contaminatedStations: 20,
    contaminationPercent: 40,
    dominantMetals: ["Pb", "Cd", "Cr"],
  },
  {
    river: "Krishna",
    totalStations: 64,
    contaminatedStations: 18,
    contaminationPercent: 28,
    dominantMetals: ["Cr", "Ni"],
  },
];

// Prevention methods comparison data (2015 vs 2024)
const preventionMethodsData = [
  { 
    method: "Reducing Exposure", 
    fullMethod: "Reducing exposure to heavy metals (awareness + household filters)",
    score2015: 67, 
    score2024: 77,
    improvement: 10
  },
  { 
    method: "Waste Management", 
    fullMethod: "Implementing proper waste management practices (industrial + municipal)",
    score2015: 82, 
    score2024: 95,
    improvement: 13
  },
  { 
    method: "PPE in Industries", 
    fullMethod: "Using personal protective equipment in industries",
    score2015: 64, 
    score2024: 76,
    improvement: 12
  },
  { 
    method: "Regular Monitoring", 
    fullMethod: "Regular monitoring of heavy metals levels in groundwater",
    score2015: 40, 
    score2024: 95,
    improvement: 55
  },
];

// Cross-state contamination flow data
export const contaminationFlowData = [
  {
    id: 1,
    sourceDistrict: "Patna",
    receivingDistrict: "Murshidabad",
    stateFlow: "Bihar → West Bengal",
    metals: ["As"],
    flowWeight: 94,
    notes: "Highly documented eastward arsenic migration.",
  },
  {
    id: 2,
    sourceDistrict: "Gorakhpur",
    receivingDistrict: "West Champaran",
    stateFlow: "UP → Bihar",
    metals: ["As"],
    flowWeight: 87,
    notes: "Natural arsenic plume drift in Gangetic basin.",
  },
  {
    id: 3,
    sourceDistrict: "Bhilai",
    receivingDistrict: "Sambalpur",
    stateFlow: "Chhattisgarh → Odisha",
    metals: ["Cr", "Mn"],
    flowWeight: 80,
    notes: "Steel effluents migrate via upper Mahanadi basin.",
  },
  {
    id: 4,
    sourceDistrict: "Angul",
    receivingDistrict: "Vizianagaram",
    stateFlow: "Odisha → Andhra Pradesh",
    metals: ["Cr", "Ni"],
    flowWeight: 60,
    notes: "Industrial plume follows Nagavali river path.",
  },
  {
    id: 5,
    sourceDistrict: "Aurangabad",
    receivingDistrict: "Nizamabad",
    stateFlow: "Maharashtra → Telangana",
    metals: ["Pb", "Cd"],
    flowWeight: 58,
    notes: "Pharma/chemical belt influences downstream aquifer.",
  },
  {
    id: 6,
    sourceDistrict: "Chennai Industrial",
    receivingDistrict: "Nellore",
    stateFlow: "TN → AP",
    metals: ["Cr", "TDS"],
    flowWeight: 55,
    notes: "Coastal + industrial plume movement.",
  },
  {
    id: 7,
    sourceDistrict: "Vadodara",
    receivingDistrict: "Jodhpur",
    stateFlow: "Gujarat → Rajasthan",
    metals: ["Cr"],
    flowWeight: 52,
    notes: "Deep aquifer contamination spreads NW.",
  },
  {
    id: 8,
    sourceDistrict: "Bengaluru Rural",
    receivingDistrict: "Hosur",
    stateFlow: "Karnataka → Tamil Nadu",
    metals: ["Pb"],
    flowWeight: 42,
    notes: "Industrial expansion corridor effects.",
  },
];

const getFlowColor = (weight: number) => {
  if (weight >= 80) return "#ef4444";
  if (weight >= 60) return "#f59e0b";
  return "#22c55e";
};

const getFlowSeverity = (weight: number) => {
  if (weight >= 80) return "Critical";
  if (weight >= 60) return "High";
  return "Moderate";
};

export function ContaminationFlowChart() {
  const chartData = useMemo(() => 
    contaminationFlowData
      .sort((a, b) => b.flowWeight - a.flowWeight)
      .map(d => ({
        name: `${d.sourceDistrict} → ${d.receivingDistrict}`,
        flowWeight: d.flowWeight,
        stateFlow: d.stateFlow,
        fill: getFlowColor(d.flowWeight),
      })),
    []
  );

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          Cross-State Contamination Flow Intensity
        </CardTitle>
        <p className="text-sm text-slate-500">
          Flow weight indicates contamination migration severity (0-100 scale)
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={{ stroke: "#cbd5e1" }}
                width={115}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} (${getFlowSeverity(value)})`,
                  `Flow Weight`,
                ]}
                labelFormatter={(label) => `Route: ${label}`}
              />
              <Bar dataKey="flowWeight" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-slate-500">Critical (≥80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-500">High (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-500">Moderate (&lt;60)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContaminationFlowDetails() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-500" />
          Inter-State Groundwater Contamination Pathways
        </CardTitle>
        <p className="text-sm text-slate-500">
          Detailed analysis of cross-boundary contamination migration
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {contaminationFlowData
            .sort((a, b) => b.flowWeight - a.flowWeight)
            .map((flow) => (
              <div
                key={flow.id}
                className={`p-4 rounded-lg border-2 ${
                  flow.flowWeight >= 80
                    ? "border-red-200 bg-red-50"
                    : flow.flowWeight >= 60
                    ? "border-amber-200 bg-amber-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">
                      {flow.sourceDistrict}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {flow.receivingDistrict}
                    </span>
                  </div>
                  <Badge
                    className={`${
                      flow.flowWeight >= 80
                        ? "bg-red-500"
                        : flow.flowWeight >= 60
                        ? "bg-amber-500"
                        : "bg-green-500"
                    } text-white`}
                  >
                    Flow: {flow.flowWeight}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500">{flow.stateFlow}</span>
                  <span className="text-slate-300">|</span>
                  <div className="flex gap-1">
                    {flow.metals.map((metal) => (
                      <Badge
                        key={metal}
                        variant="outline"
                        className="text-xs bg-white"
                      >
                        {metal}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600">{flow.notes}</p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PreventionMethodsChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-500" />
          Prevention Methods Progress (2015 vs 2024)
        </CardTitle>
        <p className="text-sm text-slate-500">
          Comparison of prevention method scores over the decade
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={preventionMethodsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="method"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={{ stroke: "#cbd5e1" }}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                domain={[0, 100]}
                label={{
                  value: "Score",
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
                formatter={(value: number, name: string, props: any) => {
                  const label = name === "score2015" ? "2015 Score" : "2024 Score";
                  return [value, label];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.fullMethod;
                  }
                  return label;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 12 }}>
                    {value === "score2015" ? "2015" : "2024"}
                  </span>
                )}
              />
              <Bar dataKey="score2015" fill="#94a3b8" name="score2015" radius={[4, 4, 0, 0]} />
              <Bar dataKey="score2024" fill="#22c55e" name="score2024" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {preventionMethodsData.map((item) => (
            <div key={item.method} className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">{item.method}</p>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                +{item.improvement} pts
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const getContaminationColor = (percent: number) => {
  if (percent >= 50) return "#ef4444";
  if (percent >= 35) return "#f59e0b";
  return "#22c55e";
};

const getContaminationLevel = (percent: number) => {
  if (percent >= 50) return "Critical";
  if (percent >= 35) return "High";
  return "Moderate";
};

export function RiverContaminationChart() {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-500" />
          River Contamination Analysis - Major Rivers
        </CardTitle>
        <p className="text-sm text-slate-500">
          Monitoring station contamination levels across India's major river basins
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={riverContaminationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="river"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Stations",
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
                formatter={(value: number, name: string) => {
                  const label = name === "totalStations" ? "Total Stations" : "Contaminated Stations";
                  return [value, label];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return `${label} River - ${data.contaminationPercent}% contamination`;
                  }
                  return label;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: 12 }}>
                    {value === "totalStations" ? "Total Stations" : "Contaminated Stations"}
                  </span>
                )}
              />
              <Bar dataKey="totalStations" fill="#64748b" name="totalStations" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contaminatedStations" fill="#ef4444" name="contaminatedStations" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {riverContaminationData.map((river) => (
            <div 
              key={river.river} 
              className={`rounded-lg p-3 border-2 ${
                river.contaminationPercent >= 50 
                  ? "bg-red-50 border-red-200" 
                  : river.contaminationPercent >= 35 
                  ? "bg-amber-50 border-amber-200" 
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800">{river.river}</p>
                <Badge 
                  className={`${
                    river.contaminationPercent >= 50 
                      ? "bg-red-500" 
                      : river.contaminationPercent >= 35 
                      ? "bg-amber-500" 
                      : "bg-green-500"
                  } text-white`}
                >
                  {river.contaminationPercent}%
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mb-1">
                {river.contaminatedStations}/{river.totalStations} stations
              </p>
              <div className="flex gap-1 flex-wrap">
                {river.dominantMetals.map((metal) => (
                  <Badge key={metal} variant="outline" className="text-xs bg-white">
                    {metal}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ContaminationFlowInsights() {
  return (
    <div className="space-y-6">
      <ContaminationFlowChart />
      <RiverContaminationChart />
      <PreventionMethodsChart />
    </div>
  );
}
