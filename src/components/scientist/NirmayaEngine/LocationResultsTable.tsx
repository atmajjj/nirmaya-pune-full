import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Filter, X, Download, Sparkles } from "lucide-react";
import { nirmayaEngineService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { Calculation } from "@/types/nirmaya.types";
import { ENV } from "@/config/env";
import { tokenManager } from "@/services/api/apiClient";

interface LocationResultsTableProps {
  uploadId?: number;
  refreshTrigger?: number;
  onNewAnalysis?: () => void;
}

export const LocationResultsTable = ({ uploadId, refreshTrigger, onNewAnalysis }: LocationResultsTableProps) => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    district: '',
    year: '',
    state: '',
    city: '',
  });
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
      const { data, pagination } = await nirmayaEngineService.listCalculations({
        upload_id: uploadId,
        limit: 100,
        sort_by: 'created_at',
        sort_order: 'desc',
        ...(filters.district && { district: filters.district }),
        ...(filters.year && { year: parseInt(filters.year) }),
        ...(filters.state && { state: filters.state }),
        ...(filters.city && { city: filters.city }),
      });

      setCalculations(data);
      console.log('Loaded calculations:', data.length, 'Total:', pagination.total);
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

  const handleApplyFilters = () => {
    fetchCalculations();
  };

  const handleClearFilters = () => {
    setFilters({ district: '', year: '', state: '', city: '' });
    setTimeout(() => {
      fetchCalculations();
    }, 100);
  };

  const handleGenerateAIReport = async () => {
    if (!uploadId) return;
    
    setGeneratingReport(true);
    try {
      toast({
        title: "Generating Report",
        description: "Creating AI-powered report... This may take 20-30 seconds.",
      });
      
      const token = tokenManager.getAccessToken();
      const url = `${ENV.API_URL}/nirmaya-engine/ai-report`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uploadId })
      });
      
      if (!response.ok) {
        throw new Error('Report generation failed');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `ai-report-${uploadId}.pdf`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({
        title: "Success",
        description: "AI-powered report generated and downloaded successfully!",
      });
    } catch (error) {
      console.error('AI report generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadCSV = async () => {
    if (!uploadId) return;
    
    try {
      const token = tokenManager.getAccessToken();
      const url = `${ENV.API_URL}/nirmaya-engine/uploads/${uploadId}/download`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '');
      link.style.display = 'none';
      
      // Add authorization header by opening in new window with fetch
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      link.href = blobUrl;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({
        title: "Success",
        description: "CSV file downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download CSV file",
        variant: "destructive",
      });
    }
  };

  // Detect data type based on what's calculated
  const hasHPIData = calculations.some(calc => calc.hpi !== null && calc.hpi !== undefined);
  const hasMIData = calculations.some(calc => calc.mi !== null && calc.mi !== undefined);
  const hasWQIData = calculations.some(calc => calc.wqi !== null && calc.wqi !== undefined);

  // Determine analysis type
  const getAnalysisType = () => {
    if (hasHPIData && hasMIData && hasWQIData) return 'HPI, MI & WQI Analysis';
    if (hasHPIData && hasMIData) return 'Metal Pollution Analysis (HPI & MI)';
    if (hasWQIData) return 'Water Quality Index (WQI) Analysis';
    return 'Calculation Results';
  };

  const getHPIBadgeColor = (hpi: number | null | undefined): string => {
    if (!hpi) return 'bg-slate-300 text-slate-700';
    if (hpi > 100) return 'bg-red-500 text-white';
    if (hpi > 75) return 'bg-orange-500 text-white';
    if (hpi > 50) return 'bg-amber-500 text-white';
    if (hpi > 25) return 'bg-yellow-500 text-slate-800';
    return 'bg-green-500 text-white';
  };
  const getHPITextColor = (hpi: number | null | undefined): string => {
    if (!hpi) return 'text-slate-500';
    if (hpi > 100) return 'text-red-600';
    if (hpi > 75) return 'text-red-500';
    if (hpi > 50) return 'text-orange-500';
    if (hpi > 25) return 'text-yellow-600';
    return 'text-green-600';
  };
  const getHPILabel = (hpi: number | null | undefined): string => {
    if (!hpi) return 'N/A';
    if (hpi > 75) return 'Unsafe';
    if (hpi > 25) return 'Moderate';
    return 'Safe';
  };

  const getMIBadgeColor = (miClass: string | null | undefined): string => {
    if (!miClass) return 'bg-slate-300 text-slate-700';
    const cls = miClass.toLowerCase();
    if (cls.includes('vi') || cls.includes('seriously')) return 'bg-red-500 text-white';
    if (cls.includes('v') || cls.includes('strongly')) return 'bg-orange-500 text-white';
    if (cls.includes('iv') || cls.includes('moderately')) return 'bg-amber-500 text-white';
    if (cls.includes('iii') || cls.includes('slightly')) return 'bg-yellow-400 text-slate-800';
    if (cls.includes('ii') || cls.includes('pure')) return 'bg-green-500 text-white';
    if (cls.includes('i') || cls.includes('very pure')) return 'bg-emerald-600 text-white';
    return 'bg-slate-300 text-slate-700';
  };

  const getMITextColor = (miClass: string | null | undefined): string => {
    if (!miClass) return 'text-slate-500';
    const cls = miClass.toLowerCase();
    if (cls.includes('vi') || cls.includes('seriously')) return 'text-red-600';
    if (cls.includes('v') || cls.includes('strongly')) return 'text-orange-500';
    if (cls.includes('iv') || cls.includes('moderately')) return 'text-orange-500';
    if (cls.includes('iii') || cls.includes('slightly')) return 'text-yellow-600';
    if (cls.includes('ii') || cls.includes('pure')) return 'text-green-600';
    if (cls.includes('i') || cls.includes('very pure')) return 'text-green-700';
    return 'text-slate-500';
  };

  const getMIStatus = (miClass: string | null | undefined): string => {
    if (!miClass) return 'N/A';
    const cls = miClass.toLowerCase();
    if (cls.includes('vi') || cls.includes('seriously')) return 'Critical';
    if (cls.includes('v') || cls.includes('strongly')) return 'Moderate';
    if (cls.includes('iv') || cls.includes('moderately')) return 'Moderate';
    return 'Safe';
  };

  const getWQIBadgeColor = (wqi: number | null | undefined): string => {
    if (!wqi) return 'bg-slate-300 text-slate-700';
    if (wqi > 100) return 'bg-red-600 text-white';
    if (wqi > 75) return 'bg-red-500 text-white';
    if (wqi > 50) return 'bg-orange-500 text-white';
    if (wqi > 25) return 'bg-green-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getWQITextColor = (wqi: number | null | undefined): string => {
    if (!wqi) return 'text-slate-500';
    if (wqi > 100) return 'text-red-700';
    if (wqi > 75) return 'text-red-600';
    if (wqi > 50) return 'text-orange-500';
    if (wqi > 25) return 'text-green-600';
    return 'text-blue-600';
  };

  const getWQILabel = (wqi: number | null | undefined): string => {
    if (!wqi) return 'N/A';
    if (wqi > 100) return 'Unsuitable';
    if (wqi > 75) return 'Very Poor';
    if (wqi > 50) return 'Poor';
    if (wqi > 25) return 'Good';
    return 'Excellent';
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">{getAnalysisType()}</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              {calculations.length} stations analyzed
              {hasHPIData && hasMIData && !hasWQIData && ' • Heavy Metal Pollution'}
              {hasWQIData && !hasHPIData && !hasMIData && ' • Water Quality Parameters'}
              {hasHPIData && hasWQIData && ' • Comprehensive Analysis'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCSV}
              disabled={!uploadId || calculations.length === 0}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button
              size="sm"
              onClick={handleGenerateAIReport}
              disabled={!uploadId || calculations.length === 0 || generatingReport}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              {generatingReport ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Report
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={onNewAnalysis}
              className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="filter-state" className="text-xs font-semibold">State</Label>
                <Input
                  id="filter-state"
                  placeholder="Filter by state"
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="filter-district" className="text-xs font-semibold">District</Label>
                <Input
                  id="filter-district"
                  placeholder="Filter by district"
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="filter-city" className="text-xs font-semibold">City</Label>
                <Input
                  id="filter-city"
                  placeholder="Filter by city"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="filter-year" className="text-xs font-semibold">Year</Label>
                <Input
                  id="filter-year"
                  type="number"
                  placeholder="e.g., 2024"
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                onClick={handleApplyFilters}
                disabled={loading}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                disabled={loading}
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        )}
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
            <table className="w-full text-sm border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="text-left p-3 text-slate-700 font-bold border border-slate-300">Station ID</th>
                  <th className="text-left p-3 text-slate-700 font-bold border border-slate-300">Location</th>
                  <th className="text-left p-3 text-slate-700 font-bold border border-slate-300">District</th>
                  <th className="text-left p-3 text-slate-700 font-bold border border-slate-300">State</th>
                  <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">Year</th>
                  {hasHPIData && (
                    <>
                      <th className="text-right p-3 text-slate-700 font-bold border border-slate-300">HPI</th>
                      <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">HPI Status</th>
                    </>
                  )}
                  {hasMIData && (
                    <>
                      <th className="text-right p-3 text-slate-700 font-bold border border-slate-300">MI</th>
                      <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">MI Class</th>
                      <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">MI Status</th>
                    </>
                  )}
                  {hasWQIData && (
                    <>
                      <th className="text-right p-3 text-slate-700 font-bold border border-slate-300">WQI</th>
                      <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">WQI Status</th>
                    </>
                  )}
                  {hasHPIData && hasMIData && (
                    <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">Metals</th>
                  )}
                  {hasWQIData && (
                    <th className="text-center p-3 text-slate-700 font-bold border border-slate-300">Params</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {calculations.map((calc, index) => (
                  <tr
                    key={calc.id}
                    className={`hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <td className="p-3 text-slate-800 font-mono text-xs font-bold border border-slate-300">
                      {calc.station_id}
                    </td>
                    <td className="p-3 text-slate-700 max-w-[200px] truncate border border-slate-300">
                      {calc.location || calc.city || '-'}
                    </td>
                    <td className="p-3 text-slate-600 border border-slate-300">{calc.district || '-'}</td>
                    <td className="p-3 text-slate-600 border border-slate-300">{calc.state || '-'}</td>
                    <td className="p-3 text-slate-700 text-center font-semibold border border-slate-300">
                      {calc.year || '-'}
                    </td>
                    {hasHPIData && (
                      <>
                        <td className={`p-3 font-bold text-right text-lg border border-slate-300 ${getHPITextColor(calc.hpi)}`}>
                          {calc.hpi?.toFixed(2) || 'N/A'}
                        </td>
                        <td className="p-3 text-center border border-slate-300">
                          <Badge className={`${getHPIBadgeColor(calc.hpi)} border-0 font-bold text-xs`}>
                            {getHPILabel(calc.hpi)}
                          </Badge>
                        </td>
                      </>
                    )}
                    {hasMIData && (
                      <>
                        <td className={`p-3 font-bold text-right text-lg border border-slate-300 ${getMITextColor(calc.mi_class)}`}>
                          {calc.mi?.toFixed(3) || 'N/A'}
                        </td>
                        <td className="p-3 text-center text-slate-600 text-xs border border-slate-300">
                          {calc.mi_class || '-'}
                        </td>
                        <td className="p-3 text-center border border-slate-300">
                          <Badge className={`${getMIBadgeColor(calc.mi_class)} border-0 font-bold text-xs`}>
                            {getMIStatus(calc.mi_class)}
                          </Badge>
                        </td>
                      </>
                    )}
                    {hasWQIData && (
                      <>
                        <td className={`p-3 font-bold text-right text-lg border border-slate-300 ${getWQITextColor(calc.wqi)}`}>
                          {calc.wqi?.toFixed(2) || 'N/A'}
                        </td>
                        <td className="p-3 text-center border border-slate-300">
                          <Badge className={`${getWQIBadgeColor(calc.wqi)} border-0 font-bold text-xs`}>
                            {getWQILabel(calc.wqi)}
                          </Badge>
                        </td>
                      </>
                    )}
                    {hasHPIData && hasMIData && (
                      <td className="p-3 text-center border border-slate-300">
                        <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {calc.metals_analyzed?.length || 0}
                        </span>
                      </td>
                    )}
                    {hasWQIData && (
                      <td className="p-3 text-center border border-slate-300">
                        <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {calc.params_analyzed?.length || 0}
                        </span>
                      </td>
                    )}
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
