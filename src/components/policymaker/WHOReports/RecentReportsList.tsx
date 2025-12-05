import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle2, Eye, AlertCircle, Download } from "lucide-react";
import { RecentReport } from "./types";

interface RecentReportsListProps {
  reports: RecentReport[];
}

const RecentReportsList = ({ reports }: RecentReportsListProps) => {
return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-lg">
      <CardHeader className="border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            "Recent Reports"
          </CardTitle>
          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors">
            {reports.length} "Reports"
          </Badge>
        </div>
        <p className="text-slate-600 mt-2">"Recent Reports Subtitle"</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="group border border-slate-200 hover:border-teal-300 bg-white hover:bg-gradient-to-r hover:from-slate-50 hover:to-teal-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-700 transition-colors mb-2">
                      {report.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge 
                        variant="outline" 
                        className={`border-2 font-medium ${
                          report.status === 'published' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 hover:from-blue-600 hover:to-indigo-700' 
                            : report.status === 'draft' 
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200' 
                            : 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200'
                        } transition-all`}
                      >
                        {report.status === 'published' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {report.status === 'draft' && <Eye className="w-3 h-3 mr-1" />}
                        {report.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {report.status}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border border-slate-300">
                        {report.type}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border border-slate-300">
                        {report.scope}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Generated on {new Date(report.generatedOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="ml-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group/btn border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400 transition-all duration-300 rounded-lg"
                    >
                      <Download className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      "Download"
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReportsList;
