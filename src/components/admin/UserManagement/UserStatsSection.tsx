import { Users, CheckSquare, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UserStatsProps {
  total: number;
  active: number;
  pending: number;
  admins: number;
  onTotalClick: () => void;
  onActiveClick: () => void;
  onPendingClick: () => void;
  onAdminClick: () => void;
}

const UserStats = ({ 
  total, 
  active, 
  pending, 
  admins, 
  onTotalClick,
  onActiveClick,
  onPendingClick,
  onAdminClick
}: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl"
        onClick={onTotalClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-2">Total Users</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{total}</h3>
              <p className="text-xs text-slate-500 mt-1">Registered accounts</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl"
        onClick={onActiveClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium mb-2">Active Users</p>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-800">{active}</h3>
              <p className="text-xs text-emerald-600 mt-1">Currently active</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl"
        onClick={onPendingClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium mb-2">Pending Approvals</p>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">{pending}</h3>
              <p className="text-xs text-amber-600 mt-1">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl"
        onClick={onAdminClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium mb-2">Admin Accounts</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">{admins}</h3>
              <p className="text-xs text-red-600 mt-1">System admins</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
