import { Users, Activity, HardDrive, Shield, Bell, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TopSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Active Users</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-slate-800">248</p>
          <p className="text-xs text-green-600">Online now</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Server Uptime</span>
            </div>
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="14" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  fill="none"
                  strokeDasharray={`${99.97 * 0.88} 88`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">99%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-slate-800">99.97%</p>
          <p className="text-xs text-blue-600">Last 30 days</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Storage Usage</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-2xl font-bold text-slate-800">72%</p>
              <p className="text-xs text-slate-600">of 500GB</p>
            </div>
            <Progress value={72} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">System Health</span>
          </div>
        </CardHeader>
        <CardContent>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Operational
          </Badge>
          <p className="text-xs text-slate-600 mt-2">All services running</p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Pending Alerts</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-800">3</p>
            <Badge variant="destructive" className="text-xs">
              2 Critical
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopSummaryCards;
