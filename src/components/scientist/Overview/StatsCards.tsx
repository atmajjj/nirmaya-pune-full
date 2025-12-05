import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, AlertTriangle } from "lucide-react";
import { useAnimatedCount } from './useAnimatedCount';

export const StatsCards = () => {
  const totalSites = useAnimatedCount(247, 1400);
  const highRisk = useAnimatedCount(23, 1000);
  const activeAlerts = useAnimatedCount(7, 900);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-2">Total Sites</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{totalSites}</h3>
              <p className="text-xs text-slate-500 mt-1">Active monitoring stations</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">Highest Pollution</p>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">Arsenic</h3>
              <p className="text-xs text-amber-600 mt-1">Primary contaminant</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
              <span className="text-xl">⚠️</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium mb-2">High Risk Sites</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">{highRisk}</h3>
              <p className="text-xs text-red-600 mt-1">Requiring attention</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Active Alerts</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">{activeAlerts}</h3>
              <p className="text-xs text-emerald-600 mt-1">Live alerts</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-lg">!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
