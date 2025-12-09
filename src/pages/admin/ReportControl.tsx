import { useState, useEffect } from "react";
import { nirmayaReportService } from "@/services/api";
import type { NirmayaReportListItem, ReportStatus } from "@/types/nirmaya-report.types";
import ReportControlHeader from "@/components/admin/ReportControl/ReportControlHeader";
import ReportStatsCards from "@/components/admin/ReportControl/ReportStatsCards";
import ReportManagementTable from "@/components/admin/ReportControl/ReportManagementTable";
import { showErrorToast } from "@/lib/toast-utils";
import { Loader2 } from "lucide-react";

const ReportControl = () => {
  const [reports, setReports] = useState<NirmayaReportListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const limit = 10;

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await nirmayaReportService.listReports({
        page: currentPage,
        limit,
        status: statusFilter === "all" ? undefined : statusFilter,
        sort_by: 'created_at',
        sort_order: 'desc'
      });

      setReports(response.data);
      setTotalPages(response.meta.pagination.totalPages);
      setTotalReports(response.meta.pagination.total);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      showErrorToast("Error", "Failed to load reports. Please try again.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on mount and when filters change
  useEffect(() => {
    fetchReports();
  }, [currentPage, statusFilter]);

  // Filter reports by search term (client-side)
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.report_title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate statistics
  const reportStats = {
    total: totalReports,
    pending: reports.filter(r => r.status === 'pending').length,
    completed: reports.filter(r => r.status === 'completed').length,
    generating: reports.filter(r => r.status === 'generating').length,
    failed: reports.filter(r => r.status === 'failed').length
  };

  const handleDownload = (reportId: number) => {
    nirmayaReportService.downloadReport(reportId);
  };

  const handleRefresh = () => {
    fetchReports();
  };

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#0A3D62]" />
          <p className="text-slate-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      {/* Header Section */}
      <ReportControlHeader onRefresh={handleRefresh} />

      {/* Summary Cards */}
      <ReportStatsCards stats={reportStats} />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-6">
        {/* Report Management Table */}
        <ReportManagementTable
          reports={filteredReports}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={(value) => {
            setStatusFilter(value as ReportStatus | "all");
            setCurrentPage(1); // Reset to first page
          }}
          selectedReports={selectedReports}
          onSelectedReportsChange={setSelectedReports}
          onDownload={handleDownload}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReportControl;
