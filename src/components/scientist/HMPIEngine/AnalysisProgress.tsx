import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface AnalysisProgressProps {
  progress: number;
}

export const AnalysisProgress = ({ progress }: AnalysisProgressProps) => {
const steps = [
    { label: "Data Validation", completed: progress >= 25 },
    { label: "Computing H M P I", completed: progress >= 50 },
    { label: "Risk Classification", completed: progress >= 75 },
    { label: "Report Generation", completed: progress === 100 },
  ];

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Analysis Progress</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Real Time Status</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-teal-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step.completed ? 'bg-teal-500' : 'bg-slate-300'
              }`}>
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{idx + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium ${
                step.completed ? 'text-teal-700' : 'text-slate-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
