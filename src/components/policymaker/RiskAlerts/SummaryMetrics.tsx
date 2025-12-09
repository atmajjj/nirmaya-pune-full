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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.title}
          className={`border-2 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer rounded-xl ${getMetricColor(metric.color)}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-2 opacity-90">{metric.title}</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">{metric.value}</h3>
                <p className="text-xs opacity-70 mb-2">{metric.description}</p>
                <Badge 
                  variant={metric.trendDirection === "up" && metric.color !== "green" && metric.color !== "purple" ? "destructive" : "default"}
                  className={`${
                    metric.trendDirection === "up" && metric.color !== "green" && metric.color !== "purple"
                      ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-300" 
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-300"
                  } font-semibold px-2 py-0.5 text-xs border`}
                >
                  {metric.trend}
                </Badge>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                metric.color === 'blue' ? 'bg-slate-100 border border-slate-300' :
                metric.color === 'red' ? 'bg-red-100 border border-red-300' :
                metric.color === 'orange' ? 'bg-amber-100 border border-amber-300' :
                metric.color === 'green' ? 'bg-emerald-100 border border-emerald-300' :
                'bg-violet-100 border border-violet-300'
              }`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryMetrics;
