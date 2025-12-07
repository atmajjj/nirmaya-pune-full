import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BarChart3, Beaker, MapPin } from "lucide-react";
import { HMPIEngineHeader } from "@/components/scientist/HMPIEngine/HMPIEngineHeader";
import { DataInputPanel } from "@/components/scientist/HMPIEngine/DataInputPanel";
import { AnalysisProgress } from "@/components/scientist/HMPIEngine/AnalysisProgress";
import { ResultsMetrics } from "@/components/scientist/HMPIEngine/ResultsMetrics";
import { LocationResultsTable } from "@/components/scientist/HMPIEngine/LocationResultsTable";
import NIRAChatbot from "@/components/NIRAChatbot";
import type { CalculationResult } from "@/types/hmpi.types";

const HMPIEngine = () => {
  const [uploadId, setUploadId] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [progress] = useState(100);

  const navItems = [
    { title: "Overview", path: "/scientist/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Beaker className="w-5 h-5" /> },
    { title: "Formula Editor", path: "/scientist/formula-editor", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Geo-Map", path: "/scientist/geo-map", icon: <MapPin className="w-5 h-5" /> },
  ];

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
    <DashboardLayout navItems={navItems} userRole="scientist">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <HMPIEngineHeader />
        
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

      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default HMPIEngine;
