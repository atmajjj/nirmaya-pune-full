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
  overview: {
    total_users: number;
    total_uploads: number;
    total_calculations: number;
    total_reports: number;
    total_data_sources: number;
    total_formulas: number;
  };
  users: {
    by_role: {
      admin: number;
      scientist: number;
      field_technician: number;
      researcher: number;
      policymaker: number;
    };
    recent_registrations: number;
    active_users: number;
  };
  uploads: {
    total: number;
    by_status: {
      pending: number;
      processing: number;
      completed: number;
      failed: number;
    };
    total_size_bytes: number;
    total_size_mb: number;
    recent_uploads: number;
  };
  calculations: {
    total: number;
    by_index: {
      hpi: number;
      mi: number;
      wqi: number;
      cdeg: number;
      hei: number;
      pig: number;
    };
    by_classification: {
      hpi: {
        Low: number;
        Medium: number;
        High: number;
        'Very High': number;
      };
      mi: {
        Excellent: number;
        Good: number;
        Poor: number;
        'Very Poor': number;
        Unsuitable: number;
      };
      wqi: {
        Excellent: number;
        Good: number;
        Poor: number;
        'Very Poor': number;
        Unsuitable: number;
      };
      cdeg: Record<string, number>;
      hei: Record<string, number>;
      pig: Record<string, number>;
    };
    recent_calculations: number;
  };
  data_sources: {
    total: number;
    by_status: {
      pending: number;
      processing: number;
      available: number;
      archived: number;
      failed: number;
    };
    by_file_type: {
      csv: number;
      xlsx: number;
      xls: number;
    };
    total_size_bytes: number;
    total_size_mb: number;
    recent_uploads: number;
  };
  reports: {
    total: number;
    by_status: {
      generating: number;
      completed: number;
      failed: number;
    };
    by_format: {
      pdf: number;
      json: number;
    };
    recent_reports: number;
  };
  formulas: {
    total: number;
    by_type: {
      hpi: number;
      mi: number;
      wqi: number;
    };
    active_formulas: number;
    default_formulas: number;
  };
  system: {
    database_status: 'healthy' | 'degraded' | 'down';
    redis_status: 'healthy' | 'degraded' | 'down';
    api_version: string;
    environment: 'development' | 'test' | 'production';
  };
}

