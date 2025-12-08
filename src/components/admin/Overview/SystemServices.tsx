import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemService } from './types';

interface SystemServicesProps {
  services: SystemService[];
}

const SystemServices = ({ services }: SystemServicesProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      case "error": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">System Services</CardTitle>
        <Button size="sm" variant="outline" className="bg-white/70 hover:bg-blue-50">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={cn("flex items-center gap-1", getStatusColor(service.status))}>
                  {getStatusIcon(service.status)}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{service.name}</p>
                  <p className="text-xs text-slate-600">Updated {service.lastUpdated}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={service.status === "running" ? "default" : "secondary"} className="capitalize mb-1">
                  {service.status}
                </Badge>
                <p className="text-xs text-slate-600">{service.uptime}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemServices;
