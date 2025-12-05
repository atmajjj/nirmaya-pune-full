import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService, tokenManager, ApiError } from "@/services/api";
import type { AuthUser, UserRole, LoginCredentials } from "@/types/auth.types";
import { AUTH_STORAGE_KEYS } from "@/types/auth.types";

/**
 * Auth State Interface
 */
interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods to children
 */
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Initialize from localStorage
    return authService.getCurrentUser();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && !!tokenManager.getAccessToken();
  const role = user?.role ?? null;

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const authResponse = await authService.login(credentials);
      setUser(authResponse);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
    } catch (err) {
      // Log but don't throw - we still want to clear local state
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  /**
   * Listen for storage changes (for multi-tab sync)
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === AUTH_STORAGE_KEYS.ACCESS_TOKEN) {
        if (!event.newValue) {
          // Token was removed - user logged out in another tab
          setUser(null);
        } else {
          // Token was added/changed - sync user data
          const storedUser = authService.getCurrentUser();
          setUser(storedUser);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Validate token on mount
   */
  useEffect(() => {
    const validateSession = async () => {
      const token = tokenManager.getAccessToken();
      const storedUser = authService.getCurrentUser();

      if (token && !storedUser) {
        // Token exists but no user data - clear invalid state
        tokenManager.clearTokens();
        setUser(null);
      } else if (!token && storedUser) {
        // User data exists but no token - clear invalid state
        tokenManager.clearTokens();
        setUser(null);
      }
    };

    validateSession();
  }, []);

  const value: AuthState = {
    isAuthenticated,
    user,
    role,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access auth context
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

export default AuthContext;
