import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Variable } from './types';

interface AvailableVariablesProps {
  variables: Variable[];
}

export const AvailableVariables = ({ variables }: AvailableVariablesProps) => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">"Available Variables"</CardTitle>
        <p className="text-sm text-slate-500 mt-1">"Available Variables Subtitle"</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {variables.map((v, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-teal-600">{v.symbol}</span>
                <span className="text-xs text-slate-500">{v.unit}</span>
              </div>
              <p className="text-sm font-medium text-slate-700 mb-1">{v.name}</p>
              <p className="text-xs text-slate-600">{v.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
