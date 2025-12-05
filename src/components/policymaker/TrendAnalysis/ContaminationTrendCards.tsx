import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { ContaminationTrend } from "./types";

interface ContaminationTrendCardsProps {
  trends: ContaminationTrend[];
}

const ContaminationTrendCards = ({ trends }: ContaminationTrendCardsProps) => {
return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {trends.map((trend) => (
        <Card key={trend.title} className={`relative overflow-hidden ${trend.bgColor} ${trend.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer rounded-2xl`}>
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  {trend.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{trend.value}%</p>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    {trend.change}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <TrendingUp className={`w-6 h-6 ${trend.trend === 'up' ? 'text-red-500' : 'text-emerald-500'} group-hover:animate-bounce`} />
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-slate-700 font-semibold text-lg">{trend.title}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>"Progress"</span>
                  <span className="font-semibold">{trend.progress}%</span>
                </div>
                <Progress 
                  value={trend.progress} 
                  className="h-3 bg-white/50"
                />
              </div>
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${trend.color} group-hover:h-2 transition-all duration-300`}></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContaminationTrendCards;
