/**
 * HMPI Engine Types
 * Type definitions for HMPI Engine API interactions
 */

// CSV Preview Types
export interface DetectedColumns {
  station_id: string | null;
  latitude: string | null;
  longitude: string | null;
  state: string | null;
  city: string | null;
}

export interface AvailableCalculation {
  available: boolean;
  metals_found?: string[];
  missing_metals?: string[];
  params_found?: string[];
  missing_params?: string[];
}

export interface CSVPreviewResult {
  filename: string;
  total_rows: number;
  valid_rows: number;
  detected_columns: DetectedColumns;
  available_calculations: {
    hpi: AvailableCalculation;
    mi: AvailableCalculation;
    wqi: AvailableCalculation;
  };
  warnings?: string[];
}

// Calculation Types
export interface Calculation {
  id: number;
  upload_id: number;
  station_id: string;
  latitude: number | null;
  longitude: number | null;
  state: string | null;
  city: string | null;
  hpi: number | null;
  hpi_classification: string | null;
  mi: number | null;
  mi_classification: string | null;
  mi_class: string | null;
  wqi: number | null;
  wqi_classification: string | null;
  metals_analyzed: string[] | null;
  wqi_params_analyzed: string[] | null;
  created_at: string;
  updated_at?: string;
}

export interface CalculationError {
  row: number;
  station_id?: string;
  message: string;
}

export interface CalculationResult {
  upload_id: number;
  total_stations: number;
  processed_stations: number;
  failed_stations: number;
  calculations: Calculation[];
  errors: CalculationError[];
}

// List Calculations Types
export interface ListCalculationsParams {
  page?: number;
  limit?: number;
  upload_id?: number;
  state?: string;
  city?: string;
  hpi_min?: number;
  hpi_max?: number;
  mi_min?: number;
  mi_max?: number;
  wqi_min?: number;
  wqi_max?: number;
  classification?: string;
  sort_by?: 'hpi' | 'mi' | 'wqi' | 'created_at' | 'station_id';
  sort_order?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
}

export interface ListCalculationsResponse {
  calculations: Calculation[];
  pagination: PaginationInfo;
}

// Statistics Types
export interface ClassificationStats {
  [key: string]: number;
}

export interface IndexStats {
  min: number;
  max: number;
  avg: number;
  by_classification: ClassificationStats;
}

export interface GeographicCoverage {
  states: string[];
  cities: number;
}

export interface HMPIStats {
  total_calculations: number;
  total_uploads: number;
  hpi_stats: IndexStats;
  mi_stats: IndexStats;
  wqi_stats: IndexStats;
  geographic_coverage: GeographicCoverage;
}

export interface StatsParams {
  state?: string;
  date_from?: string;
  date_to?: string;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationInfo;
}

export interface APIError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
