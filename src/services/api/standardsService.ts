import apiClient from './apiClient';

export interface MetalStandard {
  id: number;
  symbol: string;
  name: string;
  si: string;
  ii: string;
  mac: string;
  unit: string;
  description: string;
  is_active: boolean;
  created_by?: number;
  created_at?: string;
  updated_by?: number | null;
  updated_at?: string | null;
  is_deleted?: boolean;
  deleted_by?: number | null;
  deleted_at?: string | null;
}

export interface UpdateMetalStandardRequest {
  name?: string;
  si?: number;
  ii?: number;
  mac?: number;
  description?: string;
  is_active?: boolean;
}

export const standardsService = {
  // Metal Standards
  listMetalStandards: async () => {
    const response = await apiClient.get<{ data: MetalStandard[] }>('/standards/metals');
    return response.data;
  },

  getMetalStandard: async (id: number) => {
    const response = await apiClient.get<{ data: MetalStandard }>(`/standards/metals/${id}`);
    return response.data;
  },

  updateMetalStandard: async (id: number, data: UpdateMetalStandardRequest) => {
    const response = await apiClient.put<{ data: MetalStandard }>(`/standards/metals/${id}`, data);
    return response.data;
  },
};
