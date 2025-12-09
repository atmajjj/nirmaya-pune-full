import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2 } from "lucide-react";
import { hmpiEngineService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { Calculation } from "@/types/hmpi.types";

interface LocationResultsTableProps {
  uploadId?: number;
  refreshTrigger?: number;
}

export const LocationResultsTable = ({ uploadId, refreshTrigger }: LocationResultsTableProps) => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (uploadId) {
      fetchCalculations();
    }
  }, [uploadId, refreshTrigger]);

  const fetchCalculations = async () => {
    if (!uploadId) return; // Don't fetch if no uploadId
    
    setLoading(true);
    try {
      const response = await hmpiEngineService.listCalculations({
        upload_id: uploadId,
        limit: 100,
        sort_by: 'created_at',
        sort_order: 'desc',
      });

      if (response.success) {
        setCalculations(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch calculations:', error);
      toast({
        title: "Error",
        description: "Failed to load calculation results",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!uploadId) return;

    setDownloading(true);
    try {
      await hmpiEngineService.downloadResults(uploadId);
      toast({
        title: "Download started",
        description: "Your results are being downloaded",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download results",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const getHPIBadgeColor = (hpi: number | null | undefined): string => {
    if (!hpi) return 'bg-slate-300 text-slate-700';
    if (hpi > 100) return 'bg-red-600 text-white';
    if (hpi > 50) return 'bg-orange-600 text-white';
    if (hpi > 25) return 'bg-amber-500 text-white';
    return 'bg-yellow-400 text-slate-800';
  };

  const getHPILabel = (hpi: number | null | undefined): string => {
    if (!hpi) return 'N/A';
    if (hpi > 100) return 'Critical';
    if (hpi > 50) return 'High';
    if (hpi > 25) return 'Medium';
    return 'Low';
  };

return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">Calculation Results</CardTitle>
            <p className="text-sm text-slate-500 mt-1">{calculations.length} stations analyzed</p>
          </div>
          {uploadId && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={downloading || calculations.length === 0}
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : calculations.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No calculations yet. Upload a CSV file to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-slate-700 font-semibold">Station ID</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">Location</th>
                  <th className="text-right p-3 text-slate-700 font-semibold">HPI</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">HPI Status</th>
                  <th className="text-right p-3 text-slate-700 font-semibold">MI</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">MI Class</th>
                  <th className="text-right p-3 text-slate-700 font-semibold">WQI</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">WQI Status</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">Metals</th>
                </tr>
              </thead>
              <tbody>
                {calculations.map((calc) => (
                  <tr key={calc.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 text-slate-600 font-mono text-xs">{calc.station_id}</td>
                    <td className="p-3 text-slate-700">
                      {calc.city && calc.state ? `${calc.city}, ${calc.state}` : calc.city || calc.state || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-700 font-bold text-right">
                      {calc.hpi?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold border-0 ${getHPIBadgeColor(calc.hpi)}`}
                      >
                        {getHPILabel(calc.hpi)}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-700 font-bold text-right">
                      {calc.mi?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-600 text-xs">
                      {calc.mi_class || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-700 font-bold text-right">
                      {calc.wqi?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-600 text-xs">
                      {calc.wqi_classification || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-600 text-xs">
                      {calc.metals_analyzed?.length || 0} metals
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
