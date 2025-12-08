import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock } from "lucide-react";
import type { AdminUser } from '@/types/admin.types';

interface RecentLoginActivityProps {
  users: AdminUser[];
  loading?: boolean;
}

const RecentLoginActivity = ({ users, loading }: RecentLoginActivityProps) => {
  // Format the time difference
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'scientist': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'researcher': return 'bg-green-100 text-green-700 border-green-200';
      case 'policymaker': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-slate-200 rounded ml-auto" />
                  <div className="h-3 w-16 bg-slate-200 rounded ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent User Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm">No recent user activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-800">{user.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs px-2 py-0 ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-800 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {user.last_active ? formatTimeAgo(user.last_active) : formatTimeAgo(user.updated_at)}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentLoginActivity;
