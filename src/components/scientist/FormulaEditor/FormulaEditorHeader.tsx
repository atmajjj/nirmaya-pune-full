import { Calculator } from "lucide-react";
export const FormulaEditorHeader = () => {
return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">"Formula Editor"</h1>
            <p className="text-sm text-slate-600">"Create and manage custom analysis formulas"</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/70 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-md transition-all text-sm font-medium">"Load Template"</button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium">"Save Formula"</button>
        </div>
      </div>
    </div>
  );
};
