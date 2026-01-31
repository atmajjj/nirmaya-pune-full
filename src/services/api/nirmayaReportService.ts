/**
 * Nirmaya Report Service
 * API service for Nirmaya report generation and management
 */

import { apiClient, tokenManager } from './apiClient';
import { ENV } from '@/config/env';
import type {
  GenerateReportRequest,
  GenerateReportResponse,
  GetReportResponse,
  ListReportsParams,
  ListReportsResponse,
  ReportStatusResponse,
} from '@/types/nirmaya-report.types';

const BASE_PATH = '/hmpi-report';

export const nirmayaReportService = {
  /**
   * Generate a new Nirmaya report
   * Calls backend API to generate real report from calculated data
   */
  generateReport: async (data: GenerateReportRequest): Promise<GenerateReportResponse> => {
    // apiClient returns the JSON directly, not wrapped in { data: ... }
    const response = await apiClient.post<GenerateReportResponse>(`${BASE_PATH}/generate`, data);
    return response;
  },

  /**
   * Get report details by ID
   */
  getReport: async (reportId: number): Promise<GetReportResponse> => {
    const response = await apiClient.get<GetReportResponse>(`${BASE_PATH}/${reportId}`);
    return response;
  },

  /**
   * Get report status
   */
  getReportStatus: async (reportId: number): Promise<ReportStatusResponse> => {
    const response = await apiClient.get<ReportStatusResponse>(`${BASE_PATH}/${reportId}/status`);
    return response;
  },

  /**
   * Download report PDF
   * Gets pre-signed URL and opens in new tab
   */
  downloadReport: async (reportId: number): Promise<void> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: { downloadUrl: string } }>(
        `${BASE_PATH}/${reportId}/download`
      );
      console.log('Download response:', response);
      
      const downloadUrl = response?.data?.downloadUrl;
      if (downloadUrl) {
        // Force open in new tab
        const newWindow = window.open(downloadUrl, '_blank');
        if (!newWindow) {
          // If popup blocked, try direct navigation
          window.location.href = downloadUrl;
        }
      } else {
        throw new Error('No download URL in response');
      }
    } catch (error) {
      console.error('Failed to download report:', error);
      throw error;
    }
  },

  /**
   * Download report as blob (for programmatic download)
   */
  downloadReportBlob: async (reportId: number): Promise<{ url: string; filename: string }> => {
    const response = await apiClient.get<{ success: boolean; data: { downloadUrl: string; fileName: string } }>(
      `${BASE_PATH}/${reportId}/download`
    );
    return {
      url: response.data.downloadUrl,
      filename: response.data.fileName || `nirmaya-report-${reportId}.pdf`
    };
  },

  /**
   * List all reports with pagination and filters
   */
  listReports: async (params?: ListReportsParams): Promise<ListReportsResponse> => {
    const queryParams = params as Record<string, string | number | boolean> | undefined;
    const response = await apiClient.get<ListReportsResponse>(BASE_PATH, { params: queryParams });
    return response;
  },

  /**
   * List reports by upload ID
   */
  listReportsByUpload: async (
    uploadId: number,
    params?: Omit<ListReportsParams, 'upload_id'>
  ): Promise<ListReportsResponse> => {
    const response = await apiClient.get<ListReportsResponse>(`${BASE_PATH}/upload/${uploadId}`, { params });
    return response;
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
