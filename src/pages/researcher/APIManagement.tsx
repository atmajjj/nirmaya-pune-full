import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Code2, Globe, LinkIcon, Beaker, Settings } from "lucide-react";
import { APIManagementHeader } from "@/components/researcher/APIManagement/APIManagementHeader";
import { APIServiceCards } from "@/components/researcher/APIManagement/APIServiceCards";
import { EndpointsList } from "@/components/researcher/APIManagement/EndpointsList";
import { DocumentationPanel } from "@/components/researcher/APIManagement/DocumentationPanel";
import { publicAPIs } from "@/components/researcher/APIManagement/apiData";

const navItems = [
  { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Dataset Links", path: "/researcher/datasets", icon: <LinkIcon className="w-5 h-5" /> },
  { title: "APIs", path: "/researcher/apis", icon: <Code2 className="w-5 h-5" /> },
  { title: "Workspace", path: "/researcher/workspace", icon: <Beaker className="w-5 h-5" /> },
  { title: "Geo-Map", path: "/researcher/geo-map", icon: <Globe className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const indiaWRISEndpoints = [
  {
    name: "Water Quality Data",
    method: "GET",
    endpoint: "https://indiawris.gov.in/wris/api/v1/water-quality",
    description: "Fetch water quality parameters and measurements"
  },
  {
    name: "Groundwater Levels",
    method: "GET",
    endpoint: "https://indiawris.gov.in/wris/api/v1/groundwater-levels",
    description: "Get groundwater level monitoring data"
  }
];

const dataGovEndpoints = [
  {
    name: "Search Datasets",
    method: "GET",
    endpoint: "https://www.data.gov.in/api/search?title=ground%20water%20quality",
    description: "Search for groundwater quality datasets"
  }
];

const cgwbEndpoints = [
  {
    name: "Quality Bulletins",
    method: "GET",
    endpoint: "https://gwdata.cgwb.gov.in/api/quality-bulletins",
    description: "Access groundwater quality bulletin data"
  },
  {
    name: "Station Data",
    method: "GET",
    endpoint: "https://gwdata.cgwb.gov.in/api/monitoring-stations",
    description: "Get monitoring station information and data"
  }
];

const APIManagement = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <div className="min-h-screen bg-slate-50">
        <APIManagementHeader />

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="w-full flex items-center justify-center mb-6">
            <div className="w-fit">
              <TabsList className="inline-flex bg-white border border-slate-200 rounded-lg p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-brand data-[state=active]:text-white rounded-md transition-colors px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="endpoints" 
                  className="data-[state=active]:bg-brand data-[state=active]:text-white rounded-md transition-colors px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  API Endpoints
                </TabsTrigger>
                <TabsTrigger 
                  value="documentation" 
                  className="data-[state=active]:bg-brand data-[state=active]:text-white rounded-md transition-colors px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Documentation
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <APIServiceCards apis={publicAPIs} copyToClipboard={copyToClipboard} />
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-8">
            <EndpointsList 
              apiName="India-WRIS API Catalogue Endpoints" 
              endpoints={indiaWRISEndpoints} 
              copyToClipboard={copyToClipboard} 
            />
            <EndpointsList 
              apiName="Groundwater Quality Datasets Endpoints" 
              endpoints={dataGovEndpoints} 
              copyToClipboard={copyToClipboard} 
            />
            <EndpointsList 
              apiName="CGWB Groundwater Data Portal Endpoints" 
              endpoints={cgwbEndpoints} 
              copyToClipboard={copyToClipboard} 
            />
          </TabsContent>

          <TabsContent value="documentation" className="space-y-8">
            <DocumentationPanel />
          </TabsContent>
        </Tabs>

        <NIRAChatbot />
      </div>
    </DashboardLayout>
  );
};

export default APIManagement;
