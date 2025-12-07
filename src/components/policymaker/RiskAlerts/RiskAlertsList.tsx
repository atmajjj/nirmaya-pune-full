import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Eye, TrendingUp, Target } from "lucide-react";
import { RiskAlert } from "./types";

interface RiskAlertsListProps {
  alerts: RiskAlert[];
  onAlertClick: (alertId: string) => void;
}

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive";
    case "moderate":
      return "default";
    case "low":
      return "secondary";
    default:
      return "default";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-red-700 bg-red-100 border-red-300";
    case "moderate":
      return "text-amber-700 bg-amber-100 border-amber-300";
    case "low":
      return "text-emerald-700 bg-emerald-100 border-emerald-300";
    default:
      return "text-slate-600 bg-slate-100 border-slate-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-red-700 bg-red-100 border-red-300";
    case "in-review":
      return "text-amber-700 bg-amber-100 border-amber-300";
    case "resolved":
      return "text-emerald-700 bg-emerald-100 border-emerald-300";
    default:
      return "text-slate-600 bg-slate-100 border-slate-300";
  }
};

const RiskAlertsList = ({ alerts, onAlertClick }: RiskAlertsListProps) => {
return (
    <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            Active Risk Alerts
          </CardTitle>
          <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200 text-sm px-3 py-1">
            {alerts.length} Alerts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card 
              key={alert.id}
              className={`border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-2xl ${
                alert.severity === "critical" 
                  ? "border-red-200 hover:border-red-300 bg-gradient-to-r from-red-50/50 to-orange-50/50" 
                  : alert.severity === "moderate"
                  ? "border-amber-200 hover:border-amber-300 bg-gradient-to-r from-amber-50/50 to-yellow-50/50"
                  : "border-emerald-200 hover:border-emerald-300 bg-gradient-to-r from-emerald-50/50 to-teal-50/50"
              }`}
              onClick={() => onAlertClick(alert.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 font-mono text-xs">
                        {alert.id}
                      </Badge>
                      <Badge 
                        variant={getSeverityVariant(alert.severity)}
                        className={`${getSeverityColor(alert.severity)} font-semibold border-2`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`${getStatusColor(alert.status)} font-medium border-2`}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{alert.title}</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span><span className="font-semibold">{alert.district}</span>, {alert.region}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Population: <span className="font-semibold">{alert.population}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span>HMPI: <span className="font-bold text-red-700">{alert.hmpi}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>Detected: {alert.detectedOn}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Contaminant:</span> {alert.contaminant}
                      </p>
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Source:</span> {alert.source} | 
                        <span className="font-semibold ml-2">Confidence:</span> {alert.confidence}%
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Action Taken:</p>
                      <p className="text-sm text-blue-800">{alert.actionTaken}</p>
                      <p className="text-xs text-blue-600 mt-1">Assigned To: {alert.assignedTo}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="ml-4 border-slate-300 hover:bg-blue-50 hover:border-blue-400 transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                  <span>Last Updated: {alert.lastUpdated}</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Monitoring
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAlertsList;
