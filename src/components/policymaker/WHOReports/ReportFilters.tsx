import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, MapPin, Calendar, RotateCcw, RefreshCw } from "lucide-react";

interface ReportFiltersProps {
  reportType: string;
  onReportTypeChange: (value: string) => void;
  geographicScope: string;
  onGeographicScopeChange: (value: string) => void;
  timePeriod: string;
  onTimePeriodChange: (value: string) => void;
  isGeneratingReport: boolean;
  onGenerateReport: () => void;
  lastUpdated: Date;
}

const ReportFilters = ({
  reportType,
  onReportTypeChange,
  geographicScope,
  onGeographicScopeChange,
  timePeriod,
  onTimePeriodChange,
  isGeneratingReport,
  onGenerateReport,
  lastUpdated
}: ReportFiltersProps) => {
return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Report Type Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                Report Type
              </label>
              <Select value={reportType} onValueChange={onReportTypeChange}>
                <SelectTrigger className="bg-white border-slate-300 hover:border-teal-400 focus:border-teal-500 transition-colors rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Geographic Scope Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                Geographic Scope
              </label>
              <Select value={geographicScope} onValueChange={onGeographicScopeChange}>
                <SelectTrigger className="bg-white border-slate-300 hover:border-teal-400 focus:border-teal-500 transition-colors rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="district">District</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Period Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                Time Period
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={timePeriod}
                  onChange={(e) => onTimePeriodChange(e.target.value)}
                  className="bg-white border-slate-300 hover:border-teal-400 focus:border-teal-500 transition-colors rounded-xl pl-10"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex items-end">
              <Button 
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={onGenerateReport}
                disabled={isGeneratingReport}
              >
                {isGeneratingReport ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="ml-auto flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-500" />
              <span>Last Updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
