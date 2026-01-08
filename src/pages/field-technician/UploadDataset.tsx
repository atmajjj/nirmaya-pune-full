import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, X, Download, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { dataSourceService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const UploadDataset = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedDataSourceId, setUploadedDataSourceId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type - accept CSV and Excel files
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        setUploadError("Please upload a CSV or Excel file (.csv, .xlsx, .xls)");
        setFile(null);
        return;
      }

      // Validate file size (50MB as per API docs)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setUploadError("File size must be less than 50MB");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setUploadError("");
      setUploadSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const fileExtension = droppedFile.name.substring(droppedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        setUploadError("Please upload a CSV or Excel file (.csv, .xlsx, .xls)");
        return;
      }
      if (droppedFile.size > 50 * 1024 * 1024) {
        setUploadError("File size must be less than 50MB");
        return;
      }
      setFile(droppedFile);
      setUploadError("");
      setUploadSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setUploadError("Please select a file");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      // Upload file using data source service with optional description
      const dataSource = await dataSourceService.upload(file, description || undefined);

      // Success - show success message
      setUploadSuccess(true);
      setUploadedDataSourceId(dataSource.id);
      
      // Show toast notification
      toast({
        title: "Upload Successful",
        description: "Your dataset has been uploaded and will be processed shortly.",
      });

      // Reset form
      setFile(null);
      setDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Optionally poll for processing status
      if (dataSource.status === 'pending' || dataSource.status === 'processing') {
        // Poll in background - no need to await
        dataSourceService.pollStatus(dataSource.id).then((finalDataSource) => {
          if (finalDataSource.status === 'available') {
            toast({
              title: "Processing Complete",
              description: "Your dataset is now available for use.",
            });
          } else if (finalDataSource.status === 'failed') {
            toast({
              title: "Processing Failed",
              description: finalDataSource.error_message || "An error occurred during processing.",
              variant: "destructive",
            });
          }
        }).catch(() => {
          // Ignore polling errors
        });
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to upload dataset. Please try again.";
      setUploadError(errorMessage);
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Upload Dataset</h1>
              <p className="text-sm text-slate-600">Upload water quality data for analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900 font-semibold">Data Sharing</AlertTitle>
        <AlertDescription className="text-blue-800">
          Your uploaded data will be automatically shared with scientists on the platform for analysis and research purposes. This enables collaborative water quality monitoring and faster insights.
        </AlertDescription>
      </Alert>

      {/* Success Alert */}
      {uploadSuccess && (
        <Alert className="bg-emerald-50 border-emerald-200">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            Dataset uploaded successfully! Your data will be reviewed by administrators before processing.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {uploadError && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {uploadError}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Dataset Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Mumbai Water Quality Nov 2025 - Monthly monitoring data"
                    rows={4}
                  />
                  <p className="text-xs text-slate-500">Brief description including location, date range, or any relevant details</p>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>
                    Upload CSV File <span className="text-red-500">*</span>
                  </Label>
                  
                  {!file ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <p className="text-sm text-slate-600 mb-2">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-slate-500">
                        Supported: CSV, Excel (.csv, .xlsx, .xls) • Maximum: 50MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="border border-slate-300 rounded-lg p-4 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{file.name}</p>
                            <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="h-8 w-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={uploading || !file}
                  className="w-full bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62]"
                >
                  {uploading ? (
                    <>
                      <span className="mr-2">Uploading...</span>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Dataset
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines Sidebar */}
        <div className="space-y-6">
          {/* Upload Guidelines */}
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">1</span>
                  </div>
                  <p className="text-slate-700">CSV or Excel format (.csv, .xlsx, .xls)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <p className="text-slate-700">Maximum file size: 50MB</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <p className="text-slate-700">Follow the standard template format (download below)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600">4</span>
                  </div>
                  <p className="text-slate-700">Include location and water quality parameters</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Template */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Download className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">Download Template</h3>
                  <p className="text-sm text-slate-600">
                    Use our standard CSV template to ensure proper data format
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-300 hover:bg-blue-100"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/water_quality_template.csv';
                  link.download = 'water_quality_template.csv';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-medium text-amber-900 mb-1">Need Help?</h3>
                  <p className="text-sm text-amber-800">
                    If you encounter any issues or have questions about the upload process, please contact the system administrator.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadDataset;
