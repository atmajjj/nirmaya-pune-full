import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import type { CalculationResult } from "@/types/nirmaya.types";

interface ResultsSummaryCardProps {
  result: CalculationResult;
}

export const ResultsSummaryCard = ({ result }: ResultsSummaryCardProps) => {
  const getStatusIcon = (count: number) => {
    if (count === 0) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (count < 3) return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getStatusColor = (count: number) => {
    if (count === 0) return 'bg-green-50 border-green-200';
    if (count < 3) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Calculation Summary</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Analysis completed successfully</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Processing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-1">Total Stations</p>
            <p className="text-2xl font-bold text-blue-900">{result.total_stations || 0}</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-600 font-semibold mb-1">Processed</p>
            <p className="text-2xl font-bold text-green-900">{result.processed_stations || 0}</p>
          </div>
          <div className={`p-4 border rounded-lg ${getStatusColor(result.failed_stations || 0)}`}>
            <p className="text-xs font-semibold mb-1">Failed</p>
            <p className="text-2xl font-bold">{result.failed_stations || 0}</p>
          </div>
        </div>

        {/* Metals Analyzed */}
        {result.metals_analyzed && result.metals_analyzed.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Metals Analyzed</h3>
            <div className="flex flex-wrap gap-2">
              {result.metals_analyzed.map((metal, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {metal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* WQI Parameters */}
        {result.wqi_params_analyzed && result.wqi_params_analyzed.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">WQI Parameters Analyzed</h3>
            <div className="flex flex-wrap gap-2">
              {result.wqi_params_analyzed.map((param, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {param}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {result.errors && result.errors.length > 0 && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-1">Errors encountered:</p>
              <ul className="list-disc list-inside text-xs space-y-1">
                {result.errors.map((error, i) => (
                  <li key={i}>
                    {error.station_id && `Station ${error.station_id}: `}
                    {error.message}
                    {error.row && ` (Row ${error.row})`}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Warnings */}
        {result.warnings && result.warnings.length > 0 && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              <p className="font-semibold mb-1 text-amber-900">Warnings:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-amber-800">
                {result.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
