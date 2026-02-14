/**
 * API Client Configuration
 * Centralized fetch-based API client with interceptors for authentication
 */

import { ENV } from '@/config/env';
import { AUTH_STORAGE_KEYS } from '@/types/auth.types';

// Type definitions for the API client
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Token management utilities
 */
export const tokenManager = {
  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    } catch {
      return null;
    }
  },

  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    } catch {
      return null;
    }
  },

  setTokens: (accessToken: string, refreshToken?: string): void => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      if (refreshToken) {
        localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
    } catch {
      console.error('Failed to store tokens');
    }
  },

  clearTokens: (): void => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    } catch {
      console.error('Failed to clear tokens');
    }
  },

  setUser: (user: unknown): void => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      console.error('Failed to store user data');
    }
  },

  getUser: <T>(): T | null => {
    try {
      const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
};

/**
 * Build full URL with query parameters
 */
function buildUrl(
  baseURL: string,
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  // Combine base URL and endpoint
  const fullUrl = `${baseURL}${endpoint}`.replace(/([^:]\/)\/+/g, '$1');
  const isAbsolute = /^https?:\/\//i.test(fullUrl);
  const url = isAbsolute
    ? new URL(fullUrl)
    : new URL(fullUrl, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Attempt to refresh the access token
 */
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptTokenRefresh(): Promise<boolean> {
  // Prevent multiple simultaneous refresh attempts
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${ENV.API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      
      // Validate response structure
      if (!result.success || !result.data?.token) {
        return false;
      }
      
      tokenManager.setTokens(result.data.token, result.data.refreshToken);
      tokenManager.setUser(result.data);
      return true;
    } catch {
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Make HTTP request with authentication
 */
async function request<T>(
  endpoint: string,
  options: RequestConfig = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(ENV.API_URL, endpoint, params);

  // Check if body is FormData
  const isFormData = fetchOptions.body instanceof FormData;

  // Default headers (don't set Content-Type for FormData)
  const headers: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  // Remove Content-Type if it's multipart/form-data (browser will set it with boundary)
  if (isFormData && headers && typeof headers === 'object' && 'Content-Type' in headers) {
    const headersCopy = { ...headers } as Record<string, string>;
    delete headersCopy['Content-Type'];
    Object.assign(headers, headersCopy);
  }

  // Add auth token if available (except for auth endpoints)
  const token = tokenManager.getAccessToken();
  if (token && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle 401 - Unauthorized (token expired)
      if (response.status === 401 && !endpoint.includes('/auth/')) {
        // Attempt token refresh
        const refreshed = await attemptTokenRefresh();
        if (refreshed) {
          // Retry the original request with new token
          return request<T>(endpoint, options);
        } else {
          // Refresh failed, clear tokens and redirect to login
          tokenManager.clearTokens();
          window.location.href = '/';
          throw new ApiError('Session expired. Please login again.', 401, errorData);
        }
      }

      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    // Handle 204 No Content (no response body)
    if (response.status === 204) {
      return { success: true } as T;
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      error
    );
  }
}

/**
 * API Client with HTTP methods
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestConfig) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestConfig) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestConfig) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestConfig) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
    }),

  delete: <T>(endpoint: string, options?: RequestConfig) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
