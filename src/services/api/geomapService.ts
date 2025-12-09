import apiClient from './apiClient';

export interface GeomapStation {
  id: number;
  station_id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    state: string | null;
    district: string | null;
    city: string | null;
  };
  year: number | null;
  hpi_score: number | null;
  hpi_classification: string | null;
  mi_score: number | null;
  mi_classification: string | null;
  risk_level: 'safe' | 'moderate' | 'unsafe';
  metals_analyzed: string[];
}

export interface GeomapFilters {
  state?: string;
  upload_id?: number;
  risk_level?: 'safe' | 'moderate' | 'unsafe';
  year?: number;
  min_hpi?: number;
  max_hpi?: number;
}

export interface GeomapResponse {
  success: boolean;
  message: string;
  data: GeomapStation[];
}

export const geomapService = {
  /**
   * Get all geomap stations with optional filters
   */
  getStations: async (filters?: GeomapFilters): Promise<GeomapStation[]> => {
    const params = new URLSearchParams();
    
    if (filters?.state) params.append('state', filters.state);
    if (filters?.upload_id) params.append('upload_id', filters.upload_id.toString());
    if (filters?.risk_level) params.append('risk_level', filters.risk_level);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.min_hpi !== undefined) params.append('min_hpi', filters.min_hpi.toString());
    if (filters?.max_hpi !== undefined) params.append('max_hpi', filters.max_hpi.toString());
    
    const queryString = params.toString();
    const url = `/nirmaya-engine/geomap${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get<GeomapResponse>(url);
    return response.data;
  },
};
