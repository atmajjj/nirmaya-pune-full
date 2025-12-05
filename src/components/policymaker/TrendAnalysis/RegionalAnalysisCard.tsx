import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp } from "lucide-react";
import { RegionalRisk } from "./types";

interface RegionalAnalysisCardProps {
  regions: RegionalRisk[];
}

const RegionalAnalysisCard = ({ regions }: RegionalAnalysisCardProps) => {
return (
    <Card className="bg-white rounded-3xl shadow-xl border border-slate-200">
      <CardHeader className="border-b border-slate-100 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          "Regional Risk Assessment"
        </CardTitle>
        <p className="text-slate-600 mt-2">"Regional Risk Subtitle"</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {regions.map((region) => (
            <div key={region.name} className="group hover:bg-slate-50 p-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {region.name}
                  </h4>
                  <Badge 
                    variant={region.risk === "critical" ? "destructive" : region.risk === "moderate" ? "default" : "secondary"}
                    className={`${
                      region.risk === "critical" 
                        ? "bg-red-100 text-red-700 hover:bg-red-200" 
                        : region.risk === "moderate"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    } font-semibold`}
                  >
                    {region.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-800">{region.value}</span>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 font-semibold">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {region.change}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={region.value} 
                className={`h-3 bg-slate-200`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalAnalysisCard;
