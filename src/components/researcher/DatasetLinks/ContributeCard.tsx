import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, HelpCircle } from "lucide-react";

export const ContributeCard = () => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Contribute Datasets</h3>
            <p className="text-sm text-slate-500 mb-3">
              Have valuable water quality data? Share it with the research community to advance groundwater contamination studies.
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-brand text-white hover:bg-brand-light rounded-md text-xs"
              >
                <Upload className="w-3 h-3 mr-1.5" />
                Submit Dataset
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-brand/30 text-brand hover:bg-brand/10 rounded-md text-xs"
              >
                <HelpCircle className="w-3 h-3 mr-1.5" />
                Guidelines
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
