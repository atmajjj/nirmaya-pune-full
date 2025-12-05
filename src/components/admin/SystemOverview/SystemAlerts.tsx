import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemAlert } from './types';

interface SystemAlertsProps {
  alerts: SystemAlert[];
}

const SystemAlerts = ({ alerts }: SystemAlertsProps) => {
  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 rounded-lg border-l-4 transition-all",
                getAlertSeverityColor(alert.severity),
                alert.resolved && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      className={cn("text-xs", getAlertSeverityColor(alert.severity))}
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-slate-600">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-800">{alert.message}</p>
                </div>
                {!alert.resolved && (
                  <Button variant="outline" size="sm" className="ml-2">
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemAlerts;
