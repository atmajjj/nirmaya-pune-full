/**
 * Nirmaya Engine Service
 * API service for Nirmaya Engine calculations
 */

import { apiClient } from './apiClient';
import type {
  CSVPreviewResult,
  CalculationResult,
  Calculation,
  ListCalculationsParams,
  ListCalculationsResponse,
  NirmayaStats,
  StatsParams,
  APIResponse,
} from '@/types/nirmaya.types';

const BASE_URL = '/nirmaya-engine';

/**
 * Nirmaya Engine API Service
 */
export const nirmayaEngineService = {
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
  ): Promise<ListCalculationsResponse> {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: Calculation[];
      pagination: PaginationInfo;
    }>(`${BASE_URL}/calculations`, {
      params: params as any,
    });

    return {
      data: response.data || [],
      pagination: response.pagination || { page: 1, limit: 10, total: 0, total_pages: 0 },
    };
  },

  /**
   * Get a single calculation by ID
   */
  async getCalculation(
    id: number,
    includeAnalysis: boolean = false
  ): Promise<Calculation> {
    const response = await apiClient.get<APIResponse<Calculation>>(
      `${BASE_URL}/calculations/${id}`,
      {
        params: { include_analysis: includeAnalysis },
      }
    );

    return response.data;
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
   * Get statistics for Nirmaya Engine
   */
  async getStats(params?: StatsParams): Promise<APIResponse<NirmayaStats>> {
    return apiClient.get<APIResponse<NirmayaStats>>(`${BASE_URL}/stats`, {
      params: params as any,
    });
  },
};

export default nirmayaEngineService;
