/**
 * HMPI Engine Service
 * API service for HMPI Engine calculations
 */

import { apiClient } from './apiClient';
import type {
  CSVPreviewResult,
  CalculationResult,
  Calculation,
  ListCalculationsParams,
  ListCalculationsResponse,
  HMPIStats,
  StatsParams,
  APIResponse,
} from '@/types/hmpi.types';

const BASE_URL = '/hmpi-engine';

/**
 * HMPI Engine API Service
 */
export const hmpiEngineService = {
  /**
   * Preview CSV file before calculation
   * Detects available columns and shows which indices can be calculated
   */
  async previewCSV(file: File): Promise<APIResponse<CSVPreviewResult>> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post<APIResponse<CSVPreviewResult>>(
      `${BASE_URL}/preview`,
      formData
    );
  },

  /**
   * Calculate HPI, MI, and WQI indices from CSV file
   */
  async calculateIndices(file: File): Promise<APIResponse<CalculationResult>> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post<APIResponse<CalculationResult>>(
      `${BASE_URL}/calculate`,
      formData
    );
  },

  /**
   * Get paginated list of calculations with filtering
   */
  async listCalculations(
    params: ListCalculationsParams = {}
  ): Promise<APIResponse<Calculation[]>> {
    return apiClient.get<APIResponse<Calculation[]>>(`${BASE_URL}/calculations`, {
      params: params as any,
    });
  },

  /**
   * Get a single calculation by ID
   */
  async getCalculation(
    id: number,
    includeAnalysis: boolean = false
  ): Promise<APIResponse<Calculation>> {
    return apiClient.get<APIResponse<Calculation>>(
      `${BASE_URL}/calculations/${id}`,
      {
        params: { include_analysis: includeAnalysis },
      }
    );
  },

  /**
   * Download calculation results as CSV
   */
  async downloadResults(uploadId: number): Promise<void> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${BASE_URL}/uploads/${uploadId}/download`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download results');
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename =
        contentDisposition?.match(/filename="(.+)"/)?.[1] ||
        `hmpi_results_${uploadId}.csv`;

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },

  /**
   * Get aggregate statistics for calculations
   */
  async getStats(params?: StatsParams): Promise<APIResponse<HMPIStats>> {
    return apiClient.get<APIResponse<HMPIStats>>(`${BASE_URL}/stats`, {
      params: params as any,
    });
  },
};

export default hmpiEngineService;
