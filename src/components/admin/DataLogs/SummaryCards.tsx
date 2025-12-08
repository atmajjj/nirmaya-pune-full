import { Users, FileText, AlertTriangle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Active Users (24h)</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">132</h3>
              <p className="text-xs text-emerald-600 mt-1">+12% increase</p>
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
              <p className="text-sm text-blue-600 font-medium mb-2">Total Log Entries</p>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800">18,420</h3>
              <p className="text-xs text-blue-600 mt-1">+2,341 today</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium mb-2">Critical Alerts</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">6</h3>
              <p className="text-xs text-red-600 mt-1">Requires attention</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">Security Events</p>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">42</h3>
              <p className="text-xs text-amber-600 mt-1">Last 7 days</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
