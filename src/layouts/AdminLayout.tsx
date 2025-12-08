import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Users, BarChart3, FileCheck, Database, MessageCircle, Settings, UserPlus } from "lucide-react";

const navItems = [
  { title: "Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "Researcher Applications", path: "/admin/researcher-applications", icon: <UserPlus className="w-5 h-5" /> },
  { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
  { title: "Settings", path: "/profile", icon: <Settings className="w-5 h-5" /> },
];

const AdminLayout = () => {
  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default AdminLayout;
