import { Card, CardContent } from "@/components/ui/card";
import type { MetricCard } from './types';

interface MetricsCardsProps {
  metrics: MetricCard[];
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  // Map metrics to appropriate color schemes
  const getColorScheme = (title: string) => {
    switch (title) {
      case "Publications":
        return {
          border: "border-blue-300",
          bg: "bg-blue-50",
          hover: "hover:bg-blue-100",
          text: "text-blue-700",
          labelText: "text-blue-600",
          descText: "text-blue-600",
          iconBg: "bg-blue-100",
          iconBorder: "border-blue-300",
          iconColor: "text-blue-600"
        };
      case "Citations":
        return {
          border: "border-emerald-300",
          bg: "bg-emerald-50",
          hover: "hover:bg-emerald-100",
          text: "text-emerald-700",
          labelText: "text-emerald-600",
          descText: "text-emerald-600",
          iconBg: "bg-emerald-100",
          iconBorder: "border-emerald-300",
          iconColor: "text-emerald-600"
        };
      case "Projects":
        return {
          border: "border-purple-300",
          bg: "bg-purple-50",
          hover: "hover:bg-purple-100",
          text: "text-purple-700",
          labelText: "text-purple-600",
          descText: "text-purple-600",
          iconBg: "bg-purple-100",
          iconBorder: "border-purple-300",
          iconColor: "text-purple-600"
        };
      case "Research Grants":
        return {
          border: "border-amber-300",
          bg: "bg-amber-50",
          hover: "hover:bg-amber-100",
          text: "text-amber-700",
          labelText: "text-amber-600",
          descText: "text-amber-600",
          iconBg: "bg-amber-100",
          iconBorder: "border-amber-300",
          iconColor: "text-amber-600"
        };
      default:
        return {
          border: "border-slate-300",
          bg: "bg-slate-50",
          hover: "hover:bg-slate-100",
          text: "text-slate-700",
          labelText: "text-slate-600",
          descText: "text-slate-500",
          iconBg: "bg-slate-100",
          iconBorder: "border-slate-300",
          iconColor: "text-slate-600"
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const colors = getColorScheme(metric.title);
        
        return (
          <Card 
            key={metric.title} 
            className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 ${colors.border} ${colors.bg} ${colors.text} ${colors.hover} rounded-xl`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${colors.labelText} font-medium mb-2`}>{metric.title}</p>
                  <h3 className={`text-2xl md:text-3xl font-bold ${colors.text.replace('700', '800')}`}>{metric.value}</h3>
                  <p className={`text-xs ${colors.descText} mt-1`}>
                    {metric.title === "Publications" && "Published research papers"}
                    {metric.title === "Citations" && "Average citations per publication"}
                    {metric.title === "Projects" && "Ongoing research activities"}
                    {metric.title === "Research Grants" && "Approved funding grants"}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
