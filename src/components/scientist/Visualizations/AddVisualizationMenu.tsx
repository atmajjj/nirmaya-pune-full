import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  TrendingUp,
  BarChart3,
  PieChart,
  Map,
  Grid3x3,
  LineChart,
  BoxSelect,
  Circle,
  Scale,
  BarChart,
  Radar,
  X,
  ChevronRight
} from 'lucide-react';
import { visualizationTypes, categoryLabels } from './visualizationData';
import { CategoryType, VisualizationType } from './types';
import VisualizationPreview from './VisualizationPreview';
import VisualizationCustomizationPanel from './VisualizationCustomizationPanel';
import { UniversalOptions, ChartSpecificOptions, SaveAsType } from './customizationTypes';

interface AddVisualizationMenuProps {
  onSelectVisualization?: (vizType: VisualizationType, config?: { universal: UniversalOptions; chartSpecific: ChartSpecificOptions; saveAs: SaveAsType }) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  BarChart: <BarChart className="h-5 w-5" />,
  PieChart: <PieChart className="h-5 w-5" />,
  Map: <Map className="h-5 w-5" />,
  Grid3x3: <Grid3x3 className="h-5 w-5" />,
  LineChart: <LineChart className="h-5 w-5" />,
  BoxSelect: <BoxSelect className="h-5 w-5" />,
  Circle: <Circle className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  Radar: <Radar className="h-5 w-5" />,
  ScatterChart: <Circle className="h-5 w-5" />
};

const categoryColors: Record<string, string> = {
  trends: 'bg-blue-100 text-blue-700 border-blue-200',
  comparison: 'bg-green-100 text-green-700 border-green-200',
  distribution: 'bg-purple-100 text-purple-700 border-purple-200',
  spatial: 'bg-amber-100 text-amber-700 border-amber-200',
  correlation: 'bg-rose-100 text-rose-700 border-rose-200'
};

const categoryIcons: Record<string, React.ReactNode> = {
  trends: <TrendingUp className="h-4 w-4" />,
  comparison: <BarChart3 className="h-4 w-4" />,
  distribution: <PieChart className="h-4 w-4" />,
  spatial: <Map className="h-4 w-4" />,
  correlation: <Grid3x3 className="h-4 w-4" />
};

const AddVisualizationMenu: React.FC<AddVisualizationMenuProps> = ({ onSelectVisualization }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedViz, setSelectedViz] = useState<VisualizationType | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const categories: CategoryType[] = ['all', 'trends', 'comparison', 'distribution', 'spatial', 'correlation'];

  const filteredVisualizations = visualizationTypes.filter(viz => {
    const matchesSearch = 
      viz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || viz.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectVisualization = (viz: VisualizationType) => {
    setSelectedViz(viz);
    setShowPreview(true);
  };

  const handleCustomizeVisualization = () => {
    // Open customization panel
    setShowPreview(false);
    setShowCustomization(true);
  };

  const handleAddDirectly = () => {
    // Add directly to dashboard without customization
    if (selectedViz && onSelectVisualization) {
      onSelectVisualization(selectedViz);
    }
    setShowPreview(false);
    setSelectedViz(null);
    setIsOpen(false);
  };

  const handleSaveCustomization = (config: { universal: UniversalOptions; chartSpecific: ChartSpecificOptions; saveAs: SaveAsType }) => {
    if (selectedViz && onSelectVisualization) {
      onSelectVisualization(selectedViz, config);
    }
    setShowCustomization(false);
    setSelectedViz(null);
    setIsOpen(false);
  };

  const handleBack = () => {
    if (showCustomization) {
      setShowCustomization(false);
      setShowPreview(true);
    } else {
      setShowPreview(false);
      setSelectedViz(null);
    }
  };

  const handleBackToList = () => {
    setShowCustomization(false);
    setShowPreview(false);
    setSelectedViz(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Visualization
        </Button>
      </DialogTrigger>
      
      <DialogContent className={`${showCustomization ? 'max-w-6xl' : 'max-w-4xl'} max-h-[85vh] p-0 overflow-hidden bg-gradient-to-b from-slate-50 to-white`}>
        {showCustomization && selectedViz ? (
          /* Customization Panel */
          <VisualizationCustomizationPanel
            visualization={selectedViz}
            onBack={handleBackToList}
            onSave={handleSaveCustomization}
            iconMap={iconMap}
            categoryColors={categoryColors}
          />
        ) : !showPreview ? (
          <>
            {/* Header */}
            <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#0A3D62] to-[#0d4a75]">
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-[#6EDFF6]" />
                Add New Visualization
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                Choose from 12 specialized groundwater analysis visualizations
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-4">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search visualizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-[#0A3D62] focus:ring-[#0A3D62]/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      selectedCategory === category
                        ? 'bg-[#0A3D62] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category !== 'all' && categoryIcons[category]}
                    {categoryLabels[category]}
                    <Badge variant="secondary" className={`ml-1 text-xs ${
                      selectedCategory === category ? 'bg-white/20 text-white' : 'bg-slate-200'
                    }`}>
                      {category === 'all' 
                        ? visualizationTypes.length 
                        : visualizationTypes.filter(v => v.category === category).length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Visualization Grid */}
            <ScrollArea className="h-[400px] px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVisualizations.map((viz) => (
                  <button
                    key={viz.id}
                    onClick={() => handleSelectVisualization(viz)}
                    className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0A3D62] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${categoryColors[viz.category]} transition-transform group-hover:scale-110`}>
                        {iconMap[viz.icon]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-slate-800 group-hover:text-[#0A3D62] transition-colors">
                            {viz.name}
                          </h3>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0A3D62] group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                          {viz.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {viz.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {filteredVisualizations.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No visualizations found matching your search.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="text-[#0A3D62] hover:underline mt-2 text-sm"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          /* Preview Mode */
          <VisualizationPreview
            visualization={selectedViz!}
            onBack={handleBack}
            onAdd={handleAddDirectly}
            onCustomize={handleCustomizeVisualization}
            iconMap={iconMap}
            categoryColors={categoryColors}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddVisualizationMenu;
