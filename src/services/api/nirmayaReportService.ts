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
  ReportStatusResponse,
  NirmayaReportListItem
} from '@/types/nirmaya-report.types';

const BASE_PATH = '/hmpi-report';

export const nirmayaReportService = {
  /**
   * Generate a new Nirmaya report
   * Returns sample PDF (API disabled for demo)
   */
  generateReport: async (data: GenerateReportRequest): Promise<GenerateReportResponse> => {
    console.log('Using sample report PDF (API disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a mock successful response that points to the sample PDF
    return {
      success: true,
      message: 'Sample Water Quality Report',
      data: {
        report: {
          id: 47,
          upload_id: data.upload_id,
          report_title: 'Water Quality Analysis Report - Pune Region',
          status: 'completed',
          created_at: new Date().toISOString()
        },
        estimatedTime: '0 seconds'
      }
    };
  },

  /**
   * Get report details by ID
   * Returns sample report data
   */
  getReport: async (reportId: number): Promise<GetReportResponse> => {
    console.log('Using sample report data (API disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return sample report data
    return {
      success: true,
      data: {
        id: reportId,
        upload_id: 1,
        report_title: 'Water Quality Analysis Report - Pune Region',
        report_type: 'comprehensive',
        file_name: 'ai-report-47.pdf',
        file_path: '/ai-report-47.pdf',
        file_url: '/ai-report-47.pdf',
        file_size: 1024000,
        total_stations: 100,
        avg_hpi: '45.67',
        avg_mi: '0.42',
        avg_wqi: '65.34',
        status: 'completed',
        error_message: null,
        generated_at: new Date().toISOString(),
        created_by: 1,
        created_at: new Date().toISOString(),
        updated_by: null,
        updated_at: new Date().toISOString(),
        is_deleted: false,
        deleted_by: null,
        deleted_at: null
      }
    };
  },

  /**
   * Get report status
   * Returns completed status with sample PDF
   */
  getReportStatus: async (reportId: number): Promise<ReportStatusResponse> => {
    console.log('Using sample report status (API disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Return completed status
    return {
      success: true,
      data: {
        report_id: reportId,
        status: 'completed',
        progress: 100,
        message: 'Report generated successfully'
      }
    };
  },

  /**
   * Download report
   * Opens sample PDF in new tab
   */
  downloadReport: async (reportId: number): Promise<void> => {
    console.log('Downloading sample report PDF');
    // Directly open the sample PDF
    window.open('/ai-report-47.pdf', '_blank');
  },

  /**
   * List all reports with pagination and filters
   * Returns sample reports
   */
  listReports: async (params?: ListReportsParams): Promise<ListReportsResponse> => {
    console.log('Using sample reports list (API disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate sample reports
    const sampleReports: NirmayaReportListItem[] = [
      {
        id: 47,
        upload_id: 1,
        report_title: 'Water Quality Analysis Report - Pune Region',
        status: 'completed',
        report_type: 'comprehensive',
        total_stations: 100,
        avg_hpi: '45.67',
        avg_mi: '0.42',
        avg_wqi: '65.34',
        file_size: 1024000,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        generated_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 46,
        upload_id: 2,
        report_title: 'Groundwater Quality Assessment - Maharashtra',
        status: 'completed',
        report_type: 'comprehensive',
        total_stations: 85,
        avg_hpi: '52.34',
        avg_mi: '0.56',
        avg_wqi: '72.45',
        file_size: 987000,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        generated_at: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 45,
        upload_id: 3,
        report_title: 'Heavy Metal Contamination Study',
        status: 'completed',
        report_type: 'comprehensive',
        total_stations: 120,
        avg_hpi: '68.91',
        avg_mi: '0.78',
        avg_wqi: '81.23',
        file_size: 1156000,
        created_at: new Date(Date.now() - 259200000).toISOString(),
        generated_at: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    
    return {
      success: true,
      message: 'Sample reports',
      data: sampleReports,
      meta: {
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: sampleReports.length,
          totalPages: 1
        }
      }
    };
  },

  /**
   * List reports by upload ID
   * Returns sample reports
   */
  listReportsByUpload: async (
    uploadId: number,
    params?: Omit<ListReportsParams, 'upload_id'>
  ): Promise<ListReportsResponse> => {
    console.log('Using sample reports by upload (API disabled)');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      message: 'Sample report for upload',
      data: [
        {
          id: 47,
          upload_id: uploadId,
          report_title: 'Water Quality Analysis Report - Pune Region',
          status: 'completed',
          report_type: 'comprehensive',
          total_stations: 100,
          avg_hpi: '45.67',
          avg_mi: '0.42',
          avg_wqi: '65.34',
          file_size: 1024000,
          created_at: new Date().toISOString(),
          generated_at: new Date().toISOString()
        }
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1
        }
      }
    };
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
