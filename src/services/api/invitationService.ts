/**
 * Invitation Service
 * API client for managing admin invitations
 */

import { apiClient } from './apiClient';
import type { AuthUser } from '@/types/auth.types';
import type {
  CreateInvitationRequest,
  Invitation,
  PaginatedInvitationsResponse,
  GetInvitationsParams
} from '@/types/admin.types';

// Type definitions
export interface AcceptInvitationRequest {
  token: string;
  email: string;
  password: string;
}

export interface AcceptInvitationResponse extends AuthUser {
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Invitation Service
 */
export const invitationService = {
  /**
   * Create a new invitation
   * POST /api/admin/invitations
   * Authentication: Required (Admin only)
   */
  createInvitation: async (
    request: CreateInvitationRequest
  ): Promise<ApiResponse<Invitation>> => {
    return apiClient.post<ApiResponse<Invitation>>(
      '/admin/invitations',
      request
    );
  },

  /**
   * Get all invitations with optional filtering
   * GET /api/admin/invitations
   * Authentication: Required (Admin only)
   */
  getInvitations: async (
    params?: GetInvitationsParams
  ): Promise<ApiResponse<PaginatedInvitationsResponse>> => {
    return apiClient.get<ApiResponse<PaginatedInvitationsResponse>>(
      '/admin/invitations',
      { params }
    );
  },

  /**
   * Accept an invitation and create user account
   * POST /api/admin/invitations/accept
   * Public endpoint - no authentication required
   */
  acceptInvitation: async (
    request: AcceptInvitationRequest
  ): Promise<ApiResponse<AcceptInvitationResponse>> => {
    return apiClient.post<ApiResponse<AcceptInvitationResponse>>(
      '/admin/invitations/accept',
      request
    );
  }
};

export default invitationService;
