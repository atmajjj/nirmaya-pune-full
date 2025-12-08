import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Cpu, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NiraChatbotHeaderProps {
  onClearChat: () => void;
  totalSources?: number;
  trainedSources?: number;
}

const NiraChatbotHeader = ({ onClearChat, totalSources = 0, trainedSources = 0 }: NiraChatbotHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-800 tracking-wide">NIRA AI Chatbot Knowledge Base</h1>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                  <Cpu className="w-3 h-3 mr-1" />
                  Training Mode
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1">Upload research papers & findings to enhance NIRA AI Chatbot's knowledge</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Training Stats */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 rounded-lg border border-slate-200/80">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Database className="w-4 h-4 text-blue-500" />
                <span><span className="font-semibold text-slate-800">{totalSources}</span> Documents</span>
              </div>
            </div>
            
            {/* Action Button */}
            <Button
              variant="outline"
              onClick={onClearChat}
              className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NiraChatbotHeader;
