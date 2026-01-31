/**
 * Nirmaya Report Types
 * Based on report-api.md specification
 */

export type ReportStatus = 'pending' | 'generating' | 'completed' | 'failed';
export type ReportType = 'comprehensive' | 'summary';

export interface NirmayaReport {
  id: number;
  upload_id: number;
  report_title: string;
  report_type: ReportType;
  file_name: string;
  file_path: string;
  file_url: string;
  file_size: number;
  total_stations: number;
  avg_hpi: string | null;
  avg_mi: string | null;
  avg_wqi: string | null;
  status: ReportStatus;
  error_message: string | null;
  generated_at: string | null;
  created_by: number;
  created_at: string;
  updated_by: number | null;
  updated_at: string;
  is_deleted: boolean;
  deleted_by: number | null;
  deleted_at: string | null;
}

export interface NirmayaReportListItem {
  id: number;
  upload_id: number;
  report_title: string;
  status: ReportStatus;
  report_type: ReportType;
  total_stations: number;
  avg_hpi: string | null;
  avg_mi: string | null;
  avg_wqi: string | null;
  file_size: number;
  generated_at: string | null;
  created_at: string;
}

export interface GenerateReportRequest {
  upload_id: number;
  report_type?: ReportType;
}

export interface GenerateReportResponse {
  success: boolean;
  message: string;
  data: {
    report: {
      id: number;
      upload_id: number;
      report_title: string;
      status: ReportStatus;
      created_at: string;
    };
    estimatedTime: string;
  };
}

export interface GetReportResponse {
  success: boolean;
  data: NirmayaReport;
}

export interface ReportStatusResponse {
  success: boolean;
  data: {
    reportId: number;
    status: ReportStatus;
    progress: number;
    errorMessage: string | null;
    createdAt: string;
    generatedAt: string | null;
    isComplete: boolean;
    isFailed: boolean;
    canDownload: boolean;
  };
}

export interface ListReportsParams {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  report_type?: ReportType;
  sort_by?: 'created_at' | 'generated_at' | 'file_size' | 'total_stations';
  sort_order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListReportsResponse {
  success: boolean;
  message: string;
  data: NirmayaReportListItem[];
  meta: {
    pagination: PaginationMeta;
  };
}
