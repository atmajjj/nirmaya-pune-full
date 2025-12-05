import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Upload, Link, Plus, Sparkles, FileText, BookOpen, CheckCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Source } from './types';
import { Badge } from "@/components/ui/badge";

interface SourcesPanelProps {
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SourcesPanel = ({ sources, setSources, collapsed, onToggleCollapse }: SourcesPanelProps) => {
  const [searchSources, setSearchSources] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      const newSource: Source = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: 'file',
        fileType: file.type,
        dateAdded: new Date(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: 'pending'
      };
      
      setSources(prev => [...prev, newSource]);
      
      // Simulate processing pipeline
      setTimeout(() => {
        setSources(prev => prev.map(s => 
          s.id === newSource.id ? { ...s, status: 'processing' } : s
        ));
      }, 1000);
      
      setTimeout(() => {
        setSources(prev => prev.map(s => 
          s.id === newSource.id ? { ...s, status: 'trained' } : s
        ));
      }, 3500);
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlAdd = () => {
    const url = prompt('Enter research paper URL or DOI:');
    if (url && url.trim()) {
      try {
        const newSource: Source = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: url.includes('doi.org') ? `DOI: ${url.split('/').pop()}` : new URL(url).hostname,
          type: 'url',
          dateAdded: new Date(),
          content: url.trim(),
          status: 'pending'
        };
        
        setSources(prev => [...prev, newSource]);
        
        setTimeout(() => {
          setSources(prev => prev.map(s => 
            s.id === newSource.id ? { ...s, status: 'processing' } : s
          ));
        }, 1500);
        
        setTimeout(() => {
          setSources(prev => prev.map(s => 
            s.id === newSource.id ? { ...s, status: 'trained' } : s
          ));
        }, 4500);
      } catch {
        alert('Please enter a valid URL');
      }
    }
  };

  const handleTextAdd = () => {
    const text = prompt('Paste research findings or notes:');
    if (text && text.trim()) {
      const newSource: Source = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: `Research Note ${sources.filter(s => s.type === 'text').length + 1}`,
        type: 'text',
        dateAdded: new Date(),
        content: text.trim(),
        size: `${text.length} chars`,
        status: 'pending'
      };
      
      setSources(prev => [...prev, newSource]);
      
      setTimeout(() => {
        setSources(prev => prev.map(s => 
          s.id === newSource.id ? { ...s, status: 'trained' } : s
        ));
      }, 2000);
    }
  };

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(source => source.id !== id));
  };

  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(searchSources.toLowerCase())
  );
  
  const trainedCount = sources.filter(s => s.status === 'trained').length;
  const processingCount = sources.filter(s => s.status === 'processing').length;
  const pendingCount = sources.filter(s => s.status === 'pending').length;

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'trained':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-slate-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'trained':
        return 'Integrated';
      case 'processing':
        return 'Processing...';
      case 'pending':
        return 'Queued';
      default:
        return 'Queued';
    }
  };

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden",
      collapsed ? "w-0 overflow-hidden" : "w-96"
    )}>
      {/* Training Documents Header */}
      <div className="p-5 border-b border-gray-200/50 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0A3D62]" />
              Training Documents
            </h2>
            <p className="text-xs text-slate-500 mt-1">Upload documents to enhance NIRA</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Status Summary */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            {trainedCount} Trained
          </Badge>
          {processingCount > 0 && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              {processingCount} Processing
            </Badge>
          )}
          {pendingCount > 0 && (
            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {pendingCount} Queued
            </Badge>
          )}
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={searchSources}
            onChange={(e) => setSearchSources(e.target.value)}
            className="pl-9 bg-white/50 border-slate-300 focus:border-blue-400 focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Upload Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 bg-white/50 border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-[#0A3D62] hover:text-[#0A3D62] transition-all duration-200"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUrlAdd}
            className="flex-1 bg-white/50 border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-[#0A3D62] hover:text-[#0A3D62] transition-all duration-200"
          >
            <Link className="w-4 h-4 mr-1" />
            URL/DOI
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleTextAdd}
            className="flex-1 bg-white/50 border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-[#0A3D62] hover:text-[#0A3D62] transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Notes
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json,.xls"
        />
      </div>

      {/* Documents List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {filteredSources.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0A3D62]/10 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#0A3D62]" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">No training documents yet</h3>
            <p className="text-xs text-gray-500 mb-4">Upload research papers, datasets, or findings to train NIRA</p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Supported formats:</p>
              <p className="font-medium">PDF, DOC, DOCX, TXT, CSV, XLSX, JSON</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSources.map((source) => (
              <div
                key={source.id}
                className="group p-3 rounded-xl bg-white border border-slate-200 hover:border-[#0A3D62]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    source.status === 'trained' ? "bg-emerald-100" : 
                    source.status === 'processing' ? "bg-amber-100" : "bg-slate-100"
                  )}>
                    <FileText className={cn(
                      "w-5 h-5",
                      source.status === 'trained' ? "text-emerald-600" : 
                      source.status === 'processing' ? "text-amber-600" : "text-slate-500"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{source.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(source.status)}
                      <span className="text-xs text-slate-500">{getStatusText(source.status)}</span>
                      {source.size && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{source.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSource(source.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesPanel;
