import { useState } from "react";

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

const SystemOverviewRefactored = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
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
  );
};

export default SystemOverviewRefactored;
