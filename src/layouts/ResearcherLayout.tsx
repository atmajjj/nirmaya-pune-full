import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { getNavItemsForRole } from "@/config/navigation";

const ResearcherLayout = () => {
  const navItems = getNavItemsForRole("researcher");
  
  return (
    <DashboardLayout navItems={navItems} userRole="researcher">
      <Outlet />
      <NIRAChatbot />
    </DashboardLayout>
  );
};

export default ResearcherLayout;
