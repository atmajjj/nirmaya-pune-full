import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Globe, GraduationCap, Database, FileText, FileSpreadsheet, FileJson, Download, ExternalLink, Calendar, HardDrive } from "lucide-react";
import type { Dataset } from './types';

interface DatasetCardsProps {
  datasets: Dataset[];
}

export const DatasetCards = ({ datasets }: DatasetCardsProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Government":
        return <Building className="w-4 h-4 text-blue-600" />;
      case "International":
        return <Globe className="w-4 h-4 text-brand" />;
      case "Academic":
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      default:
        return <Database className="w-4 h-4 text-slate-600" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="w-3 h-3" />;
      case "csv":
        return <FileSpreadsheet className="w-3 h-3" />;
      case "json":
        return <FileJson className="w-3 h-3" />;
      case "xlsx":
        return <FileSpreadsheet className="w-3 h-3" />;
      case "bibtex":
        return <FileText className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const getDatasetIcon = (category: string) => {
    switch (category) {
      case "government":
        return <Building className="w-5 h-5 text-white" />;
      case "international":
        return <Globe className="w-5 h-5 text-white" />;
      case "academic":
        return <GraduationCap className="w-5 h-5 text-white" />;
      default:
        return <Database className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="grid gap-3 mb-4">
      {datasets.map((dataset) => {
        const Icon = getDatasetIcon(dataset.category);
        return (
          <Card 
            key={dataset.id} 
            className={`bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors ${
              !dataset.available ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  dataset.category === 'government' ? 'bg-blue-600' :
                  dataset.category === 'international' ? 'bg-brand' :
                  'bg-purple-600'
                }`}>
                  {Icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {dataset.title}
                        </h3>
                        <Badge variant="outline" className="flex items-center gap-1 text-xs border-slate-300">
                          {getTypeIcon(dataset.type)}
                          <span>{dataset.type}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{dataset.description}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center flex-wrap gap-3 mb-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      <span>{dataset.source}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      <span>{dataset.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Updated: {dataset.updated}</span>
                    </div>
                  </div>

                  {/* Formats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Formats:</span>
                      {dataset.format.map((fmt, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5"
                        >
                          {getFormatIcon(fmt)}
                          <span>{fmt}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={!dataset.available}
                        className="border-brand/30 text-brand hover:bg-brand/10 rounded-md text-xs h-7"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        disabled={!dataset.available}
                        className="bg-brand text-white hover:bg-brand-light rounded-md text-xs h-7"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {!dataset.available && (
                    <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1.5 rounded border border-amber-200">
                      ⚠️ Currently unavailable - Coming soon
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
