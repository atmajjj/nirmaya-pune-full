import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Activity } from "lucide-react";
import { ActionLog } from "./types";

interface ActionLogsPanelProps {
  logs: ActionLog[];
}

const ActionLogsPanel = ({ logs }: ActionLogsPanelProps) => {
return (
    <Card className="bg-white border border-slate-200 shadow-lg rounded-2xl">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600" />
          "Recent Actions"
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {logs.map((log) => (
            <div 
              key={log.id}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-md"
            >
              <div className={`p-2 rounded-lg ${
                log.status === "completed" 
                  ? "bg-emerald-100" 
                  : "bg-amber-100"
              }`}>
                {log.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Activity className="w-5 h-5 text-amber-600 animate-pulse" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 mb-1">{log.action}</p>
                <p className="text-sm text-slate-600 mb-2">{log.assignedTo}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-500">{log.timestamp}</span>
                  <Badge 
                    variant="outline"
                    className={`text-xs ml-2 ${
                      log.status === "completed"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : "bg-amber-100 text-amber-700 border-amber-300"
                    }`}
                  >
                    {log.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionLogsPanel;
