/**
 * Auth Types
 * Type definitions for authentication related data
 */

// User roles as defined in the API
export type UserRole = 'admin' | 'scientist' | 'researcher' | 'policymaker';

// User status types
export type UserStatus = 'active' | 'suspended' | 'pending';

/**
 * Authenticated user data returned from API
 */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

/**
 * Auth response with tokens
 */
export interface AuthResponse extends AuthUser {
  token: string;
  refreshToken?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * API Error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Token storage keys
 */
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'authUser',
} as const;
