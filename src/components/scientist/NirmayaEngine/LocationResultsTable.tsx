import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Filter, X } from "lucide-react";
import { nirmayaEngineService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { Calculation } from "@/types/nirmaya.types";

interface LocationResultsTableProps {
  uploadId?: number;
  refreshTrigger?: number;
  onNewAnalysis?: () => void;
}

export const LocationResultsTable = ({ uploadId, refreshTrigger, onNewAnalysis }: LocationResultsTableProps) => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(false);
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

  const getHEIBadgeColor = (heiClass: string | null | undefined): string => {
    if (!heiClass) return 'bg-slate-300 text-slate-700';
    const cls = heiClass.toLowerCase();
    if (cls.includes('very high') || cls.includes('extremely')) return 'bg-red-600 text-white';
    if (cls.includes('high')) return 'bg-orange-600 text-white';
    if (cls.includes('moderate') || cls.includes('medium')) return 'bg-amber-500 text-white';
    if (cls.includes('low')) return 'bg-yellow-400 text-slate-800';
    if (cls.includes('pure') || cls.includes('very low')) return 'bg-green-500 text-white';
    return 'bg-slate-300 text-slate-700';
  };

  const getWQIBadgeColor = (wqiClass: string | null | undefined): string => {
    if (!wqiClass) return 'bg-slate-300 text-slate-700';
    const cls = wqiClass.toLowerCase();
    if (cls.includes('unsuitable')) return 'bg-red-600 text-white';
    if (cls.includes('very poor')) return 'bg-orange-600 text-white';
    if (cls.includes('poor')) return 'bg-amber-500 text-white';
    if (cls.includes('marginal') || cls.includes('fair')) return 'bg-yellow-400 text-slate-800';
    if (cls.includes('good')) return 'bg-green-500 text-white';
    if (cls.includes('excellent')) return 'bg-emerald-600 text-white';
    return 'bg-slate-300 text-slate-700';
  };

return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">Calculation Results</CardTitle>
            <p className="text-sm text-slate-500 mt-1">{calculations.length} stations analyzed</p>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-slate-700 font-semibold">Station ID</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">Location</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">District</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">State</th>
                  <th className="text-center p-3 text-slate-700 font-semibold">Year</th>
                  <th className="text-right p-3 text-slate-700 font-semibold">HPI</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">HPI Status</th>
                  <th className="text-right p-3 text-slate-700 font-semibold">HEI</th>
                  <th className="text-left p-3 text-slate-700 font-semibold">HEI Class</th>
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
                      {calc.location || calc.city || 'N/A'}
                    </td>
                    <td className="p-3 text-slate-700">
                      {calc.district || '-'}
                    </td>
                    <td className="p-3 text-slate-700">
                      {calc.state || '-'}
                    </td>
                    <td className="p-3 text-slate-700 text-center">
                      {calc.year || '-'}
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
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold border-0 ${getHEIBadgeColor(calc.mi_class)}`}
                      >
                        {calc.mi_class || 'N/A'}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-700 font-bold text-right">
                      {calc.wqi?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold border-0 ${getWQIBadgeColor(calc.wqi_classification)}`}
                      >
                        {calc.wqi_classification || 'N/A'}
                      </Badge>
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
