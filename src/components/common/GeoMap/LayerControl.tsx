import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Layers } from "lucide-react";
import type { MapLayer } from './types';

interface LayerControlProps {
  layers: MapLayer[];
  layerVisibility: Record<string, boolean>;
  toggleLayer: (layerId: string) => void;
}

export const LayerControl = ({ layers, layerVisibility, toggleLayer }: LayerControlProps) => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardHeader className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">Layer Control</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div 
              key={layer.id} 
              className="flex items-center justify-between p-2 rounded-md border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: layer.color + '15', color: layer.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{layer.name}</p>
                  <p className="text-xs text-slate-500">{layer.description}</p>
                </div>
              </div>
              <Switch
                checked={layerVisibility[layer.id]}
                onCheckedChange={() => toggleLayer(layer.id)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
