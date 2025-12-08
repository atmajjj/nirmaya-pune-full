import { Users, Activity, HardDrive, Shield, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TopSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Active Users</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">248</h3>
              <p className="text-xs text-emerald-600 mt-1">Online now</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">Server Uptime</p>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800">99.97%</h3>
              <p className="text-xs text-blue-600 mt-1">Last 30 days</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">Storage Usage</p>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">72%</h3>
              <p className="text-xs text-amber-600 mt-1">of 500GB</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-2">System Health</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Optimal</h3>
              <p className="text-xs text-slate-600 mt-1">All systems OK</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center">
              <Shield className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium mb-2">Pending Alerts</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">3</h3>
              <p className="text-xs text-red-600 mt-1">2 Critical</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopSummaryCards;
