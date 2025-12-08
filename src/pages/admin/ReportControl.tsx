import { useState } from "react";

// Import extracted components
import ReportControlHeader from "@/components/admin/ReportControl/ReportControlHeader";
import ReportStatsCards from "@/components/admin/ReportControl/ReportStatsCards";
import ReportManagementTable from "@/components/admin/ReportControl/ReportManagementTable";
import PublicationTimeline from "@/components/admin/ReportControl/PublicationTimeline";
import QuickActions from "@/components/admin/ReportControl/QuickActions";
import { initialReports, publicationTimeline } from "@/components/admin/ReportControl/reportsData";
import { Report } from "@/components/admin/ReportControl/types";

const ReportControl = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const reportStats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    published: reports.filter(r => r.status === 'published').length,
    aiGenerated: reports.filter(r => r.isAIGenerated).length
  };

  const handleReportAction = (reportId: number, action: 'approve' | 'reject' | 'archive') => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: action === 'approve' ? 'published' : action === 'reject' ? 'rejected' : 'archived',
            lastUpdated: new Date().toISOString().split('T')[0],
            publishedDate: action === 'approve' ? new Date().toISOString().split('T')[0] : report.publishedDate
          }
        : report
    ));
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
        {/* Header Section */}
        <ReportControlHeader />

        {/* Summary Cards */}
        <ReportStatsCards stats={reportStats} />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Report Management Table */}
          <div className="lg:col-span-3">
            <ReportManagementTable
              reports={filteredReports}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              selectedReports={selectedReports}
              onSelectedReportsChange={setSelectedReports}
              onReportClick={(report) => {
                setSelectedReport(report);
                setShowPreview(true);
              }}
              onReportAction={handleReportAction}
            />
          </div>

          {/* Publication Timeline & Quick Actions */}
          <div className="space-y-6">
            <PublicationTimeline timeline={publicationTimeline} />
            <QuickActions selectedReportsCount={selectedReports.length} />
          </div>
        </div>
      </div>
  );
};

export default ReportControl;
