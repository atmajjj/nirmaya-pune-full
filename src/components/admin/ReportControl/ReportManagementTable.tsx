import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, ThumbsUp, ThumbsDown, MoreVertical, FileText, Leaf, AlertTriangle, FileCheck, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";
import { Report } from './types';

interface ReportManagementTableProps {
  reports: Report[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  selectedReports: number[];
  onSelectedReportsChange: (ids: number[]) => void;
  onReportClick: (report: Report) => void;
  onReportAction: (reportId: number, action: 'approve' | 'reject' | 'archive') => void;
}

const ReportManagementTable = ({
  reports,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  selectedReports,
  onSelectedReportsChange,
  onReportClick,
  onReportAction
}: ReportManagementTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": return { color: "bg-green-100 text-green-800", icon: "✓" };
      case "pending": return { color: "bg-yellow-100 text-yellow-800", icon: "⏳" };
      case "draft": return { color: "bg-gray-100 text-gray-800", icon: "📝" };
      case "rejected": return { color: "bg-red-100 text-red-800", icon: "✗" };
      case "archived": return { color: "bg-slate-100 text-slate-800", icon: "📦" };
      default: return { color: "bg-blue-100 text-blue-800", icon: "•" };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Environmental": return <Leaf className="w-4 h-4 text-green-600" />;
      case "Risk Assessment": return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "Compliance": return <FileCheck className="w-4 h-4 text-blue-600" />;
      case "Technical Analysis": return <Beaker className="w-4 h-4 text-purple-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Report Management</CardTitle>
          <p className="text-sm text-slate-600 mt-1">{reports.length} reports</p>
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
            <SelectTrigger className="w-32 bg-white/70">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger className="w-40 bg-white/70">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
              <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
              <SelectItem value="Policy Summary">Policy Summary</SelectItem>
              <SelectItem value="Technical Analysis">Technical Analysis</SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 border-slate-200">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedReports.length === reports.length && reports.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onSelectedReportsChange(reports.map(r => r.id));
                      } else {
                        onSelectedReportsChange([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Report Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const statusInfo = getStatusBadge(report.status);
                return (
                  <TableRow 
                    key={report.id} 
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={() => onReportClick(report)}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onSelectedReportsChange([...selectedReports, report.id]);
                          } else {
                            onSelectedReportsChange(selectedReports.filter(id => id !== report.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800">{report.title}</p>
                          {report.isAIGenerated && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">AI</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">{report.description}</p>
                        <div className="flex items-center gap-2">
                          {report.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                          {report.tags.length > 2 && (
                            <span className="text-xs text-slate-500">+{report.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(report.category)}
                        <span className="text-sm">{report.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            {report.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{report.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", statusInfo.color)}>
                        <span className="mr-1">{statusInfo.icon}</span>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      <div className="space-y-1">
                        <p>{report.lastUpdated}</p>
                        <p className="text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {report.views} views
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReportClick(report);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        {report.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-green-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                onReportAction(report.id, 'approve');
                              }}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                onReportAction(report.id, 'reject');
                              }}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportManagementTable;
