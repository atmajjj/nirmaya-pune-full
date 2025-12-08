import { useState } from "react";
import SourcesPanel from "@/components/admin/NiraChatbot/SourcesPanel";
import { Source } from "@/components/admin/NiraChatbot/types";

const NiraChatbotRefactored = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const completedCount = sources.filter(s => s.status === 'completed').length;
  const processingCount = sources.filter(s => s.status === 'processing' || s.status === 'pending').length;
  const failedCount = sources.filter(s => s.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">NIRA AI Chatbot Training Center</h1>
                <p className="text-sm sm:text-base text-slate-600">Upload and manage training documents to enhance NIRA AI Chatbot's knowledge base</p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">Total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#0A3D62]">{sources.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-emerald-600 mb-1">Trained</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{completedCount}</p>
                </div>
                {(processingCount > 0 || failedCount > 0) && (
                  <div className="text-center">
                    <p className="text-xs text-amber-600 mb-1">Processing</p>
                    <p className="text-2xl sm:text-3xl font-bold text-amber-600">{processingCount}</p>
                  </div>
                )}
                {failedCount > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-red-600 mb-1">Failed</p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600">{failedCount}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Training Documents Panel */}
          <div className="max-w-5xl mx-auto">
            <SourcesPanel 
              sources={sources}
              setSources={setSources}
              collapsed={false}
              onToggleCollapse={() => {}}
            />
          </div>
        </div>
    </div>
  );
};

export default NiraChatbotRefactored;