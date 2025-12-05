import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Settings,
  Sliders,
  Eye,
  Save,
  Download,
  LayoutDashboard,
  FileText,
  Image,
  FileCode,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { VisualizationType } from './types';
import {
  UniversalOptions,
  ChartSpecificOptions,
  SaveAsType,
  defaultUniversalOptions,
  getDefaultChartOptions,
} from './customizationTypes';
import { UniversalSettingsPanel } from './UniversalSettingsPanel';
import { ChartSpecificSettingsPanel } from './ChartSpecificSettingsPanel';
import { LivePreviewPanel } from './LivePreviewPanel';

interface VisualizationCustomizationPanelProps {
  visualization: VisualizationType;
  onBack: () => void;
  onSave: (config: { universal: UniversalOptions; chartSpecific: ChartSpecificOptions; saveAs: SaveAsType }) => void;
  iconMap: Record<string, React.ReactNode>;
  categoryColors: Record<string, string>;
}

const VisualizationCustomizationPanel: React.FC<VisualizationCustomizationPanelProps> = ({
  visualization,
  onBack,
  onSave,
  iconMap,
  categoryColors,
}) => {
  // Initialize state with default options
  const [universalOptions, setUniversalOptions] = useState<UniversalOptions>({
    ...defaultUniversalOptions,
    title: visualization.name,
    subtitle: visualization.description.slice(0, 60) + '...',
  });

  const [chartSpecificOptions, setChartSpecificOptions] = useState<ChartSpecificOptions>(
    getDefaultChartOptions(visualization.id)
  );

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveFileName, setSaveFileName] = useState(visualization.name.replace(/\s+/g, '_'));
  const [saveDescription, setSaveDescription] = useState('');
  const [saveTags, setSaveTags] = useState<string[]>(visualization.tags);
  const [selectedSaveType, setSelectedSaveType] = useState<SaveAsType>('dashboard-widget');

  const handleReset = () => {
    setUniversalOptions({
      ...defaultUniversalOptions,
      title: visualization.name,
      subtitle: visualization.description.slice(0, 60) + '...',
    });
    setChartSpecificOptions(getDefaultChartOptions(visualization.id));
  };

  const handleSave = () => {
    onSave({
      universal: universalOptions,
      chartSpecific: chartSpecificOptions,
      saveAs: selectedSaveType,
    });
    setShowSaveDialog(false);
  };

  const saveOptions: { type: SaveAsType; icon: React.ReactNode; label: string; description: string }[] = [
    {
      type: 'dashboard-widget',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard Widget',
      description: 'Add to your dashboard for quick access',
    },
    {
      type: 'report-asset',
      icon: <FileText className="h-5 w-5" />,
      label: 'Report Asset',
      description: 'Save for use in generated reports',
    },
    {
      type: 'export-png',
      icon: <Image className="h-5 w-5" />,
      label: 'Export as PNG',
      description: 'Download as high-quality image',
    },
    {
      type: 'export-svg',
      icon: <FileCode className="h-5 w-5" />,
      label: 'Export as SVG',
      description: 'Download as scalable vector graphic',
    },
  ];

  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-brand to-brand-light flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-3 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to visualizations</span>
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${categoryColors[visualization.category]} shadow-lg`}>
              {iconMap[visualization.icon]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Customize Visualization</h2>
              <p className="text-slate-300 text-sm">{visualization.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              className="bg-brand-accent text-brand hover:bg-brand-accent/80"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Settings Panel - Left Side */}
        <div className="w-[380px] border-r border-slate-200 bg-white flex-shrink-0 flex flex-col">
          <Tabs defaultValue="universal" className="flex flex-col flex-1">
            <TabsList className="w-full justify-start px-4 pt-4 pb-0 bg-transparent border-b border-slate-200 rounded-none h-auto">
              <TabsTrigger
                value="universal"
                className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none rounded-b-none border-b-2 border-transparent data-[state=active]:border-brand px-4 py-2"
              >
                <Settings className="h-4 w-4 mr-2" />
                Universal
              </TabsTrigger>
              <TabsTrigger
                value="chart-specific"
                className="data-[state=active]:bg-slate-100 data-[state=active]:shadow-none rounded-b-none border-b-2 border-transparent data-[state=active]:border-brand px-4 py-2"
              >
                <Sliders className="h-4 w-4 mr-2" />
                Chart Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="universal" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <UniversalSettingsPanel
                    options={universalOptions}
                    onChange={setUniversalOptions}
                  />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chart-specific" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <ChartSpecificSettingsPanel
                    chartType={chartSpecificOptions}
                    onChange={setChartSpecificOptions}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel - Right Side */}
        <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#0A3D62]" />
              <span className="font-medium text-slate-700">Live Preview</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Auto-updating
            </Badge>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            <LivePreviewPanel
              visualization={visualization}
              universalOptions={universalOptions}
              chartSpecificOptions={chartSpecificOptions}
            />
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-[#0A3D62]" />
              Save Visualization
            </DialogTitle>
            <DialogDescription>
              Choose how you want to save your customized visualization
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* File Name */}
            <div>
              <Label className="text-sm text-slate-600">File Name</Label>
              <Input
                value={saveFileName}
                onChange={(e) => setSaveFileName(e.target.value)}
                placeholder="Enter file name..."
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm text-slate-600">Description (optional)</Label>
              <Input
                value={saveDescription}
                onChange={(e) => setSaveDescription(e.target.value)}
                placeholder="Brief description..."
                className="mt-1"
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm text-slate-600">Tags</Label>
              <div className="flex flex-wrap gap-1 mt-2">
                {saveTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => setSaveTags(saveTags.filter((t) => t !== tag))}
                  >
                    {tag}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Save Type Selection */}
            <div>
              <Label className="text-sm text-slate-600 mb-3 block">Save As</Label>
              <div className="grid grid-cols-2 gap-3">
                {saveOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedSaveType(option.type)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedSaveType === option.type
                        ? 'border-[#0A3D62] bg-[#0A3D62]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`${selectedSaveType === option.type ? 'text-[#0A3D62]' : 'text-slate-500'}`}>
                        {option.icon}
                      </div>
                      <span className={`text-sm font-medium ${selectedSaveType === option.type ? 'text-[#0A3D62]' : 'text-slate-700'}`}>
                        {option.label}
                      </span>
                      {selectedSaveType === option.type && (
                        <Check className="h-4 w-4 text-[#0A3D62] ml-auto" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              {selectedSaveType.startsWith('export') ? 'Export' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisualizationCustomizationPanel;
