/**
 * Application Configuration
 * 
 * Centralized configuration for environment variables
 * This ensures all API calls use the same base URL
 */

export const config = {
  // API Base URL - loaded from environment variable
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
};

// Helper function to build API endpoints
export const buildApiUrl = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${config.apiUrl}/${cleanPath}`;
};

export default config;
