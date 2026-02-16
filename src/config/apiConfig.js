/**
 * API Configuration
 * Reads from Choreo-mounted config file (window.configs) with fallbacks
 */

/**
 * Get the API base URL
 * Priority: 
 * 1. Choreo file-mounted config (window.configs.apiUrl)
 * 2. Environment variable (REACT_APP_API_URL)
 * 3. Default localhost for development
 */
export const getApiUrl = () => {
  // Check for Choreo mounted config first
  if (window?.configs?.apiUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using Choreo-mounted API URL:', window.configs.apiUrl);
    }
    return window.configs.apiUrl;
  }
  
  // Fallback to environment variable
  if (process.env.REACT_APP_API_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using environment variable API URL:', process.env.REACT_APP_API_URL);
    }
    return process.env.REACT_APP_API_URL;
  }
  
  // Default for local development
  if (process.env.NODE_ENV === 'development') {
    console.log('Using default localhost API URL');
  }
  return 'http://localhost:8080/api/v1';
};

// Export the resolved API URL
export const API_BASE_URL = getApiUrl();

// Export full API paths for convenience
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/product`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/product/${id}`,
  
  // Purchase endpoints
  PURCHASES: `${API_BASE_URL}/purchase`,
  PURCHASE_BY_ID: (id) => `${API_BASE_URL}/purchase/${id}`,
  
  // Order endpoints
  ORDERS: `${API_BASE_URL}/order`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/order/${id}`,
};
