import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { RecentLogin } from './types';

interface RecentLoginActivityProps {
  recentLogins: RecentLogin[];
}

const RecentLoginActivity = ({ recentLogins }: RecentLoginActivityProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Login Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLogins.map((login) => (
            <div key={`${login.user}-${login.time}`} className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {login.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-800">{login.user}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Globe className="w-3 h-3" />
                    <span>{login.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-800">{login.time}</p>
                <p className="text-xs text-slate-600">{login.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLoginActivity;
