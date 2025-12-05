import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Copy, Play } from "lucide-react";

interface EndpointsListProps {
  apiName: string;
  endpoints: Array<{
    name: string;
    method: string;
    endpoint: string;
    description: string;
    sampleRequest?: string;
  }>;
  copyToClipboard: (text: string) => void;
}

export const EndpointsList = ({ apiName, endpoints, copyToClipboard }: EndpointsListProps) => {
  return (
    <Card className="bg-white border border-slate-200 rounded-lg">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">{apiName}</h3>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 text-xs">
            {endpoints.length} Endpoints
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        {endpoints.map((endpoint) => (
          <div 
            key={endpoint.name} 
            className="p-4 rounded-md border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white text-xs">
                  {endpoint.method}
                </Badge>
                <h4 className="text-sm font-medium text-slate-900">{endpoint.name}</h4>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(endpoint.endpoint)}
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-7 w-7 p-0"
                  aria-label="Copy endpoint URL"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 w-7 p-0"
                  aria-label="Run endpoint"
                >
                  <Play className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-2">{endpoint.description}</p>
            <div className="bg-slate-800 rounded-md p-3">
              <code className="text-xs text-emerald-400 font-mono break-all">{endpoint.endpoint}</code>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
