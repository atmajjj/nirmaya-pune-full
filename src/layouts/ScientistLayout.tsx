import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { getNavItemsForRole } from "@/config/navigation";

const ScientistLayout = () => {
  const navItems = getNavItemsForRole("scientist");

  return (
    <DashboardLayout navItems={navItems} userRole="scientist" dashboardTitle="Scientist Dashboard">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default ScientistLayout;
