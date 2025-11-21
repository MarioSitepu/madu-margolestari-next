/**
 * Utility function to get the API base URL
 * Normalizes the URL to ensure it ends with /api and doesn't have trailing slashes
 */
export function getApiUrl(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  
  if (!envUrl) {
    // Default for development
    return 'http://localhost:5000/api';
  }
  
  // Remove trailing slash
  let url = envUrl.trim().replace(/\/+$/, '');
  
  // If URL doesn't end with /api, add it
  if (!url.endsWith('/api')) {
    // Check if it ends with /api/ (with trailing slash)
    if (url.endsWith('/api/')) {
      url = url.slice(0, -1); // Remove trailing slash
    } else {
      url = url + '/api';
    }
  }
  
  return url;
}

/**
 * Build a full API endpoint URL
 * @param endpoint - The endpoint path (e.g., '/auth/google' or 'auth/google')
 * @returns Full URL to the endpoint
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiUrl();
  
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Ensure baseUrl doesn't have trailing slash
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  
  return `${cleanBaseUrl}/${cleanEndpoint}`;
}

// Export the base API URL for backward compatibility
export const API_URL = getApiUrl();

