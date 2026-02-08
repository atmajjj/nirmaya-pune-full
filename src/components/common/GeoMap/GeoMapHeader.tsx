import { Button } from "@/components/ui/button";
import { Globe, Download, Share2, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeoMapHeaderProps {
  onRefresh?: () => Promise<void> | void;
  onExport?: () => void;
  isLoading?: boolean;
}

export const GeoMapHeader = ({ onRefresh, onExport, isLoading = false }: GeoMapHeaderProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Interactive Geo-Map - Groundwater Quality',
          text: 'Check out this groundwater contamination map from Nirmaya',
          url: shareUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Map link has been shared.",
        });
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Map URL copied to clipboard.",
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy link. Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Interactive Geo-Map</h1>
            <p className="text-sm text-slate-600">Visualize spatial groundwater contamination patterns</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2"
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/70 border-slate-300 hover:bg-slate-100 text-slate-700 gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            onClick={onExport}
            disabled={isLoading}
          >
            <Download className="w-4 h-4" />
            Export Map
          </Button>
        </div>
      </div>
    </div>
  );
};
