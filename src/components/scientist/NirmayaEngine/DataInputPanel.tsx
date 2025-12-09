import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, PenTool, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { nirmayaEngineService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { CSVPreviewResult, CalculationResult } from "@/types/nirmaya.types";

interface DataInputPanelProps {
  onUploadComplete?: (result: CalculationResult) => void;
  onPreviewComplete?: (preview: CSVPreviewResult) => void;
}

export const DataInputPanel = ({ onUploadComplete, onPreviewComplete }: DataInputPanelProps) => {
  const [formData, setFormData] = useState({ location: '', As: '', Cr: '', Pb: '', Cd: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleCalculate = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file first",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await nirmayaEngineService.calculateIndices(selectedFile);
      if (response.success) {
        onUploadComplete?.(response.data);
        toast({
          title: "Calculation complete",
          description: `Successfully processed ${response.data.processed_stations} stations`,
        });
        
        // Clear file after successful calculation
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "Calculation failed",
        description: error instanceof Error ? error.message : "Failed to calculate indices",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-slate-800 text-lg font-semibold">Data Input</CardTitle>
        <p className="text-sm text-slate-500 mt-1">Select Input Method</p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600 mb-2">Drop CSV File or Click to Browse</p>
              <p className="text-xs text-slate-500 mb-4">Maximum file size: 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Choose File
              </Button>
            </div>

            {selectedFile && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(2)} KB)
                </AlertDescription>
              </Alert>
            )}

            {selectedFile && (
              <Button 
                className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleCalculate}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Calculating Indices...
                  </>
                ) : (
                  'Calculate HPI, MI & WQI'
                )}
              </Button>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="location" className="text-sm font-medium text-slate-700">Sample Location</Label>
                <Input
                  id="location"
                  placeholder="Sample Location Placeholder"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="As" className="text-sm font-medium text-slate-700">Arsenic (As) - mg/L</Label>
                <Input
                  id="As"
                  type="number"
                  placeholder="0.00"
                  value={formData.As}
                  onChange={(e) => setFormData({ ...formData, As: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Cr" className="text-sm font-medium text-slate-700">Chromium (Cr) - mg/L</Label>
                <Input
                  id="Cr"
                  type="number"
                  placeholder="0.00"
                  value={formData.Cr}
                  onChange={(e) => setFormData({ ...formData, Cr: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Pb" className="text-sm font-medium text-slate-700">Lead (Pb) - mg/L</Label>
                <Input
                  id="Pb"
                  type="number"
                  placeholder="0.00"
                  value={formData.Pb}
                  onChange={(e) => setFormData({ ...formData, Pb: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Cd" className="text-sm font-medium text-slate-700">Cadmium (Cd) - mg/L</Label>
                <Input
                  id="Cd"
                  type="number"
                  placeholder="0.00"
                  value={formData.Cd}
                  onChange={(e) => setFormData({ ...formData, Cd: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Add Sample
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
