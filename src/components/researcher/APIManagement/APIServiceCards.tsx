import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Database, CheckCircle, ExternalLink, Copy, BarChart3 } from "lucide-react";
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
                <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-slate-900">{api.name}</h3>
                    <Badge variant="outline" className="bg-brand/10 text-brand border-brand/30 text-xs flex items-center gap-1">
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
                      className="h-5 px-1.5 text-brand hover:text-brand-light hover:bg-brand/10"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <code className="text-xs text-slate-600 break-all">{api.baseUrl}</code>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-brand/30 text-brand hover:bg-brand/10 rounded-md text-xs"
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
    </div>
  );
};
