import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import NIRAChatbot from "@/components/NIRAChatbot";
import { Users, BarChart3, FileCheck, Database, MessageCircle } from "lucide-react";

// Import SystemOverview components
import SystemOverviewHeader from "@/components/admin/SystemOverview/SystemOverviewHeader";
import TopSummaryCards from "@/components/admin/SystemOverview/TopSummaryCards";
import SystemPerformanceChart from "@/components/admin/SystemOverview/SystemPerformanceChart";
import UserActivityChart from "@/components/admin/SystemOverview/UserActivityChart";
import UserDistributionChart from "@/components/admin/SystemOverview/UserDistributionChart";
import APIEndpoints from "@/components/admin/SystemOverview/APIEndpoints";
import SystemServices from "@/components/admin/SystemOverview/SystemServices";
import SystemAlerts from "@/components/admin/SystemOverview/SystemAlerts";
import RecentLoginActivity from "@/components/admin/SystemOverview/RecentLoginActivity";
import AdminActions from "@/components/admin/SystemOverview/AdminActions";

// Import data
import {
  systemPerformanceData,
  networkData,
  userActivityData,
  apiEndpoints,
  systemServices,
  systemAlerts,
  recentLogins
} from "@/components/admin/SystemOverview/systemData";

const navItems = [
  { title: "User Management", path: "/admin/user-management", icon: <Users className="w-5 h-5" /> },
  { title: "System Overview", path: "/admin/system-overview", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "Report Control", path: "/admin/report-control", icon: <FileCheck className="w-5 h-5" /> },
  { title: "Data Logs", path: "/admin/data-logs", icon: <Database className="w-5 h-5" /> },
  { title: "Nira Chatbot", path: "/admin/nira-chatbot", icon: <MessageCircle className="w-5 h-5" /> },
];

const SystemOverviewRefactored = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <DashboardLayout
      navItems={navItems}
      userRole="admin"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="p-8 space-y-6">
          <SystemOverviewHeader refreshing={refreshing} onRefresh={handleRefresh} />

          <TopSummaryCards />

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemPerformanceChart 
              data={systemPerformanceData} 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
            <UserActivityChart data={networkData} />
          </div>

          {/* User Distribution & API Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UserDistributionChart data={userActivityData} />
            <APIEndpoints endpoints={apiEndpoints} />
          </div>

          {/* System Services & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemServices services={systemServices} />
            <SystemAlerts alerts={systemAlerts} />
          </div>

          {/* Recent Activity & Admin Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentLoginActivity recentLogins={recentLogins} />
            <AdminActions />
          </div>
        </div>

        <NIRAChatbot />
      </div>
    </DashboardLayout>
  );
};

export default SystemOverviewRefactored;
