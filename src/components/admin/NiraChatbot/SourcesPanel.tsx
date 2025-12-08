import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Sparkles, FileText, BookOpen, CheckCircle, Clock, Loader2, Trash2, Search, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Source } from './types';
import { chatbotService } from '@/services/api';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import type { ChatbotDocument } from '@/types/chatbot.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourcesPanelProps {
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SourcesPanel = ({ sources, setSources, collapsed }: SourcesPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-refresh for processing documents
  useEffect(() => {
    const hasProcessing = sources.some(s => 
      s.status === 'pending' || s.status === 'processing'
    );
    
    if (hasProcessing) {
      const interval = setInterval(() => {
        fetchDocuments(true); // Silent refresh
      }, 5000); // Refresh every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [sources]);

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
    }
    
    try {
      const response = await chatbotService.getDocuments(1, 100); // Get all documents
      if (response.success) {
        const mappedSources: Source[] = response.data.map((doc: any) => ({
          id: doc.id.toString(),
          name: doc.name,
          type: 'file' as const,
          fileType: doc.mimeType || doc.mime_type,
          dateAdded: new Date(doc.createdAt || doc.created_at),
          size: formatFileSize(doc.fileSize || doc.file_size),
          status: doc.status,
          chunkCount: doc.chunkCount || doc.chunk_count || 0,
          errorMessage: doc.errorMessage || doc.error_message
        }));
        setSources(mappedSources);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      if (!silent) {
        showErrorToast("Error", "Failed to load documents.");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const file of files) {
        try {
          // Check file size (20MB limit)
          if (file.size > 20 * 1024 * 1024) {
            showErrorToast("File too large", `${file.name} exceeds 20MB limit.`);
            errorCount++;
            continue;
          }

          // Check file type
          const allowedTypes = [
            'application/pdf',
            'text/plain',
            'text/markdown',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
          ];
          
          const isAllowed = allowedTypes.includes(file.type) || 
                           file.name.endsWith('.md') || 
                           file.name.endsWith('.txt');
          
          if (!isAllowed) {
            showErrorToast("Unsupported file type", `${file.name} is not supported. Use PDF, DOC, DOCX, TXT, or MD files.`);
            errorCount++;
            continue;
          }

          const response = await chatbotService.uploadDocument(file, file.name);

          if (response.success) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          errorCount++;
        }
      }

      // Show summary toast
      if (successCount > 0) {
        showSuccessToast("Upload complete", `${successCount} file(s) uploaded successfully. ${errorCount > 0 ? `${errorCount} failed.` : 'Processing will begin shortly.'}`);
        
        // Refresh documents after a short delay
        setTimeout(() => {
          fetchDocuments();
        }, 1500);
      } else if (errorCount > 0) {
        showErrorToast("Upload failed", `Failed to upload ${errorCount} file(s).`);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteDocument = async (documentId: string, documentName: string) => {
    if (!confirm(`Are you sure you want to delete "${documentName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const numericId = parseInt(documentId, 10);
      if (isNaN(numericId)) {
        throw new Error('Invalid document ID');
      }
      
      console.log('Deleting document:', { documentId, numericId, documentName });
      await chatbotService.deleteDocument(numericId);
      
      showSuccessToast("Document deleted", `${documentName} has been removed successfully.`);
      setSources(prev => prev.filter(s => s.id !== documentId));
      
      // Refresh the list after deletion
      fetchDocuments(true);
    } catch (error) {
      console.error('Delete error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete document';
      showErrorToast("Delete failed", errorMessage);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDocuments();
  };

  // Filter sources
  const filteredSources = sources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || source.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'Trained';
      case 'processing':
        return 'Processing...';
      case 'pending':
        return 'Queued';
      case 'failed':
        return 'Failed';
      default:
        return 'Queued';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 border-emerald-200';
      case 'processing':
        return 'bg-amber-100 border-amber-200';
      case 'pending':
        return 'bg-blue-100 border-blue-200';
      case 'failed':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  // Count by status
  const statusCounts = {
    all: sources.length,
    pending: sources.filter(s => s.status === 'pending').length,
    processing: sources.filter(s => s.status === 'processing').length,
    completed: sources.filter(s => s.status === 'completed').length,
    failed: sources.filter(s => s.status === 'failed').length,
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
            <p className="text-xs text-slate-500 mt-1">Upload documents to enhance NIRA AI Chatbot</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-slate-600 hover:text-[#0A3D62] hover:bg-slate-100"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </Button>
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

        {/* Filters */}
        <div className="mt-4 space-y-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-sm bg-white"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 text-sm bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({statusCounts.all})</SelectItem>
              <SelectItem value="completed">Trained ({statusCounts.completed})</SelectItem>
              <SelectItem value="processing">Processing ({statusCounts.processing})</SelectItem>
              <SelectItem value="pending">Queued ({statusCounts.pending})</SelectItem>
              <SelectItem value="failed">Failed ({statusCounts.failed})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 text-[#0A3D62] animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading documents...</p>
          </div>
        ) : filteredSources.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0A3D62]/10 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#0A3D62]" />
            </div>
            {searchTerm || statusFilter !== 'all' ? (
              <>
                <h3 className="text-sm font-medium text-gray-700 mb-2">No matching documents</h3>
                <p className="text-xs text-gray-500 mb-4">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-sm font-medium text-gray-700 mb-2">No training documents yet</h3>
                <p className="text-xs text-gray-500 mb-4">Upload research papers, datasets, or findings to train NIRA AI Chatbot</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Supported formats:</p>
                  <p className="font-medium">PDF, DOC, DOCX, TXT, MD</p>
                  <p className="text-[10px] mt-2">Max size: 20MB per file</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSources.map((source) => (
              <div
                key={source.id}
                className={cn(
                  "group p-3 rounded-xl bg-white border hover:shadow-md transition-all duration-200",
                  getStatusColor(source.status)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    source.status === 'completed' ? "bg-emerald-100" : 
                    source.status === 'processing' ? "bg-amber-100" : 
                    source.status === 'failed' ? "bg-red-100" : "bg-blue-100"
                  )}>
                    <FileText className={cn(
                      "w-5 h-5",
                      source.status === 'completed' ? "text-emerald-600" : 
                      source.status === 'processing' ? "text-amber-600" : 
                      source.status === 'failed' ? "text-red-600" : "text-blue-500"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate" title={source.name}>
                      {source.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(source.status)}
                        <span className="text-xs text-slate-600">{getStatusText(source.status)}</span>
                      </div>
                      {source.size && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{source.size}</span>
                        </>
                      )}
                      {source.status === 'completed' && source.chunkCount && source.chunkCount > 0 && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{source.chunkCount} chunks</span>
                        </>
                      )}
                    </div>
                    {source.status === 'failed' && source.errorMessage && (
                      <p className="text-xs text-red-600 mt-1 line-clamp-2">
                        Error: {source.errorMessage}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 mt-1">
                      {source.dateAdded.toLocaleDateString()} {source.dateAdded.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(source.id, source.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 h-8 w-8 p-0"
                    title="Delete document"
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