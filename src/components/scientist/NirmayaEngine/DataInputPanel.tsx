import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, PenTool, Loader2, CheckCircle, AlertCircle, Plus, X } from "lucide-react";
import { nirmayaEngineService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { CSVPreviewResult, CalculationResult } from "@/types/nirmaya.types";

interface DataInputPanelProps {
  onUploadComplete?: (result: CalculationResult) => void;
  onPreviewComplete?: (preview: CSVPreviewResult) => void;
}

// Available heavy metal fields (ppb/µg/L)
const METAL_FIELDS = [
  { id: 'As', label: 'Arsenic', unit: 'ppb', category: 'common' },
  { id: 'Cd', label: 'Cadmium', unit: 'ppb', category: 'common' },
  { id: 'Cr', label: 'Chromium', unit: 'ppb', category: 'common' },
  { id: 'Cu', label: 'Copper', unit: 'ppb', category: 'common' },
  { id: 'Fe', label: 'Iron', unit: 'ppb', category: 'common' },
  { id: 'Pb', label: 'Lead', unit: 'ppb', category: 'common' },
  { id: 'Hg', label: 'Mercury', unit: 'ppb', category: 'common' },
  { id: 'Ni', label: 'Nickel', unit: 'ppb', category: 'common' },
  { id: 'Zn', label: 'Zinc', unit: 'ppb', category: 'common' },
  { id: 'Al', label: 'Aluminum', unit: 'ppb', category: 'advanced' },
  { id: 'Ba', label: 'Barium', unit: 'ppb', category: 'advanced' },
  { id: 'Mn', label: 'Manganese', unit: 'ppb', category: 'advanced' },
  { id: 'Se', label: 'Selenium', unit: 'ppb', category: 'advanced' },
  { id: 'Ag', label: 'Silver', unit: 'ppb', category: 'advanced' },
  { id: 'Mo', label: 'Molybdenum', unit: 'ppb', category: 'advanced' },
  { id: 'Sb', label: 'Antimony', unit: 'ppb', category: 'advanced' },
  { id: 'Co', label: 'Cobalt', unit: 'ppb', category: 'advanced' },
  { id: 'V', label: 'Vanadium', unit: 'ppb', category: 'advanced' },
  { id: 'U', label: 'Uranium', unit: 'ppb', range: null },
];

export const DataInputPanel = ({ onUploadComplete, onPreviewComplete }: DataInputPanelProps) => {
  const [stationId, setStationId] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [metalValues, setMetalValues] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAddMetal = (metalId: string) => {
    if (!selectedMetals.includes(metalId)) {
      setSelectedMetals([...selectedMetals, metalId]);
      setMetalValues({ ...metalValues, [metalId]: '' });
    }
  };

  const handleRemoveMetal = (metalId: string) => {
    setSelectedMetals(selectedMetals.filter(id => id !== metalId));
    const newValues = { ...metalValues };
    delete newValues[metalId];
    setMetalValues(newValues);
  };

  const handleMetalValueChange = (metalId: string, value: string) => {
    setMetalValues({ ...metalValues, [metalId]: value });
  };

  const handleManualCalculate = async () => {
    if (!stationId) {
      toast({
        title: "Station ID required",
        description: "Please enter a station ID",
        variant: "destructive",
      });
      return;
    }

    if (selectedMetals.length === 0) {
      toast({
        title: "No parameters selected",
        description: "Please add at least one metal parameter",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    try {
      const metals: Record<string, number> = {};
      selectedMetals.forEach(id => {
        if (metalValues[id]) {
          metals[id] = parseFloat(metalValues[id]);
        }
      });

      const payload: any = {
        station_id: stationId,
        save_to_database: true,
      };

      if (state) payload.state = state;
      if (city) payload.city = city;
      if (latitude) payload.latitude = parseFloat(latitude);
      if (longitude) payload.longitude = parseFloat(longitude);
      if (Object.keys(metals).length > 0) payload.metals = metals;

      const response = await nirmayaEngineService.calculateManual(payload);
      
      if (response.success) {
        toast({
          title: "Calculation complete",
          description: "Indices calculated successfully",
        });
        
        // Transform the response to match CalculationResult type
        const calculationResult: CalculationResult = {
          upload_id: response.data.saved_id || 0,
          processed_stations: 1,
          total_stations: 1,
          failed_stations: 0,
          calculations: [],
          errors: [],
          available_indices: {
            hpi: selectedMetals.length > 0,
            mi: selectedMetals.length > 0,
          },
          metals_analyzed: selectedMetals,
        };
        
        onUploadComplete?.(calculationResult);
        
        // Clear form
        setStationId('');
        setState('');
        setCity('');
        setLatitude('');
        setLongitude('');
        setSelectedMetals([]);
        setMetalValues({});
      }
    } catch (error) {
      console.error('Manual calculation error:', error);
      toast({
        title: "Calculation failed",
        description: error instanceof Error ? error.message : "Failed to calculate indices",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

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

    setFile(file);
  };

  const handleCalculate = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file first",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await nirmayaEngineService.calculateIndices(file);
      if (response.success) {
        onUploadComplete?.(response.data);
        toast({
          title: "Calculation complete",
          description: `Successfully processed ${response.data.processed_stations} stations`,
        });
        
        // Clear file after successful calculation
        setFile(null);
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

            {file && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
                </AlertDescription>
              </Alert>
            )}

            {file && (
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
                  'Calculate HPI & HEI'
                )}
              </Button>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            {/* Station Information */}
            <div className="space-y-3 pb-4 border-b">
              <h3 className="text-sm font-semibold text-slate-800">Station Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="stationId" className="text-sm font-medium text-slate-700">Station ID *</Label>
                  <Input
                    id="stationId"
                    placeholder="Enter station ID"
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-slate-700">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-slate-700">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="latitude" className="text-sm font-medium text-slate-700">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-sm font-medium text-slate-700">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Heavy Metal Parameters */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-800">Heavy Metal Parameters</h3>
              
              {/* Selected Metals */}
              {selectedMetals.length > 0 && (
                <div className="space-y-2">
                  {selectedMetals.map(metalId => {
                    const metal = METAL_FIELDS.find(m => m.id === metalId);
                    if (!metal) return null;
                    
                    return (
                      <div key={metalId} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor={metalId} className="text-sm font-medium text-slate-700">
                            {metal.label} ({metal.unit})
                          </Label>
                          <Input
                            id={metalId}
                            type="number"
                            step="0.001"
                            placeholder="0.000"
                            value={metalValues[metalId] || ''}
                            onChange={(e) => handleMetalValueChange(metalId, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveMetal(metalId)}
                          className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Available Metals to Add */}
              {METAL_FIELDS.filter(metal => !selectedMetals.includes(metal.id)).length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Add Metal Parameters</Label>
                  <div className="flex flex-wrap gap-2">
                    {METAL_FIELDS.filter(metal => !selectedMetals.includes(metal.id)).map(metal => (
                      <Button
                        key={metal.id}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddMetal(metal.id)}
                        className="text-brand hover:bg-brand hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {metal.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={handleManualCalculate}
              className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!stationId || selectedMetals.length === 0 || isCalculating}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Calculate Indices'
              )}
            </Button>

            {selectedMetals.length === 0 && (
              <p className="text-xs text-slate-500 text-center">
                Add at least one metal parameter to continue
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
