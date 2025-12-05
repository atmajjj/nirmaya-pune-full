/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import { apiClient, tokenManager, ApiError } from './apiClient';
import type {
  AuthResponse,
  ApiResponse,
  LoginCredentials,
  RefreshTokenRequest,
  AuthUser,
} from '@/types/auth.types';

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login user with email and password
   * @param credentials - Login credentials (email, password)
   * @returns AuthResponse with user data and token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );

    if (response.success && response.data) {
      // Store tokens and user data
      tokenManager.setTokens(response.data.token, response.data.refreshToken);
      tokenManager.setUser(response.data);
    }

    return response.data;
  },

  /**
   * Logout current user
   * Clears tokens regardless of API response
   */
  logout: async (): Promise<void> => {
    const token = tokenManager.getAccessToken();

    if (token) {
      try {
        await apiClient.post('/auth/logout', undefined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        // Log error but don't throw - we still want to clear local tokens
        console.error('Logout API call failed:', error);
      }
    }

    // Always clear tokens regardless of API response
    tokenManager.clearTokens();
  },

  /**
   * Refresh access token using refresh token
   * @returns New AuthResponse with updated tokens
   */
  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new ApiError('No refresh token available', 401);
    }

    const request: RefreshTokenRequest = { refreshToken };
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/refresh-token',
      request
    );

    if (response.success && response.data) {
      // Store new tokens
      tokenManager.setTokens(response.data.token, response.data.refreshToken);
      tokenManager.setUser(response.data);
    }

    return response.data;
  },

  /**
   * Get current user from local storage
   * @returns AuthUser or null
   */
  getCurrentUser: (): AuthUser | null => {
    return tokenManager.getUser<AuthUser>();
  },

  /**
   * Check if user is authenticated (has valid token)
   * @returns boolean
   */
  isAuthenticated: (): boolean => {
    return !!tokenManager.getAccessToken();
  },

  /**
   * Get current access token
   * @returns token string or null
   */
  getToken: (): string | null => {
    return tokenManager.getAccessToken();
  },

  /**
   * Check if user session is valid (has both token and user data)
   * @returns boolean
   */
  hasValidSession: (): boolean => {
    return !!tokenManager.getAccessToken() && !!tokenManager.getUser();
  },
};

export default authService;
