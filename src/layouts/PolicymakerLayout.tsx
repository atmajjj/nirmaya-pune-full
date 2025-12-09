import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { getNavItemsForRole } from "@/config/navigation";

const PolicymakerLayout = () => {
  const navItems = getNavItemsForRole("policymaker");

  return (
    <DashboardLayout navItems={navItems} userRole="policymaker" dashboardTitle="Policymaker Dashboard">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default PolicymakerLayout;
