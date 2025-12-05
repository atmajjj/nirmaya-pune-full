import { FileText, Clock, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReportStatsCardsProps {
  stats: {
    total: number;
    pending: number;
    published: number;
    aiGenerated: number;
  };
}

const ReportStatsCards = ({ stats }: ReportStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Total Reports</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">{stats.total}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
          <p className="text-xs text-slate-600">All time</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Pending Review</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">{stats.pending}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-xs text-slate-600">Awaiting approval</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Published</span>
            </div>
            <Badge className="bg-green-100 text-green-800">{stats.published}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
          <p className="text-xs text-slate-600">Live reports</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">AI Generated</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800">{stats.aiGenerated}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-purple-600">{stats.aiGenerated}</p>
          <p className="text-xs text-slate-600">Auto-generated</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportStatsCards;
