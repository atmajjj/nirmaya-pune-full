/**
 * Nirmaya Report Service
 * API service for Nirmaya report generation and management
 */

import { apiClient } from './apiClient';
import type {
  GenerateReportRequest,
  GenerateReportResponse,
  GetReportResponse,
  ListReportsParams,
  ListReportsResponse,
  ReportStatusResponse
} from '@/types/nirmaya-report.types';

const BASE_PATH = '/nirmaya-report';

export const nirmayaReportService = {
  /**
   * Generate a new Nirmaya report
   * POST /api/nirmaya-report/generate
   */
  generateReport: async (data: GenerateReportRequest): Promise<GenerateReportResponse> => {
    return apiClient.post<GenerateReportResponse>(`${BASE_PATH}/generate`, data);
  },

  /**
   * Get report details by ID
   * GET /api/nirmaya-report/:reportId
   */
  getReport: async (reportId: number): Promise<GetReportResponse> => {
    return apiClient.get<GetReportResponse>(`${BASE_PATH}/${reportId}`);
  },

  /**
   * Get report status
   * GET /api/nirmaya-report/:reportId/status
   */
  getReportStatus: async (reportId: number): Promise<ReportStatusResponse> => {
    return apiClient.get<ReportStatusResponse>(`${BASE_PATH}/${reportId}/status`);
  },

  /**
   * Download report (redirects to S3 presigned URL)
   * GET /api/nirmaya-report/:reportId/download
   */
  downloadReport: (reportId: number): void => {
    const token = localStorage.getItem('accessToken');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
    window.open(`${baseUrl}${BASE_PATH}/${reportId}/download?token=${token}`, '_blank');
  },

  /**
   * List all reports with pagination and filters
   * GET /api/nirmaya-report?page=1&limit=10&status=completed&sort_by=created_at&sort_order=desc
   */
  listReports: async (params?: ListReportsParams): Promise<ListReportsResponse> => {
    return apiClient.get<ListReportsResponse>(BASE_PATH, { 
      params: params as Record<string, string | number | boolean | undefined>
    });
  },

  /**
   * List reports by upload ID
   * GET /api/nirmaya-report/upload/:uploadId
   */
  listReportsByUpload: async (
    uploadId: number,
    params?: Omit<ListReportsParams, 'upload_id'>
  ): Promise<ListReportsResponse> => {
    return apiClient.get<ListReportsResponse>(`${BASE_PATH}/upload/${uploadId}`, { 
      params: params as Record<string, string | number | boolean | undefined>
    });
  },

  /**
   * Poll report status until completed or failed
   * Useful for waiting on report generation
   */
  pollReportStatus: async (
    reportId: number,
    interval: number = 2000,
    maxAttempts: number = 60
  ): Promise<ReportStatusResponse> => {
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          attempts++;
          const response = await nirmayaReportService.getReportStatus(reportId);

          if (response.data.status === 'completed' || response.data.status === 'failed') {
            resolve(response);
          } else if (attempts >= maxAttempts) {
            reject(new Error('Polling timeout: Report generation taking too long'));
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  }
};
