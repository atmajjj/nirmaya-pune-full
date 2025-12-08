import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { getNavItemsForRole } from "@/config/navigation";

const AdminLayout = () => {
  const navItems = getNavItemsForRole("admin");

  return (
    <DashboardLayout navItems={navItems} userRole="admin">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default AdminLayout;
