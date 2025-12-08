/**
 * User Service
 * API service for user management operations
 */

import { apiClient } from './apiClient';
import type { ApiResponse } from '@/types/auth.types';

/**
 * User interface matching API response
 */
export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  role: 'admin' | 'scientist' | 'researcher' | 'policymaker';
  created_at: string;
  updated_at: string;
}

/**
 * Update user data interface
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string | null;
  password?: string;
  role?: 'admin' | 'scientist' | 'researcher' | 'policymaker';
}

/**
 * Paginated users response
 */
export interface PaginatedUsersResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Query parameters for getting all users
 */
export interface GetUsersParams {
  page?: number;
  limit?: number;
}

/**
 * User Service
 */
export const userService = {
  /**
   * Get all users (admin only)
   * @param params - Query parameters for pagination
   * @returns Paginated list of users
   */
  async getAllUsers(params: GetUsersParams = {}): Promise<PaginatedUsersResponse> {
    const { page = 1, limit = 20 } = params;
    
    const response = await apiClient.get<any>(
      '/users',
      { params: { page, limit } }
    );

    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      // Response has data array at response.data
      return {
        data: response.data,
        pagination: response.pagination || {
          page,
          limit,
          total: response.data.length
        }
      };
    } else if (Array.isArray(response)) {
      // Response is directly an array
      return {
        data: response,
        pagination: {
          page,
          limit,
          total: response.length
        }
      };
    } else {
      // Unexpected format
      console.error('Unexpected response format:', response);
      return {
        data: [],
        pagination: {
          page,
          limit,
          total: 0
        }
      };
    }
  },

  /**
   * Get user by ID
   * @param id - User ID
   * @returns User data
   */
  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  /**
   * Get current user profile
   * @returns Current user data
   */
  async getCurrentUser(): Promise<User> {
    // Get user ID from stored user data
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) {
      throw new Error('No authenticated user found');
    }

    const user = JSON.parse(storedUser);
    return this.getUserById(user.id);
  },

  /**
   * Update user
   * @param id - User ID to update
   * @param data - Update data
   * @returns Updated user data
   */
  async updateUser(id: number, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Update current user profile
   * @param data - Update data (without role)
   * @returns Updated user data
   */
  async updateCurrentUser(data: Omit<UpdateUserData, 'role'>): Promise<User> {
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) {
      throw new Error('No authenticated user found');
    }

    const user = JSON.parse(storedUser);
    const updatedUser = await this.updateUser(user.id, data);
    
    // Update stored user data
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  },

  /**
   * Delete user (admin only)
   * @param id - User ID to delete
   */
  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },

  /**
   * Check if current user is admin
   * @returns True if user is admin
   */
  isAdmin(): boolean {
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) return false;

    try {
      const user = JSON.parse(storedUser);
      return user.role === 'admin';
    } catch {
      return false;
    }
  },

  /**
   * Get current user role
   * @returns User role or null
   */
  getCurrentUserRole(): 'admin' | 'scientist' | 'researcher' | 'policymaker' | null {
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) return null;

    try {
      const user = JSON.parse(storedUser);
      return user.role;
    } catch {
      return null;
    }
  },
};
