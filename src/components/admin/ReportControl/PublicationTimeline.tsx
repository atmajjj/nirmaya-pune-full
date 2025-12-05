import { History, Upload, CheckCircle, Eye, Edit, Archive, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TimelineEvent } from './types';

interface PublicationTimelineProps {
  timeline: TimelineEvent[];
}

const PublicationTimeline = ({ timeline }: PublicationTimelineProps) => {
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "submitted": return <Upload className="w-4 h-4" />;
      case "published": return <CheckCircle className="w-4 h-4" />;
      case "reviewed": return <Eye className="w-4 h-4" />;
      case "updated": return <Edit className="w-4 h-4" />;
      case "archived": return <Archive className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case "submitted": return "text-blue-600 bg-blue-100";
      case "published": return "text-green-600 bg-green-100";
      case "reviewed": return "text-yellow-600 bg-yellow-100";
      case "updated": return "text-purple-600 bg-purple-100";
      case "archived": return "text-gray-600 bg-gray-100";
      default: return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <History className="w-5 h-5" />
          Publication Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeline.map((item) => (
          <div key={`${item.type}-${item.report}-${item.date}`} className="flex items-start gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              getTimelineColor(item.type)
            )}>
              {getTimelineIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{item.event}</p>
              <p className="text-xs text-slate-600 truncate">{item.report}</p>
              <p className="text-xs text-slate-500">{item.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PublicationTimeline;
