import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Brain, BarChart3, Calculator, Map, Settings } from "lucide-react";

const navItems = [
  { title: "Overview", path: "/scientist/overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "HMPI Engine", path: "/scientist/hmpi-engine", icon: <Brain className="w-5 h-5" /> },
  { title: "Formula Editor", path: "/scientist/formula-editor", icon: <Calculator className="w-5 h-5" /> },
  { title: "Geo Map", path: "/scientist/geo-map", icon: <Map className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const ScientistLayout = () => {
  return (
    <DashboardLayout navItems={navItems} userRole="scientist">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default ScientistLayout;
