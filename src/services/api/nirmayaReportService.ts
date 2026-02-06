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
  },

  /**
   * Generate AI-powered professional multilingual report
   * Supports: English (en), Hindi (hi), Marathi (mr)
   */
  generateAIReport: async (data: {
    uploadId: number;
    language?: 'en' | 'hi' | 'mr';
  }): Promise<Blob> => {
    const token = tokenManager.getAccessToken();
    
    console.log('generateAIReport called:', {
      uploadId: data.uploadId,
      language: data.language,
      hasToken: !!token,
    });
    
    if (!token) {
      throw new Error('Authentication required. Please log in again.');
    }
    
    const response = await fetch(`${ENV.API_URL}/nirmaya-engine/ai-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        uploadId: data.uploadId,
        language: data.language || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to generate report' }));
      // Extract message from nested error structure (backend returns { success, error: { message } })
      let errorMessage = errorData?.error?.message || errorData?.message || 'Failed to generate AI report';
      
      // Provide helpful error messages for common issues
      if (response.status === 401) {
        errorMessage = 'Session expired. Please log in again to generate reports.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Only scientists, policymakers, and admins can generate AI reports.';
      } else if (response.status === 404) {
        errorMessage = 'No calculations found. Please run analysis first before generating a report.';
      }
      
      console.error('AI Report Generation Error:', response.status, errorData);
      throw new Error(errorMessage);
    }

    return response.blob();
  },

  /**
   * Get available AI report options (languages and report types)
   */
  getAIReportOptions: async (): Promise<{
    languages: { code: string; name: string; nativeName: string }[];
    reportTypes: { code: string; name: string; description: string }[];
    defaults: { language: string; reportType: string };
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        languages: { code: string; name: string; nativeName: string }[];
        reportTypes: { code: string; name: string; description: string }[];
        defaults: { language: string; reportType: string };
      };
    }>('/nirmaya-engine/ai-report/options');
    return response.data;
  }
};
