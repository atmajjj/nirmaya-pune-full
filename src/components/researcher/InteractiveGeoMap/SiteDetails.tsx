import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import type { SampleSite } from './types';

interface SiteDetailsProps {
  site: SampleSite | null;
  getRiskBadge: (risk: string) => string;
  getMetalStatus: (value: number, limit: number) => { status: string; color: string };
}

export const SiteDetails = ({ site, getRiskBadge, getMetalStatus }: SiteDetailsProps) => {
  if (!site) {
    return (
      <Card className="bg-white border border-slate-200 rounded-lg">
        <CardContent className="p-6 text-center">
          <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 text-sm">Select a site on the map to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">{site.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
            </p>
          </div>
          <Badge className={getRiskBadge(site.riskLevel)}>
            {site.riskLevel} Risk
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">HMPI Score</span>
              <span className="text-lg font-bold text-slate-900">{site.hmpiScore}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              Last sampled: {site.lastSampled}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Heavy Metal Levels</h4>
            <div className="space-y-2">
              {Object.entries(site.metals).map(([metal, data]) => {
                const metalStatus = getMetalStatus(data.value, data.limit);
                return (
                  <div key={metal} className="p-2 rounded-md bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-slate-700 capitalize">{metal}</span>
                      <span className={`text-xs font-semibold ${metalStatus.color}`}>
                        {data.value} {data.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Limit: {data.limit} {data.unit}</span>
                      <span className={metalStatus.color}>{metalStatus.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Button className="w-full bg-teal-600 text-white hover:bg-teal-700 rounded-md text-sm">
          <Eye className="w-4 h-4 mr-2" />
          View Full Report
        </Button>
      </CardContent>
    </Card>
  );
};
