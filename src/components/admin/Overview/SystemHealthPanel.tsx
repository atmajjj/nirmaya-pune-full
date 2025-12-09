import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Database, Cpu } from "lucide-react";
import type { SystemStats } from '@/types/admin.types';

interface SystemHealthPanelProps {
  stats: SystemStats | null;
  loading?: boolean;
}

const SystemHealthPanel = ({ stats, loading }: SystemHealthPanelProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Healthy</Badge>;
      case 'degraded':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Degraded</Badge>;
      case 'down':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Down</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Unknown</Badge>;
    }
  };

  if (loading || !stats) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-slate-200 rounded" />
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
        <CardTitle className="text-lg font-semibold">System Health</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Environment: {stats?.system?.environment ?? 'N/A'} • API: v{stats?.system?.api_version ?? 'N/A'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Database Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Database</p>
                <p className="text-xs text-slate-600">PostgreSQL Connection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(stats?.system?.database_status ?? 'down')}
              {getStatusBadge(stats?.system?.database_status ?? 'down')}
            </div>
          </div>

          {/* Redis Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Redis Cache</p>
                <p className="text-xs text-slate-600">Cache Server</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(stats?.system?.redis_status ?? 'down')}
              {getStatusBadge(stats?.system?.redis_status ?? 'down')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthPanel;
