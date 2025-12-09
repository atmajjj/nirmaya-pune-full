import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NirmayaEngineHeader } from "@/components/scientist/NirmayaEngine/NirmayaEngineHeader";
import { DataInputPanel } from "@/components/scientist/NirmayaEngine/DataInputPanel";
import { LocationResultsTable } from "@/components/scientist/NirmayaEngine/LocationResultsTable";
import { ResultsSummaryCard } from "@/components/scientist/NirmayaEngine/ResultsSummaryCard";
import type { CalculationResult } from "@/types/nirmaya.types";

const NirmayaEngine = () => {
  const location = useLocation();
  const [uploadId, setUploadId] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // Handle incoming state from Data Sources page
  useEffect(() => {
    if (location.state) {
      const { calculationResult: result, uploadId: id, fromDataSource } = location.state as any;
      
      if (fromDataSource && result && id) {
        setUploadId(id);
        setCalculationResult(result);
        setRefreshTrigger(prev => prev + 1);
        
        // Clear the state so refresh doesn't reload the same data
        window.history.replaceState({}, document.title);
        
        // Scroll to results
        setTimeout(() => {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  const handleUploadComplete = (result: CalculationResult) => {
    setUploadId(result.upload_id);
    setCalculationResult(result);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleNewAnalysis = () => {
    setUploadId(null);
    setCalculationResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <NirmayaEngineHeader />
        
        <DataInputPanel onUploadComplete={handleUploadComplete} />

        {calculationResult && <ResultsSummaryCard result={calculationResult} />}
        
        {uploadId && <LocationResultsTable uploadId={uploadId} refreshTrigger={refreshTrigger} onNewAnalysis={handleNewAnalysis} />}
    </div>
  );
};

export default NirmayaEngine;
