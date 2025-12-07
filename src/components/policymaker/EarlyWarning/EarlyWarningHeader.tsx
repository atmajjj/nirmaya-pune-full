import { Brain, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarlyWarningHeaderProps {
  lastUpdated: Date;
  onRefresh: () => void;
}

const EarlyWarningHeader = ({ lastUpdated, onRefresh }: EarlyWarningHeaderProps) => {
return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Early Warning System</h1>
            <p className="text-sm text-slate-600">Predictive alerts and monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onRefresh} className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarningHeader;
