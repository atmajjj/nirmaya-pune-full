import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Users, BarChart3, FileCheck, Database, Brain } from "lucide-react";
import SourcesPanel from "@/components/admin/NiraChatbot/SourcesPanel";
import { Source } from "@/components/admin/NiraChatbot/types";

const navItems = [
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "System Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "NIRA Training", path: "/admin/nira-chatbot", icon: <Brain className="w-5 h-5" /> },
];

const NiraChatbotRefactored = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const trainedCount = sources.filter(s => s.status === 'trained').length;

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">NIRA Training Center</h1>
                <p className="text-sm sm:text-base text-slate-600">Upload and manage training documents to enhance NIRA's knowledge base</p>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="text-center sm:text-right">
                  <p className="text-xs text-slate-500 mb-1">Total Documents</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#0A3D62]">{sources.length}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-xs text-slate-500 mb-1">Trained</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{trainedCount}</p>
                </div>
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
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default NiraChatbotRefactored;