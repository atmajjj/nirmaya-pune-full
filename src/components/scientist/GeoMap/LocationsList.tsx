import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SampleLocation } from './types';

interface LocationsListProps {
  locations: SampleLocation[];
}

export const LocationsList = ({ locations }: LocationsListProps) => {
return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Sample Locations</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Groundwater monitoring sites</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{loc.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {loc.coordinates.lat.toFixed(4)}°N, {loc.coordinates.lng.toFixed(4)}°E
                  </p>
                </div>
                <Badge
                  variant={loc.risk === 'High' ? 'destructive' : loc.risk === 'Medium' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {loc.risk}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-600">HMPI Score</span>
                <span className="text-sm font-bold text-teal-600">{loc.hmpi}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">As</p>
                  <p className="text-sm font-semibold text-slate-800">{loc.metals.As}</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Cr</p>
                  <p className="text-sm font-semibold text-slate-800">{loc.metals.Cr}</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Pb</p>
                  <p className="text-sm font-semibold text-slate-800">{loc.metals.Pb}</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Cd</p>
                  <p className="text-sm font-semibold text-slate-800">{loc.metals.Cd}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
