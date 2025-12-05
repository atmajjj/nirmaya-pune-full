import { Users, CheckSquare, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card 
        className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer" 
        onClick={onTotalClick}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-slate-800">{total}</p>
        </CardContent>
      </Card>

      <Card 
        className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer" 
        onClick={onActiveClick}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-green-600" />
            Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">{active}</p>
        </CardContent>
      </Card>

      <Card 
        className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer" 
        onClick={onPendingClick}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-yellow-600">{pending}</p>
        </CardContent>
      </Card>

      <Card 
        className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all cursor-pointer" 
        onClick={onAdminClick}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-600" />
            Admin Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-red-600">{admins}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
