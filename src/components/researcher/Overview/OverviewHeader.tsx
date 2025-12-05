import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Eye } from "lucide-react";

export const OverviewHeader = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Research Overview</h1>
              <p className="text-sm text-slate-500">Track publications, citations, and research impact</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <Plus className="w-4 h-4 mr-2" />
              New Publication
            </Button>
            <Button className="bg-teal-600 text-white hover:bg-teal-700">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
