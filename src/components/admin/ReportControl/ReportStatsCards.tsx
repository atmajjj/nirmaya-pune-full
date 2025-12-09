import { FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReportStatsCardsProps {
  stats: {
    total: number;
    pending: number;
    completed: number;
    generating: number;
    failed: number;
  };
}

const ReportStatsCards = ({ stats }: ReportStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Completed</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">{stats.completed}</h3>
              <p className="text-xs text-emerald-600 mt-1">Ready to download</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium mb-2">Failed</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">{stats.failed}</h3>
              <p className="text-xs text-red-600 mt-1">Generation errors</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportStatsCards;
