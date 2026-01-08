/**
 * Nirmaya Engine Types
 * Type definitions for Nirmaya Engine API interactions
 */

// CSV Preview Types
export interface DetectedColumns {
  station_id: string | null;
  latitude: string | null;
  longitude: string | null;
  state: string | null;
  city: string | null;
  sno?: string | null;
  district?: string | null;
  location?: string | null;
  year?: string | null;
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
  sno?: number | null;
  station_id: string;
  state: string | null;
  district?: string | null;
  location?: string | null;
  longitude: number | null;
  latitude: number | null;
  year?: number | null;
  city: string | null;
  hpi: number | null;
  hpi_classification: string | null;
  mi: number | null;
  mi_classification: string | null;
  mi_class: string | null;
  wqi: number | null;
  wqi_classification: string | null;
  params_analyzed: string[] | null;
  metals_analyzed: string[] | null;
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
  available_indices?: {
    hpi: boolean;
    mi: boolean;
    wqi: boolean;
  };
  metals_analyzed?: string[];
  warnings?: string[];
}

// List Calculations Types
export interface ListCalculationsParams {
  page?: number;
  limit?: number;
  upload_id?: number;
  state?: string;
  district?: string;
  city?: string;
  year?: number;
  hpi_min?: number;
  hpi_max?: number;
  mi_min?: number;
  mi_max?: number;
  wqi_min?: number;
  wqi_max?: number;
  classification?: string;
  sort_by?: 'hpi' | 'mi' | 'created_at' | 'station_id';
  sort_order?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
}

export interface ListCalculationsResponse {
  data: Calculation[];
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

export interface NirmayaStats {
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
