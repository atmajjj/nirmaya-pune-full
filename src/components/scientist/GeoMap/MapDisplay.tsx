import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const MapDisplay = () => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="relative w-full h-[500px] bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">Interactive Map</p>
              <p className="text-sm text-slate-500 mt-1">Sample Points Overlay</p>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md border border-slate-200">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-700">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-700">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
