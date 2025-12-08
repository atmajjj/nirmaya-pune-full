import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Bell, FileText, TrendingUp, Zap, Map, Settings } from "lucide-react";

const navItems = [
  { title: "Risk Alerts", path: "/policymaker/risk-alerts", icon: <Bell className="w-5 h-5" /> },
  { title: "BIS Reports", path: "/policymaker/who-reports", icon: <FileText className="w-5 h-5" /> },
  { title: "Trend Analysis", path: "/policymaker/trend-analysis", icon: <TrendingUp className="w-5 h-5" /> },
  { title: "Early Warning", path: "/policymaker/early-warning", icon: <Zap className="w-5 h-5" /> },
  { title: "Geo Map", path: "/policymaker/geo-map", icon: <Map className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const PolicymakerLayout = () => {
  return (
    <DashboardLayout navItems={navItems} userRole="policymaker">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default PolicymakerLayout;
