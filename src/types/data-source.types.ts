/**
 * Data Source Types
 * Type definitions for data source management
 */

// Data source status types
export type DataSourceStatus = 'pending' | 'processing' | 'available' | 'archived' | 'failed';

// File types
export type FileType = 'csv' | 'xlsx' | 'xls';

/**
 * File metadata extracted during processing
 */
export interface FileMetadata {
  total_rows: number;
  column_count: number;
  columns: string[];
  stations: string[];
  date_range: {
    from: string; // YYYY-MM-DD
    to: string;   // YYYY-MM-DD
  };
}

/**
 * Uploader information
 */
export interface Uploader {
  id: number;
  full_name: string;
  email: string;
}

/**
 * Data Source object
 */
export interface DataSource {
  id: number;
  filename: string;
  original_filename: string;
  file_type: FileType;
  mime_type: string;
  file_size: number;
  file_url: string;
  status: DataSourceStatus;
  error_message: string | null;
  metadata: FileMetadata | null;
  description: string | null;
  uploaded_by: number;
  uploader: Uploader;
  created_at: string;
  updated_at: string;
}

/**
 * Upload data source request
 */
export interface UploadDataSourceRequest {
  file: File;
  description?: string;
}

/**
 * List data sources query parameters
 */
export interface ListDataSourcesParams {
  page?: number;
  limit?: number;
  status?: DataSourceStatus;
  file_type?: FileType;
  uploaded_by?: number;
  search?: string;
  sort_by?: 'created_at' | 'filename' | 'file_size';
  sort_order?: 'asc' | 'desc';
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/**
 * List data sources response
 */
export interface ListDataSourcesResponse {
  success: boolean;
  message: string;
  meta: {
    timestamp: string;
    pagination: PaginationMeta;
  };
  data: DataSource[];
}

/**
 * Single data source response
 */
export interface DataSourceResponse {
  success: boolean;
  message: string;
  data: DataSource;
}

/**
 * Upload response
 */
export interface UploadDataSourceResponse {
  success: boolean;
  message: string;
  data: DataSource;
}

/**
 * Reprocess response
 */
export interface ReprocessResponse {
  success: boolean;
  message: string;
  data: null;
}

/**
 * Calculate from source request
 */
export interface CalculateFromSourceRequest {
  data_source_id: number;
}

/**
 * Calculation result for a single record
 */
export interface CalculationResult {
  station: string;
  date: string;
  hpi: number;
  mi: number;
  classification: string;
  parameters_used: number;
  missing_parameters: string[];
}

/**
 * Calculate from source response
 */
export interface CalculateFromSourceResponse {
  success: boolean;
  message: string;
  data: {
    upload_id: number;
    total_stations: number;
    total_records: number;
    successful_calculations: number;
    failed_calculations: number;
    results: CalculationResult[];
  };
}

/**
 * Data source statistics for dashboard
 */
export interface DataSourceStats {
  total_uploads: number;
  pending_review: number;
  available: number;
  failed: number;
  processing: number;
}
