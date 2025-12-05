import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Zap, Target, Shield } from "lucide-react";
import { RiskInsight } from "./types";

const iconComponents = {
  AlertTriangle,
  TrendingUp,
  Zap,
  Target,
  Shield
};

interface RiskInsightsPanelProps {
  insights: RiskInsight[];
}

const RiskInsightsPanel = ({ insights }: RiskInsightsPanelProps) => {
return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-md rounded-xl">
      <CardHeader className="border-b border-red-100 pb-4">
        <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          "Critical Risk Insights"
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.title}
            className={`p-4 bg-white rounded-xl border-2 ${
              insight.priority === "high" 
                ? "border-red-300 hover:border-red-400" 
                : "border-amber-200 hover:border-amber-300"
            } transition-all duration-300 hover:shadow-md cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                insight.priority === "high" 
                  ? "bg-red-100" 
                  : "bg-amber-100"
              }`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 mb-1">{insight.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                <Badge 
                  variant="outline"
                  className={`text-xs ${
                    insight.priority === "high"
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-amber-100 text-amber-700 border-amber-300"
                  }`}
                >
                  {insight.region}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RiskInsightsPanel;
