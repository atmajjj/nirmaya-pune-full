/**
 * Invitation Service
 * API client for managing admin invitations
 */

import { apiClient } from './apiClient';
import type { AuthUser } from '@/types/auth.types';

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
   * Accept an invitation and create user account
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
