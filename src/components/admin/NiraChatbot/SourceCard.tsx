import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Link, FileText, Image, File } from "lucide-react";
import { Source } from './types';

interface SourceCardProps {
  source: Source;
  onRemove: (id: string) => void;
}

const SourceCard = ({ source, onRemove }: SourceCardProps) => {
  const getFileIcon = (source: Source) => {
    if (source.type === 'url') return <Link className="w-4 h-4" />;
    if (source.type === 'text') return <FileText className="w-4 h-4" />;
    
    const fileType = source.fileType?.toLowerCase() || '';
    if (fileType.includes('image')) return <Image className="w-4 h-4" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg hover:border-blue-300/50 hover:bg-blue-50/30 transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
              {getFileIcon(source)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-700 transition-colors duration-200">{source.name}</h4>
              <p className="text-xs text-gray-500 mt-1 group-hover:text-blue-600/80 transition-colors duration-200">
                {source.type} • {source.size || 'Added'} • {source.dateAdded.toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(source.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceCard;
