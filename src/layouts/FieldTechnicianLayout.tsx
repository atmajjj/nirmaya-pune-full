import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { getNavItemsForRole } from "@/config/navigation";

const FieldTechnicianLayout = () => {
  const navItems = getNavItemsForRole("field_technician");

  return (
    <DashboardLayout navItems={navItems} userRole="field_technician" dashboardTitle="Field Technician Dashboard">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default FieldTechnicianLayout;
