import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { BarChart3, Code2, Globe, LinkIcon, Beaker, Building, GraduationCap, FileText, FileSpreadsheet, FileJson, HardDrive, Settings } from "lucide-react";
import { DatasetLinksHeader } from "@/components/researcher/DatasetLinks/DatasetLinksHeader";
import { SearchFilters } from "@/components/researcher/DatasetLinks/SearchFilters";
import { DatasetCards } from "@/components/researcher/DatasetLinks/DatasetCards";
import { ContributeCard } from "@/components/researcher/DatasetLinks/ContributeCard";
import { RequestDatasetCard } from "@/components/researcher/DatasetLinks/RequestDatasetCard";
import { datasets } from "@/components/researcher/DatasetLinks/datasetsData";
import type { FilterCategory } from "@/components/researcher/DatasetLinks/types";

const navItems = [
  { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Dataset Links", path: "/researcher/datasets", icon: <LinkIcon className="w-5 h-5" /> },
  { title: "APIs", path: "/researcher/apis", icon: <Code2 className="w-5 h-5" /> },
  { title: "Workspace", path: "/researcher/workspace", icon: <Beaker className="w-5 h-5" /> },
  { title: "Geo-Map", path: "/researcher/geo-map", icon: <Globe className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const filterCategories: FilterCategory[] = [
  { id: "government", label: "Government", icon: Building },
  { id: "international", label: "International", icon: Globe },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "csv", label: "CSV", icon: FileSpreadsheet },
  { id: "json", label: "JSON", icon: FileJson },
  { id: "large", label: "Large Files", icon: HardDrive }
];

const DatasetLinks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeFilters.length === 0) return true;
    
    return activeFilters.some(filter => {
      switch (filter) {
        case "government":
        case "international": 
        case "academic":
          return dataset.category === filter;
        case "pdf":
        case "csv":
        case "json":
          return dataset.format.some(f => f.toLowerCase() === filter);
        case "large":
          const sizeValue = parseFloat(dataset.size);
          const unit = dataset.size.includes("GB") ? "GB" : "MB";
          return unit === "GB" || (unit === "MB" && sizeValue > 100);
        default:
          return false;
      }
    });
  });

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
  };

  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <div className="min-h-screen bg-slate-50">
        <DatasetLinksHeader />
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilters={activeFilters}
          filterCategories={filterCategories}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
        />
        
        {/* Dataset Cards */}
        <DatasetCards datasets={filteredDatasets} />
        
        {/* Contribute and Request Cards - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ContributeCard />
          <RequestDatasetCard />
        </div>
        
        <NIRAChatbot />
      </div>
    </DashboardLayout>
  );
};

export default DatasetLinks;
