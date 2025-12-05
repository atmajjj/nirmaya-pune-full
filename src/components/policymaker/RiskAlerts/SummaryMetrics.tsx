import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Bell, AlertTriangle, Shield, Clock } from "lucide-react";
import { SummaryMetric } from "./types";

const iconMap = {
  Target,
  Bell,
  AlertTriangle,
  Shield,
  Clock
};

const getMetricColor = (color: string) => {
  const colors = {
    blue: "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100",
    red: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
    orange: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
    green: "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    purple: "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100"
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

interface SummaryMetricsProps {
  metrics: SummaryMetric[];
}

const SummaryMetrics = ({ metrics }: SummaryMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.title}
          className={`border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-2xl ${getMetricColor(metric.color)}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white rounded-xl shadow-md">
                {metric.icon}
              </div>
              <Badge 
                variant={metric.trendDirection === "up" && metric.color !== "green" && metric.color !== "purple" ? "destructive" : "default"}
                className={`${
                  metric.trendDirection === "up" && metric.color !== "green" && metric.color !== "purple"
                    ? "bg-red-100 text-red-700 hover:bg-red-200" 
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                } font-semibold px-3 py-1`}
              >
                {metric.trend}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">{metric.value}</p>
              <p className="text-sm font-medium opacity-90">{metric.title}</p>
              <p className="text-xs opacity-70">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryMetrics;
