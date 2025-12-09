/**
 * Data Source Service
 * API client for data source management endpoints
 */

import { apiClient } from './apiClient';
import type {
  DataSource,
  ListDataSourcesParams,
  ListDataSourcesResponse,
  DataSourceResponse,
  UploadDataSourceResponse,
  ReprocessResponse,
  CalculateFromSourceRequest,
  CalculateFromSourceResponse,
  DataSourceStats,
} from '@/types/data-source.types';

const BASE_PATH = '/data-sources';

/**
 * Data Source Service
 * Handles all data source related API calls
 */
export const dataSourceService = {
  /**
   * Upload a new data source file
   * @param file - File to upload (CSV, XLSX, XLS)
   * @param description - Optional description
   * @returns Upload response with data source details
   */
  upload: async (file: File, description?: string): Promise<DataSource> => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    const response = await apiClient.post<UploadDataSourceResponse>(
      `${BASE_PATH}/upload`,
      formData
    );

    return response.data;
  },

  /**
   * List data sources with filtering and pagination
   * @param params - Query parameters for filtering/sorting
   * @returns Paginated list of data sources
   */
  list: async (params?: ListDataSourcesParams): Promise<ListDataSourcesResponse> => {
    const response = await apiClient.get<ListDataSourcesResponse>(BASE_PATH, {
      params: params as Record<string, string | number | boolean | undefined>,
    });

    return response;
  },

  /**
   * Get details of a specific data source
   * @param id - Data source ID
   * @returns Data source details
   */
  getById: async (id: number): Promise<DataSource> => {
    const response = await apiClient.get<DataSourceResponse>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  /**
   * Delete a data source (soft delete)
   * @param id - Data source ID
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${id}`);
  },

  /**
   * Reprocess a data source (useful for failed uploads)
   * @param id - Data source ID
   * @returns Reprocess confirmation
   */
  reprocess: async (id: number): Promise<ReprocessResponse> => {
    const response = await apiClient.post<ReprocessResponse>(
      `${BASE_PATH}/${id}/reprocess`
    );
    return response;
  },

  /**
   * Calculate Nirmaya indices from a data source
   * @param dataSourceId - Data source ID to use for calculation
   * @returns Calculation results
   */
  calculateFromSource: async (
    dataSourceId: number
  ): Promise<CalculateFromSourceResponse['data']> => {
    const request: CalculateFromSourceRequest = {
      data_source_id: dataSourceId,
    };

    const response = await apiClient.post<CalculateFromSourceResponse>(
      '/nirmaya-engine/calculate-from-source',
      request
    );

    return response.data;
  },

  /**
   * Get statistics for data sources (for dashboard)
   * This aggregates data from the list endpoint
   * @returns Statistics object
   */
  getStats: async (): Promise<DataSourceStats> => {
    // Get counts for each status
    const [allResponse, pendingResponse, availableResponse, failedResponse, processingResponse] = await Promise.all([
      apiClient.get<ListDataSourcesResponse>(BASE_PATH, { params: { limit: 1 } }),
      apiClient.get<ListDataSourcesResponse>(BASE_PATH, { params: { status: 'pending', limit: 1 } }),
      apiClient.get<ListDataSourcesResponse>(BASE_PATH, { params: { status: 'available', limit: 1 } }),
      apiClient.get<ListDataSourcesResponse>(BASE_PATH, { params: { status: 'failed', limit: 1 } }),
      apiClient.get<ListDataSourcesResponse>(BASE_PATH, { params: { status: 'processing', limit: 1 } }),
    ]);

    return {
      total_uploads: allResponse?.meta?.pagination?.total || 0,
      pending_review: pendingResponse?.meta?.pagination?.total || 0,
      available: availableResponse?.meta?.pagination?.total || 0,
      failed: failedResponse?.meta?.pagination?.total || 0,
      processing: processingResponse?.meta?.pagination?.total || 0,
    };
  },

  /**
   * Poll a data source status until it's no longer processing
   * @param id - Data source ID
   * @param maxAttempts - Maximum polling attempts (default: 30)
   * @param interval - Polling interval in ms (default: 2000)
   * @returns Final data source state
   */
  pollStatus: async (
    id: number,
    maxAttempts: number = 30,
    interval: number = 2000
  ): Promise<DataSource> => {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const dataSource = await dataSourceService.getById(id);

      // If processing is complete (success or failure), return
      if (dataSource.status !== 'pending' && dataSource.status !== 'processing') {
        return dataSource;
      }

      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, interval));
      attempts++;
    }

    // If we've exhausted attempts, get final state
    return await dataSourceService.getById(id);
  },
};
