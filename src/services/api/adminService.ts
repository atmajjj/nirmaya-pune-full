/**
 * Admin Service
 * Handles all admin-related API calls (User Management, Invitations, etc.)
 */

import { apiClient } from './apiClient';
import type { ApiResponse } from '@/types/auth.types';
import type {
  AdminUser,
  CreateInvitationRequest,
  Invitation,
  UpdateUserRequest,
  PaginatedResponse,
  UserFilters,
  SystemStats,
  UserPermissions,
} from '@/types/admin.types';

/**
 * Admin API endpoints
 */
const ADMIN_ENDPOINTS = {
  USERS: '/admin/users',
  INVITATIONS: '/admin/invitations',
  STATS: '/admin/stats',
} as const;

/**
 * Admin Service
 */
export const adminService = {
  // ============================================
  // USER MANAGEMENT
  // ============================================

  /**
   * Get all users with optional filters
   * @param filters - Optional filters (pagination, role, status, search)
   * @returns Paginated list of users
   */
  getUsers: async (filters?: UserFilters): Promise<PaginatedResponse<AdminUser>> => {
    const params: Record<string, string | number | undefined> = {};
    
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit;
    if (filters?.role) params.role = filters.role;
    if (filters?.status) params.status = filters.status;
    if (filters?.search) params.search = filters.search;

    const response = await apiClient.get<ApiResponse<PaginatedResponse<AdminUser>>>(
      ADMIN_ENDPOINTS.USERS,
      { params }
    );

    return response.data;
  },

  /**
   * Get a single user by ID
   * @param userId - User ID
   * @returns User details
   */
  getUser: async (userId: number): Promise<AdminUser> => {
    const response = await apiClient.get<ApiResponse<AdminUser>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}`
    );

    return response.data;
  },

  /**
   * Update a user
   * @param userId - User ID
   * @param data - Update data
   * @returns Updated user
   */
  updateUser: async (userId: number, data: UpdateUserRequest): Promise<AdminUser> => {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}`,
      data
    );

    return response.data;
  },

  /**
   * Delete a user
   * @param userId - User ID
   */
  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.delete(`${ADMIN_ENDPOINTS.USERS}/${userId}`);
  },

  /**
   * Suspend a user
   * @param userId - User ID
   * @returns Updated user
   */
  suspendUser: async (userId: number): Promise<AdminUser> => {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}`,
      { status: 'suspended' }
    );

    return response.data;
  },

  /**
   * Activate a user
   * @param userId - User ID
   * @returns Updated user
   */
  activateUser: async (userId: number): Promise<AdminUser> => {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}`,
      { status: 'active' }
    );

    return response.data;
  },

  /**
   * Get user permissions
   * @param userId - User ID
   * @returns User permissions
   */
  getUserPermissions: async (userId: number): Promise<UserPermissions> => {
    const response = await apiClient.get<ApiResponse<UserPermissions>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}/permissions`
    );

    return response.data;
  },

  /**
   * Update user permissions
   * @param userId - User ID
   * @param permissions - Permissions to update
   * @returns Updated permissions
   */
  updateUserPermissions: async (
    userId: number,
    permissions: Partial<UserPermissions>
  ): Promise<UserPermissions> => {
    const response = await apiClient.patch<ApiResponse<UserPermissions>>(
      `${ADMIN_ENDPOINTS.USERS}/${userId}/permissions`,
      permissions
    );

    return response.data;
  },

  // ============================================
  // INVITATIONS
  // ============================================

  /**
   * Create a new invitation
   * @param data - Invitation data
   * @returns Created invitation
   */
  createInvitation: async (data: CreateInvitationRequest): Promise<Invitation> => {
    const response = await apiClient.post<ApiResponse<Invitation>>(
      ADMIN_ENDPOINTS.INVITATIONS,
      data
    );

    return response.data;
  },

  /**
   * Get all invitations
   * @returns List of invitations
   */
  getInvitations: async (): Promise<Invitation[]> => {
    const response = await apiClient.get<ApiResponse<Invitation[]>>(
      ADMIN_ENDPOINTS.INVITATIONS
    );

    return response.data;
  },

  /**
   * Resend an invitation
   * @param invitationId - Invitation ID
   * @returns Updated invitation
   */
  resendInvitation: async (invitationId: number): Promise<Invitation> => {
    const response = await apiClient.post<ApiResponse<Invitation>>(
      `${ADMIN_ENDPOINTS.INVITATIONS}/${invitationId}/resend`
    );

    return response.data;
  },

  /**
   * Cancel/revoke an invitation
   * @param invitationId - Invitation ID
   */
  cancelInvitation: async (invitationId: number): Promise<void> => {
    await apiClient.delete(`${ADMIN_ENDPOINTS.INVITATIONS}/${invitationId}`);
  },

  // ============================================
  // STATISTICS
  // ============================================

  /**
   * Get system statistics
   * @returns System stats
   */
  getStats: async (): Promise<SystemStats> => {
    const response = await apiClient.get<ApiResponse<SystemStats>>(
      ADMIN_ENDPOINTS.STATS
    );

    return response.data;
  },
};

export default adminService;
