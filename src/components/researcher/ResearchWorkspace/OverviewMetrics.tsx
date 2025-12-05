import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Clipboard, MessageCircle } from "lucide-react";
import type { TeamMember } from './types';

interface OverviewMetricsProps {
  teamCount: number;
  notesCount: number;
  whiteboardCount: number;
  discussionsCount: number;
}

interface MetricCardData {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export const OverviewMetrics = ({ teamCount, notesCount, whiteboardCount, discussionsCount }: OverviewMetricsProps) => {
  const metrics: MetricCardData[] = [
    { title: "Team Members", value: String(teamCount), icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Research Notes", value: String(notesCount), icon: FileText, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "Whiteboard Items", value: String(whiteboardCount), icon: Clipboard, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Active Discussions", value: String(discussionsCount), icon: MessageCircle, color: "text-orange-600", bgColor: "bg-orange-50" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{metric.title}</h3>
                <div className={`w-9 h-9 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
