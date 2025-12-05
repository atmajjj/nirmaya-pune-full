import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Database, CheckCircle, ExternalLink, Copy, BarChart3, Code2 } from "lucide-react";
import type { PublicAPI } from './types';

interface APIServiceCardsProps {
  apis: PublicAPI[];
  copyToClipboard: (text: string) => void;
}

export const APIServiceCards = ({ apis, copyToClipboard }: APIServiceCardsProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "globe":
        return Globe;
      case "database":
        return Database;
      case "chart":
        return BarChart3;
      default:
        return Database;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {apis.map((api) => {
        const IconComponent = getIconComponent(api.icon);
        return (
          <Card 
            key={api.id} 
            className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-slate-900">{api.name}</h3>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {api.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{api.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-500">Base URL</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(api.baseUrl)}
                      className="h-5 px-1.5 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <code className="text-xs text-slate-600 break-all">{api.baseUrl}</code>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 rounded-md text-xs"
                  onClick={() => window.open(api.baseUrl, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1.5" />
                  Visit API Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Request Access Card */}
      <Card className="bg-slate-50 border border-slate-200 rounded-lg">
        <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
          <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-3">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Need More APIs?</h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm">
            Request access to additional government and private water quality data APIs for your research
          </p>
          <Button className="bg-teal-600 text-white hover:bg-teal-700 rounded-md text-xs">
            Request API Access
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
