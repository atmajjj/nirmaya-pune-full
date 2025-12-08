/**
 * Researcher Application Service
 * API client for managing researcher applications (admin operations)
 */

import { apiClient } from './apiClient';

// Type definitions
export interface ResearcherApplication {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  organization: string;
  purpose: string;
  status: 'pending' | 'accepted' | 'rejected';
  reviewed_by: number | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  invite_token: string | null;
  invite_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetApplicationsParams {
  status?: 'pending' | 'accepted' | 'rejected';
}

export interface AcceptApplicationRequest {
  application_id: string;
}

export interface RejectApplicationRequest {
  application_id: string;
  rejection_reason?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * Researcher Application Service
 */
export const researcherApplicationService = {
  /**
   * Get all researcher applications (Admin only)
   */
  getApplications: async (
    params?: GetApplicationsParams
  ): Promise<ApiResponse<ResearcherApplication[]>> => {
    return apiClient.get<ApiResponse<ResearcherApplication[]>>(
      '/researcher/applications',
      { params: params as Record<string, string> }
    );
  },

  /**
   * Accept a researcher application (Admin only)
   */
  acceptApplication: async (
    applicationId: string
  ): Promise<ApiResponse<ResearcherApplication>> => {
    return apiClient.post<ApiResponse<ResearcherApplication>>(
      '/researcher/applications/accept',
      { application_id: applicationId }
    );
  },

  /**
   * Reject a researcher application (Admin only)
   */
  rejectApplication: async (
    applicationId: string,
    rejectionReason?: string
  ): Promise<ApiResponse<ResearcherApplication>> => {
    return apiClient.post<ApiResponse<ResearcherApplication>>(
      '/researcher/applications/reject',
      {
        application_id: applicationId,
        rejection_reason: rejectionReason
      }
    );
  }
};

export default researcherApplicationService;
