import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Upload, CheckCircle, XCircle, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dataSourceService } from "@/services/api";

interface Stats {
  total_uploads: number;
  successful: number;
  failed: number;
}

const FieldTechnicianOverview = () => {
  const [stats, setStats] = useState<Stats>({
    total_uploads: 0,
    successful: 0,
    failed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total count
        const allResponse = await dataSourceService.list({ 
          page: 1,
          limit: 1 
        });
        
        // Get successful (available) count
        const successfulResponse = await dataSourceService.list({ 
          page: 1,
          status: 'available', 
          limit: 1 
        });
        
        // Get failed count
        const failedResponse = await dataSourceService.list({ 
          page: 1,
          status: 'failed', 
          limit: 1 
        });

        setStats({
          total_uploads: allResponse?.meta?.pagination?.total || 0,
          successful: successfulResponse?.meta?.pagination?.total || 0,
          failed: failedResponse?.meta?.pagination?.total || 0,
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Overview</h1>
              <p className="text-sm text-slate-600">Upload and manage water quality datasets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Uploads */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">Total Uploads</p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                  {loading ? "..." : stats.total_uploads}
                </h3>
                <p className="text-xs text-slate-500 mt-1">All time</p>
              </div>
              <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                <Upload className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Successful */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium mb-2">Successful</p>
                <h3 className="text-3xl md:text-4xl font-bold text-emerald-800">
                  {loading ? "..." : stats.successful}
                </h3>
                <p className="text-xs text-emerald-600 mt-1">Successfully processed</p>
              </div>
              <div className="w-14 h-14 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Failed */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium mb-2">Failed</p>
                <h3 className="text-3xl md:text-4xl font-bold text-red-800">
                  {loading ? "..." : stats.failed}
                </h3>
                <p className="text-xs text-red-600 mt-1">Processing failed</p>
              </div>
              <div className="w-14 h-14 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/field-technician/upload-dataset"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] rounded-lg text-white hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">Upload New Dataset</h3>
                <p className="text-sm text-blue-100">Upload water quality data</p>
              </div>
            </a>

            <Link 
              to="/field-technician/upload-history"
              className="flex items-center gap-4 p-4 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-300 flex items-center justify-center">
                <History className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="font-medium text-slate-700">View Upload History</h3>
                <p className="text-sm text-slate-600">Track your uploads</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Dataset Upload Guidelines</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Ensure CSV files contain required columns: Location, Date, and water quality parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Maximum file size: 10MB per upload</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Data should follow the standard format provided in the template</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>All uploads will be reviewed by system administrators before processing</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldTechnicianOverview;
