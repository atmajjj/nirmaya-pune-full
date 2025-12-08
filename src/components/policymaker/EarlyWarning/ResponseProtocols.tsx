import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, BarChart3, AlertTriangle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Protocol } from './types';

interface ResponseProtocolsProps {
  protocols: Protocol[];
  completedTasks: Set<number>;
  onToggleTask: (id: number) => void;
}

const getIcon = (iconType: string, iconClass: string) => {
  const icons: Record<string, React.ReactNode> = {
    BarChart3: <BarChart3 className={iconClass} />,
    AlertTriangle: <AlertTriangle className={iconClass} />,
    Truck: <Truck className={iconClass} />
  };
  return icons[iconType] || <Shield className={iconClass} />;
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-orange-100 text-orange-700';
    case 'low':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const ResponseProtocols = ({ protocols, completedTasks, onToggleTask }: ResponseProtocolsProps) => {
return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        Recommended Protocols
      </h2>

      <Card className="bg-white rounded-3xl shadow-xl border border-slate-200">
        <CardContent className="p-8">
          <div className="space-y-4">
            {protocols.map((protocol) => (
              <div
                key={protocol.id}
                className={cn(
                  "flex items-center gap-6 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-lg",
                  completedTasks.has(protocol.id)
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-slate-200 hover:border-blue-300"
                )}
                onClick={() => onToggleTask(protocol.id)}
              >
                <button
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                    completedTasks.has(protocol.id)
                      ? "bg-green-500 border-green-500"
                      : "border-slate-300 group-hover:border-blue-500"
                  )}
                >
                  {completedTasks.has(protocol.id) && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                </button>

                <div className="flex-1">
                  <p className={cn(
                    "text-lg font-semibold transition-all duration-300",
                    completedTasks.has(protocol.id)
                      ? "text-green-700 line-through"
                      : "text-slate-800"
                  )}>
                    {protocol.task}
                  </p>
                </div>

                <Badge className={cn("capitalize", getPriorityBadge(protocol.priority))}>
                  {protocol.priority}
                </Badge>

                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-all duration-300">
                  {protocol.icon}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponseProtocols;
