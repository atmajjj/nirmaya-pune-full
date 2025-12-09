import { useState } from "react";
import { BarChart3, Beaker, MapPin } from "lucide-react";
import { NirmayaEngineHeader } from "@/components/scientist/NirmayaEngine/NirmayaEngineHeader";
import { DataInputPanel } from "@/components/scientist/NirmayaEngine/DataInputPanel";
import { AnalysisProgress } from "@/components/scientist/NirmayaEngine/AnalysisProgress";
import { ResultsMetrics } from "@/components/scientist/NirmayaEngine/ResultsMetrics";
import { LocationResultsTable } from "@/components/scientist/NirmayaEngine/LocationResultsTable";
import type { CalculationResult } from "@/types/nirmaya.types";

const NirmayaEngine = () => {
  const [uploadId, setUploadId] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [progress] = useState(100);

  const metrics = [
    { label: "Samples Analyzed", value: '247', color: '#0ea5e9' },
    { label: "Avg HMPI", value: '117.8', color: '#0891b2' },
    { label: "Critical Sites", value: '23', color: '#ef4444' },
    { label: "Completion", value: '100%', color: '#10b981' },
  ];

  const handleUploadComplete = (result: CalculationResult) => {
    setUploadId(result.upload_id);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <NirmayaEngineHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataInputPanel onUploadComplete={handleUploadComplete} />
          </div>
          <div>
            <AnalysisProgress progress={progress} />
          </div>
        </div>

        <ResultsMetrics metrics={metrics} />
        <LocationResultsTable uploadId={uploadId} refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default NirmayaEngine;
