import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { SummaryStat } from "./types";

interface SummaryStatsCardsProps {
  stats: SummaryStat[];
}

const SummaryStatsCards = ({ stats }: SummaryStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer rounded-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-60`}></div>
          <CardContent className="relative p-8">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <Badge 
                className={`${stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center gap-1`}
              >
                {stat.changeType === 'positive' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </Badge>
            </div>
            <div>
              <h3 className="text-slate-600 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-slate-800">
                {stat.decimal ? stat.value.toFixed(1) : stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStatsCards;
