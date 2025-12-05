import { Clock, Download, Eye, CheckCircle, XCircle, Activity, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogEntry } from './types';

interface ActivityLogTableProps {
  logs: LogEntry[];
  viewMode: string;
  onLogSelect: (log: LogEntry) => void;
}

const ActivityLogTable = ({ logs, viewMode, onLogSelect }: ActivityLogTableProps) => {
  const getActionBadge = (type: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (type) {
      case "upload": return "default";
      case "analysis": return "secondary";
      case "report": return "default";
      case "system": return "outline";
      case "security": return "destructive";
      case "edit": return "outline";
      case "export": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed": return <XCircle className="w-4 h-4 text-red-500" />;
      case "running": return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Clock className="w-5 h-5" />
          System Activity Logs
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-white/50">
            {logs.length} entries
          </Badge>
          <Button variant="outline" size="sm" className="gap-2 bg-white/50 hover:bg-white/80">
            <Download className="w-4 h-4" />
            Export Filtered
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="table">
            <div className="rounded-lg border border-white/20 overflow-hidden bg-white/30">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 border-white/20">
                    <TableHead className="font-semibold">Timestamp</TableHead>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                    <TableHead className="font-semibold">Module</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Severity</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow 
                      key={log.id}
                      className="hover:bg-white/50 transition-colors duration-200 border-white/10"
                    >
                      <TableCell className="text-xs text-gray-600 font-mono">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.module}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm capitalize">{log.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`text-xs ${getSeverityColor(log.severity)} capitalize`}
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {log.details}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                onClick={() => onLogSelect(log)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Log Entry Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Timestamp</label>
                                    <p className="font-mono text-sm">{log.timestamp}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">User</label>
                                    <p>{log.user}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Role</label>
                                    <p>{log.role}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">IP Address</label>
                                    <p className="font-mono text-sm">{log.ip}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Module</label>
                                    <p>{log.module}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Action Type</label>
                                    <Badge variant={getActionBadge(log.type)} className="capitalize">
                                      {log.type}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Full Details</label>
                                  <p className="bg-gray-50 p-3 rounded-lg text-sm">{log.details}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={log.id} className="flex items-start gap-4 p-4 bg-white/30 rounded-lg border border-white/20">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${log.severity === 'critical' ? 'bg-red-500' : log.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    {index < logs.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{log.action}</h4>
                      <span className="text-xs text-gray-500 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{log.user}</Badge>
                      <Badge className={`text-xs ${getSeverityColor(log.severity)}`}>{log.severity}</Badge>
                      {getStatusIcon(log.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityLogTable;
