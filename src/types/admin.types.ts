/**
 * Admin Types
 * Type definitions for admin-related API operations
 */

import type { UserRole, UserStatus } from './auth.types';

/**
 * User in the admin system
 */
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  created_at: string;
  updated_at: string;
  last_active?: string;
}

/**
 * User permissions
 */
export interface UserPermissions {
  accessDashboard: boolean;
  manageData: boolean;
  editFormulas: boolean;
  manageAlerts: boolean;
  systemSettings: boolean;
  exportData: boolean;
  userManagement: boolean;
}

/**
 * Create user invitation request
 */
export interface CreateInvitationRequest {
  first_name: string;
  last_name: string;
  email: string;
  assigned_role: UserRole;
}

/**
 * Invitation response
 */
export interface Invitation {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: 'pending' | 'accepted' | 'revoked' | 'expired';
  assigned_role: UserRole;
  invited_by: number;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Paginated invitations response
 */
export interface PaginatedInvitationsResponse {
  invitations: Invitation[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Get invitations query parameters
 */
export interface GetInvitationsParams {
  status?: 'pending' | 'accepted' | 'revoked' | 'expired';
  page?: number;
  limit?: number;
}

/**
 * Update user request
 */
export interface UpdateUserRequest {
  name?: string;
  phone_number?: string;
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * User filters for listing
 */
export interface UserFilters {
  page?: number;
  limit?: number;
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

/**
 * System statistics
 */
export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  pendingInvitations: number;
  usersByRole: Record<UserRole, number>;
}
