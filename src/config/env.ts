/**
 * Environment Configuration
 * Centralized environment variables for the application
 */

export const ENV = {
  // API Base URL - full URL including /api or relative /api for dev proxy
  // Example: http://localhost:8000/api
  API_URL: import.meta.env.VITE_API_URL || '/api',
  
  // App environment
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
} as const;

// Type-safe environment config
export type EnvConfig = typeof ENV;
