import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Zap, Factory, Sprout, Building2, Mountain, Wifi, WifiOff, AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertConfig } from './types';
import { useAnimatedCounter } from './useAnimatedCounter';

interface AlertConfigCardsProps {
  alertConfigs: AlertConfig[];
  onToggleAlert: (id: number) => void;
}

const getIcon = (iconType: string) => {
  const icons: Record<string, React.ReactNode> = {
    Factory: <Factory className="w-6 h-6" />,
    Sprout: <Sprout className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />,
    Mountain: <Mountain className="w-6 h-6" />
  };
  return icons[iconType] || <AlertCircleIcon className="w-6 h-6" />;
};

const AlertConfigCard = ({ config, onToggle }: { config: AlertConfig; onToggle: (id: number) => void }) => {
const animatedPercentage = useAnimatedCounter(config.percentage);

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group rounded-2xl",
      config.enabled ? "border-slate-200" : "border-slate-300 opacity-60"
    )}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", config.bgColor, "opacity-30")}></div>
      <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br", config.color, "opacity-10 rounded-full blur-3xl")}></div>
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div className={cn("w-12 h-12 bg-gradient-to-br", config.color, "rounded-2xl flex items-center justify-center shadow-lg")}>
            {config.icon}
          </div>
          <Switch checked={config.enabled} onCheckedChange={() => onToggle(config.id)} />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">{config.title}</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">"Accuracy"</span>
              <span className={cn("text-2xl font-bold bg-gradient-to-r", config.color, "bg-clip-text text-transparent")}>
                {animatedPercentage}%
              </span>
            </div>
            <Progress value={config.percentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {config.enabled ? (
                <Wifi className="w-4 h-4 text-green-600" />
              ) : (
                <WifiOff className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-xs text-slate-600">
                {config.enabled ? "Active" : "Inactive"}
              </span>
            </div>
            <span className="text-xs text-slate-500">{config.lastCalibration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AlertConfigCards = ({ alertConfigs, onToggleAlert }: AlertConfigCardsProps) => {
return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        "Configure Alert Sources"
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertConfigs.map((config) => (
          <AlertConfigCard key={config.id} config={config} onToggle={onToggleAlert} />
        ))}
      </div>
    </div>
  );
};

export default AlertConfigCards;
