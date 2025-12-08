import { FileText, Clock, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-2">Total Reports</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{stats.total}</h3>
              <p className="text-xs text-slate-500 mt-1">All time</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">Pending Review</p>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">{stats.pending}</h3>
              <p className="text-xs text-amber-600 mt-1">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Published</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">{stats.published}</h3>
              <p className="text-xs text-emerald-600 mt-1">Live reports</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-2">AI Generated</p>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-800">{stats.aiGenerated}</h3>
              <p className="text-xs text-purple-600 mt-1">Auto-generated</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportStatsCards;
