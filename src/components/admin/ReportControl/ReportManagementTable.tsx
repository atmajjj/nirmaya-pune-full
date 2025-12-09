import { Search, Download, Eye, Loader2, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NirmayaReportListItem, ReportStatus } from "@/types/nirmaya-report.types";
import { formatBytes, formatDate } from "@/lib/utils";

interface ReportManagementTableProps {
  reports: NirmayaReportListItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ReportStatus | "all";
  onStatusFilterChange: (value: string) => void;
  selectedReports: number[];
  onSelectedReportsChange: (ids: number[]) => void;
  onDownload: (reportId: number) => void;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ReportManagementTable = ({
  reports,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedReports,
  onSelectedReportsChange,
  onDownload,
  loading,
  currentPage,
  totalPages,
  onPageChange
}: ReportManagementTableProps) => {
  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case "completed":
        return { color: "bg-green-100 text-green-800 border-green-300", label: "Completed" };
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Pending" };
      case "generating":
        return { color: "bg-blue-100 text-blue-800 border-blue-300", label: "Generating" };
      case "failed":
        return { color: "bg-red-100 text-red-800 border-red-300", label: "Failed" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-300", label: status };
    }
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      onSelectedReportsChange([]);
    } else {
      onSelectedReportsChange(reports.map(r => r.id));
    }
  };

  const toggleSelectReport = (reportId: number) => {
    if (selectedReports.includes(reportId)) {
      onSelectedReportsChange(selectedReports.filter(id => id !== reportId));
    } else {
      onSelectedReportsChange([...selectedReports, reportId]);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">HMPI Reports</CardTitle>
          <p className="text-sm text-slate-600 mt-1">{reports.length} reports found</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-64 bg-white/70 border-slate-300 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-40 bg-white/70">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="generating">Generating</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A3D62]" />
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium">No reports found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedReports.length === reports.length && reports.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Upload ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stations</TableHead>
                    <TableHead>Avg HPI</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => {
                    const statusBadge = getStatusBadge(report.status);
                    
                    return (
                      <TableRow 
                        key={report.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedReports.includes(report.id)}
                            onCheckedChange={() => toggleSelectReport(report.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-800">{report.report_title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-600">#{report.upload_id}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${statusBadge.color} border font-medium`}>
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-700">{report.total_stations}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-700">{report.avg_hpi || 'N/A'}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-600 text-sm">{formatBytes(report.file_size)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-600 text-sm">
                            {report.generated_at ? formatDate(report.generated_at) : 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={report.status !== 'completed'}
                              onClick={() => onDownload(report.id)}
                              className="h-8 w-8 p-0 hover:bg-slate-100"
                              title="Download report"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportManagementTable;
