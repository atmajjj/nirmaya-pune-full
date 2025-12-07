import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Sparkles, FileText, BookOpen, CheckCircle, Clock, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Source } from './types';
import { Badge } from "@/components/ui/badge";
import { chatbotService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import type { ChatbotDocument } from '@/types/chatbot.types';

interface SourcesPanelProps {
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SourcesPanel = ({ sources, setSources, collapsed, onToggleCollapse }: SourcesPanelProps) => {
  const [searchSources, setSearchSources] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await chatbotService.getDocuments();
        if (response.success) {
          const mappedSources: Source[] = response.data.map((doc: ChatbotDocument) => ({
            id: doc.id.toString(),
            name: doc.name,
            type: 'file',
            fileType: doc.mime_type,
            dateAdded: new Date(doc.created_at),
            size: `${(doc.file_size / 1024 / 1024).toFixed(2)} MB`,
            status: doc.status as any
          }));
          setSources(mappedSources);
        }
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        toast({
          title: "Error",
          description: "Failed to load documents.",
          variant: "destructive",
        });
      }
    };

    fetchDocuments();
  }, [setSources, toast]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        // Check file size (20MB limit)
        if (file.size > 20 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 20MB limit.`,
            variant: "destructive",
          });
          continue;
        }

        // Check file type
        const allowedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/markdown'];
        if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md')) {
          toast({
            title: "Unsupported file type",
            description: `${file.name} is not supported. Use PDF, DOC, DOCX, TXT, or MD files.`,
            variant: "destructive",
          });
          continue;
        }

        const response = await chatbotService.uploadDocument(file, file.name);

        if (response.success) {
          toast({
            title: "Upload successful",
            description: `${file.name} uploaded and training started.`,
          });

          // Add to sources list
          const newSource: Source = {
            id: response.data.id.toString(),
            name: response.data.name,
            type: 'file',
            fileType: file.type,
            dateAdded: new Date(),
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            status: 'pending'
          };
          setSources(prev => [...prev, newSource]);

          // Refresh documents after a delay to show processing
          setTimeout(() => {
            fetchDocuments();
          }, 2000);
        } else {
          throw new Error('Upload failed');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await chatbotService.getDocuments();
      if (response.success) {
        const mappedSources: Source[] = response.data.map((doc: ChatbotDocument) => ({
          id: doc.id.toString(),
          name: doc.name,
          type: 'file',
          fileType: doc.mime_type,
          dateAdded: new Date(doc.created_at),
          size: `${(doc.file_size / 1024 / 1024).toFixed(2)} MB`,
          status: doc.status as any
        }));
        setSources(mappedSources);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await chatbotService.deleteDocument(parseInt(documentId));
      toast({
        title: "Document deleted",
        description: "Document has been removed successfully.",
      });
      setSources(prev => prev.filter(s => s.id !== documentId));
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
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
      "bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden h-[calc(100vh-250px)]",
      collapsed ? "w-0 overflow-hidden" : "w-full"
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
        </div>
        
        {/* Upload Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white border-0 transition-all duration-200 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.md"
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
              <p className="font-medium">PDF, DOC, DOCX, TXT, MD</p>
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
                    onClick={() => handleDeleteDocument(source.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
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
