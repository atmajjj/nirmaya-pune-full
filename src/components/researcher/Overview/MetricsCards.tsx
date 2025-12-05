import { Card, CardContent } from "@/components/ui/card";
import type { MetricCard } from './types';

interface MetricsCardsProps {
  metrics: MetricCard[];
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium mb-2">{metric.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{metric.value}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {metric.title === "Publications" && "Published research papers"}
                    {metric.title === "Citations" && "Average citations per publication"}
                    {metric.title === "Projects" && "Ongoing research activities"}
                    {metric.title === "Research Grants" && "Approved funding grants"}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
