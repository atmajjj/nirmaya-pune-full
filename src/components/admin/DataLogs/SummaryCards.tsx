import { Users, FileText, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-white/60 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-gray-600">Active Users (24h)</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-800">132</p>
            <Badge className="bg-green-100 text-green-700 border-green-200">+12%</Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full w-3/4"></div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/60 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-gray-600">Total Log Entries</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-800">18,420</p>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">+2,341 today</p>
        </CardContent>
      </Card>

      <Card className="bg-white/60 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-gray-600">Critical Alerts</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-red-600">6</p>
            <Badge variant="destructive">High</Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">Requires attention</p>
        </CardContent>
      </Card>

      <Card className="bg-white/60 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-gray-600">Security Events</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-800">42</p>
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Monitor</Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
