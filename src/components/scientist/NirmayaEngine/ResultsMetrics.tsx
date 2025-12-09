import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalysisMetric } from './types';

interface ResultsMetricsProps {
  metrics: AnalysisMetric[];
}

export const ResultsMetrics = ({ metrics }: ResultsMetricsProps) => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Results</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Key Metrics</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
              <p className={`text-2xl font-bold`} style={{ color: metric.color }}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
