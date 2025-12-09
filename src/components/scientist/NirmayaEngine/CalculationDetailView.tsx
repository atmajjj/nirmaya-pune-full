import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Gauge } from "lucide-react";
import type { Calculation } from "@/types/nirmaya.types";

interface CalculationDetailViewProps {
  calculation: Calculation;
}

export const CalculationDetailView = ({ calculation }: CalculationDetailViewProps) => {
  const getHPIColor = (hpi: number | null) => {
    if (!hpi) return 'text-slate-500';
    if (hpi > 100) return 'text-red-600';
    if (hpi > 50) return 'text-orange-600';
    if (hpi > 25) return 'text-amber-600';
    return 'text-yellow-600';
  };

  const getHPIBgColor = (hpi: number | null) => {
    if (!hpi) return 'bg-slate-50';
    if (hpi > 100) return 'bg-red-50';
    if (hpi > 50) return 'bg-orange-50';
    if (hpi > 25) return 'bg-amber-50';
    return 'bg-yellow-50';
  };

  const getClassificationColor = (classification: string | null) => {
    if (!classification) return 'bg-slate-300 text-slate-700';
    const cls = classification.toLowerCase();
    if (cls.includes('critical') || cls.includes('unsuitable')) return 'bg-red-600 text-white';
    if (cls.includes('very poor') || cls.includes('very high')) return 'bg-orange-600 text-white';
    if (cls.includes('high') || cls.includes('poor')) return 'bg-amber-500 text-white';
    if (cls.includes('moderate') || cls.includes('medium') || cls.includes('marginal')) return 'bg-yellow-500 text-slate-800';
    if (cls.includes('low') || cls.includes('good')) return 'bg-green-500 text-white';
    if (cls.includes('excellent')) return 'bg-emerald-600 text-white';
    return 'bg-slate-300 text-slate-700';
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-semibold">
              Station {calculation.station_id}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              {calculation.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {calculation.location}
                </div>
              )}
              {calculation.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {calculation.year}
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            ID: {calculation.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Location Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">State</p>
            <p className="text-sm font-semibold text-slate-700">{calculation.state || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">District</p>
            <p className="text-sm font-semibold text-slate-700">{calculation.district || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">City</p>
            <p className="text-sm font-semibold text-slate-700">{calculation.city || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Coordinates</p>
            <p className="text-sm font-semibold text-slate-700 font-mono">
              {calculation.latitude && calculation.longitude 
                ? `${calculation.latitude.toFixed(4)}, ${calculation.longitude.toFixed(4)}`
                : '-'
              }
            </p>
          </div>
        </div>

        {/* Index Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* HPI Card */}
          <div className={`p-4 rounded-lg border ${getHPIBgColor(calculation.hpi)} border-slate-200`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className={`w-5 h-5 ${getHPIColor(calculation.hpi)}`} />
                <h3 className="text-sm font-semibold text-slate-700">HPI</h3>
              </div>
            </div>
            <p className={`text-3xl font-bold ${getHPIColor(calculation.hpi)} mb-2`}>
              {calculation.hpi ? calculation.hpi.toFixed(2) : 'N/A'}
            </p>
            <Badge
              variant="outline"
              className={`text-xs font-semibold border-0 ${getClassificationColor(calculation.hpi_classification)}`}
            >
              {calculation.hpi_classification || 'N/A'}
            </Badge>
          </div>

          {/* MI Card */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-700">MI</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-2">
              {calculation.mi ? calculation.mi.toFixed(2) : 'N/A'}
            </p>
            <Badge
              variant="outline"
              className={`text-xs font-semibold border-0 ${getClassificationColor(calculation.mi_class)}`}
            >
              {calculation.mi_class || calculation.mi_classification || 'N/A'}
            </Badge>
          </div>

          {/* WQI Card */}
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-semibold text-slate-700">WQI</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-teal-900 mb-2">
              {calculation.wqi ? calculation.wqi.toFixed(2) : 'N/A'}
            </p>
            <Badge
              variant="outline"
              className={`text-xs font-semibold border-0 ${getClassificationColor(calculation.wqi_classification)}`}
            >
              {calculation.wqi_classification || 'N/A'}
            </Badge>
          </div>
        </div>

        {/* Analyzed Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculation.metals_analyzed && calculation.metals_analyzed.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                Metals Analyzed ({calculation.metals_analyzed.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {calculation.metals_analyzed.map((metal, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {metal}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {calculation.wqi_params_analyzed && calculation.wqi_params_analyzed.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                WQI Parameters ({calculation.wqi_params_analyzed.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {calculation.wqi_params_analyzed.map((param, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {param}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div>
              <span className="font-semibold">Created:</span> {new Date(calculation.created_at).toLocaleString()}
            </div>
            {calculation.updated_at && (
              <div>
                <span className="font-semibold">Updated:</span> {new Date(calculation.updated_at).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
