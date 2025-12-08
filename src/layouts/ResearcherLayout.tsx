import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { BarChart3, Database, BookOpen, Map, Settings } from "lucide-react";

const navItems = [
  { title: "Overview", path: "/researcher/overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Dataset Links", path: "/researcher/datasets", icon: <Database className="w-5 h-5" /> },
  { title: "API Management", path: "/researcher/apis", icon: <BookOpen className="w-5 h-5" /> },
  { title: "Interactive Geo Map", path: "/researcher/geo-map", icon: <Map className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const ResearcherLayout = () => {
  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default ResearcherLayout;
