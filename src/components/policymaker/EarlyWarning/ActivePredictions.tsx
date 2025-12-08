import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, MapPin, Clock, TrendingUp, CloudRain, Droplets, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Prediction } from './types';
import { useState } from "react";

interface ActivePredictionsProps {
  predictions: Prediction[];
}

const getIcon = (iconType: string, iconClass: string) => {
  const icons: Record<string, React.ReactNode> = {
    CloudRain: <CloudRain className={iconClass} />,
    Droplets: <Droplets className={iconClass} />,
    Building2: <Building2 className={iconClass} />
  };
  return icons[iconType] || <AlertTriangle className={iconClass} />;
};

const PredictionCard = ({ prediction }: { prediction: Prediction }) => {
const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-2xl group",
        prediction.bgColor,
        prediction.borderColor
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br", prediction.color, "opacity-5 rounded-full blur-3xl")}></div>
      
      <CardContent className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg", prediction.bgColor, "border-2", prediction.borderColor)}>
              {prediction.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{prediction.title}</h3>
              <Badge className={cn("text-xs", prediction.badgeColor)}>
                {prediction.type}
              </Badge>
            </div>
          </div>
          <Badge className={cn("text-sm px-4 py-1", prediction.badgeColor)}>
            {prediction.riskLevel}
          </Badge>
        </div>

        <p className="text-slate-700 mb-6 leading-relaxed">{prediction.description}</p>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Risk Probability</span>
              <span className={cn("text-3xl font-bold", prediction.riskColor)}>
                {prediction.probability}%
              </span>
            </div>
            <Progress value={prediction.probability} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Timeframe</p>
                <p className="text-sm font-semibold text-slate-800">{prediction.timeframe}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm font-semibold text-slate-800">View Map</p>
              </div>
            </div>
          </div>

          {expanded && (
            <div className="pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-2">
                <Button size="sm" className={cn("flex-1 bg-gradient-to-r", prediction.color, "text-white")}>
                  Deploy Response
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivePredictions = ({ predictions }: ActivePredictionsProps) => {
return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        Active Risk Predictions
      </h2>

      <div className="grid gap-6">
        {predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
};

export default ActivePredictions;
