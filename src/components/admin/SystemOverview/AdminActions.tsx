import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Activity, FileText, Settings, Server, HardDrive, Cpu, Network } from "lucide-react";

const AdminActions = () => {
  return (
    <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Admin Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-white/70 hover:bg-blue-50">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Backup Now</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-white/70 hover:bg-blue-50">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Run Diagnostics</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-white/70 hover:bg-blue-50">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Download Logs</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-white/70 hover:bg-blue-50">
            <Settings className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Configuration</span>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
          <div className="text-center">
            <Server className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-xs text-slate-600">Server Load</p>
            <p className="text-lg font-semibold text-slate-800">45%</p>
          </div>
          <div className="text-center">
            <HardDrive className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-xs text-slate-600">Disk Usage</p>
            <p className="text-lg font-semibold text-slate-800">72%</p>
          </div>
          <div className="text-center">
            <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-xs text-slate-600">CPU Temp</p>
            <p className="text-lg font-semibold text-slate-800">62°C</p>
          </div>
          <div className="text-center">
            <Network className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-xs text-slate-600">Bandwidth</p>
            <p className="text-lg font-semibold text-slate-800">2.3 Gbps</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActions;
