import { Button } from "@/components/ui/button";
import { Code2, Key, RefreshCw } from "lucide-react";

export const APIManagementHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Public APIs & Integration</h1>
            <p className="text-sm text-slate-600">Access water quality data through our comprehensive API ecosystem</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2">
            <Key className="w-4 h-4" />
            Generate Key
          </Button>
        </div>
      </div>
    </div>
  );
};
