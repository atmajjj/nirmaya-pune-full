import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { BarChart3, Code2, Globe, LinkIcon, Beaker, BookOpen, Award, FlaskConical, DollarSign, Plus, Settings, BarChart2, LineChart, PieChart, RotateCcw, Save } from "lucide-react";
import { OverviewHeader } from "@/components/researcher/Overview/OverviewHeader";
import { MetricsCards } from "@/components/researcher/Overview/MetricsCards";
import { CitationsChart } from "@/components/researcher/Overview/CitationsChart";
import { ResearchAreasChart } from "@/components/researcher/Overview/ResearchAreasChart";
import { PublicationsList } from "@/components/researcher/Overview/PublicationsList";
import { ResearchStatusPanel } from "@/components/researcher/Overview/ResearchStatusPanel";
import { monthlyCitationsData, researchAreasData, recentPublications } from "@/components/researcher/Overview/overviewData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import type { MetricCard } from "@/components/researcher/Overview/types";

const metricsData: MetricCard[] = [
  { title: "Publications", value: "156", icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
  { title: "Citations", value: "42", icon: Award, gradient: "from-green-500 to-emerald-500" },
  { title: "Projects", value: "8", icon: FlaskConical, gradient: "from-purple-500 to-pink-500" },
  { title: "Research Grants", value: "8", icon: DollarSign, gradient: "from-orange-500 to-red-500" }
];

const ResearcherOverview = () => {
  const [showAddVisualization, setShowAddVisualization] = useState(false);
  const [showCustomizeDashboard, setShowCustomizeDashboard] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState<string | null>(null);
  
  // Dashboard visibility settings
  const [dashboardSettings, setDashboardSettings] = useState({
    keyResearchMetrics: true,
    researchTrendChart: true,
    topResearchAreas: true,
    recentPublications: true,
    hypothesisDistribution: true,
  });

  const navItems = [
    { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Dataset Links", path: "/researcher/datasets", icon: <LinkIcon className="w-5 h-5" /> },
    { title: "APIs", path: "/researcher/apis", icon: <Code2 className="w-5 h-5" /> },
    { title: "Workspace", path: "/researcher/workspace", icon: <Beaker className="w-5 h-5" /> },
    { title: "Geo-Map", path: "/researcher/geo-map", icon: <Globe className="w-5 h-5" /> },
  ];

  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: BarChart2 },
    { id: 'line', name: 'Line Chart', icon: LineChart },
    { id: 'pie', name: 'Pie Chart', icon: PieChart },
  ];

  const toggleSetting = (key: keyof typeof dashboardSettings) => {
    setDashboardSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetToDefault = () => {
    setDashboardSettings({
      keyResearchMetrics: true,
      researchTrendChart: true,
      topResearchAreas: true,
      recentPublications: true,
      hypothesisDistribution: true,
    });
  };

  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <div className="min-h-screen bg-slate-50">
        {/* Header with Add Visualization and Customize Dashboard buttons */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-blue-50 border border-slate-200/80 shadow-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-l from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#0d4a75] rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 tracking-wide">Research Dashboard Overview</h1>
                  <p className="text-sm text-slate-600">Comprehensive view of research activities, publications, and analytical insights</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="bg-gradient-to-r from-[#0A3D62] to-[#0d4a75] hover:from-[#0d4a75] hover:to-[#0A3D62] text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                  onClick={() => setShowAddVisualization(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Visualization
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white/70 border-slate-300 text-slate-700 hover:bg-slate-100 gap-2"
                  onClick={() => setShowCustomizeDashboard(true)}
                >
                  <Settings className="w-4 h-4" />
                  Customize Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Conditionally render sections based on settings */}
        {dashboardSettings.keyResearchMetrics && <MetricsCards metrics={metricsData} />}
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {dashboardSettings.researchTrendChart && <CitationsChart data={monthlyCitationsData} />}
          {dashboardSettings.topResearchAreas && <ResearchAreasChart data={researchAreasData} />}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          {dashboardSettings.recentPublications && (
            <div className="xl:col-span-2">
              <PublicationsList publications={recentPublications} />
            </div>
          )}
          {dashboardSettings.hypothesisDistribution && (
            <div>
              <ResearchStatusPanel />
            </div>
          )}
        </div>

        {/* Add Visualization Dialog */}
        <Dialog open={showAddVisualization} onOpenChange={setShowAddVisualization}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-900">Add Custom Visualization</DialogTitle>
              <p className="text-sm text-slate-500">Choose a visualization type to add to your research dashboard.</p>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              {chartTypes.map((chart) => (
                <Card
                  key={chart.id}
                  className={`p-6 cursor-pointer transition-all hover:border-brand/40 ${
                    selectedChartType === chart.id 
                      ? 'border-2 border-brand bg-brand/10' 
                      : 'border border-slate-200'
                  }`}
                  onClick={() => setSelectedChartType(chart.id)}
                >
                  <div className="flex flex-col items-center gap-3">
                    <chart.icon className={`w-8 h-8 ${selectedChartType === chart.id ? 'text-brand' : 'text-slate-600'}`} />
                    <span className={`text-sm font-medium ${selectedChartType === chart.id ? 'text-brand' : 'text-slate-700'}`}>
                      {chart.name}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button variant="outline" onClick={() => setShowAddVisualization(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-brand text-white hover:bg-brand-light"
                disabled={!selectedChartType}
                onClick={() => {
                  // Handle adding visualization
                  setShowAddVisualization(false);
                  setSelectedChartType(null);
                }}
              >
                Add Visualization
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Customize Dashboard Dialog */}
        <Dialog open={showCustomizeDashboard} onOpenChange={setShowCustomizeDashboard}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-900">Customize Dashboard</DialogTitle>
              <p className="text-sm text-slate-500">Choose which visualizations to display on your research overview dashboard.</p>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Key Research Metrics</span>
                <Switch 
                  checked={dashboardSettings.keyResearchMetrics}
                  onCheckedChange={() => toggleSetting('keyResearchMetrics')}
                  className="data-[state=checked]:bg-brand"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Research Trend Chart</span>
                <Switch 
                  checked={dashboardSettings.researchTrendChart}
                  onCheckedChange={() => toggleSetting('researchTrendChart')}
                  className="data-[state=checked]:bg-brand"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Top Research Areas</span>
                <Switch 
                  checked={dashboardSettings.topResearchAreas}
                  onCheckedChange={() => toggleSetting('topResearchAreas')}
                  className="data-[state=checked]:bg-brand"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Recent Publications</span>
                <Switch 
                  checked={dashboardSettings.recentPublications}
                  onCheckedChange={() => toggleSetting('recentPublications')}
                  className="data-[state=checked]:bg-brand"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Hypothesis Distribution</span>
                <Switch 
                  checked={dashboardSettings.hypothesisDistribution}
                  onCheckedChange={() => toggleSetting('hypothesisDistribution')}
                  className="data-[state=checked]:bg-brand"
                />
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t border-slate-200">
              <Button 
                variant="outline" 
                className="border-slate-300"
                onClick={resetToDefault}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              <Button 
                className="bg-brand text-white hover:bg-brand-light"
                onClick={() => setShowCustomizeDashboard(false)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <NIRAChatbot />
      </div>
    </DashboardLayout>
  );
};

export default ResearcherOverview;
