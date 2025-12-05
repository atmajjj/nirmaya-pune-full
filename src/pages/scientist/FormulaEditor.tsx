import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BarChart3, Beaker, MapPin } from "lucide-react";
import { FormulaEditorHeader } from "@/components/scientist/FormulaEditor/FormulaEditorHeader";
import { EditorPanel } from "@/components/scientist/FormulaEditor/EditorPanel";
import { SavedFormulas } from "@/components/scientist/FormulaEditor/SavedFormulas";
import { AvailableVariables } from "@/components/scientist/FormulaEditor/AvailableVariables";
import { savedFormulas, availableVariables } from "@/components/scientist/FormulaEditor/formulasData";

const FormulaEditor = () => {
  
  const navItems = [
    { title: "Overview", path: "/scientist/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Beaker className="w-5 h-5" /> },
    { title: "Formula Editor", path: "/scientist/formula-editor", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Geo-Map", path: "/scientist/geo-map", icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout navItems={navItems} userRole="scientist">
      <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        <FormulaEditorHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EditorPanel />
            <SavedFormulas formulas={savedFormulas} />
          </div>
          <div>
            <AvailableVariables variables={availableVariables} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FormulaEditor;
