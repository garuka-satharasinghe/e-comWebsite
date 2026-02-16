/**
 * API Configuration for Choreo Deployment
 * 
 * Priority:
 * 1. Choreo file-mounted config (window.configs.apiUrl)
 * 2. Environment variable (REACT_APP_BASE_URL)
 * 3. Default localhost for development
 */

/**
 * Get the API base URL
 */
export const getApiUrl = () => {
  // Check for Choreo mounted config first
  if (window?.configs?.apiUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using Choreo-mounted API URL:', window.configs.apiUrl);
    }
    return window.configs.apiUrl;
  }
  
  // Fallback to environment variable (for local dev with .env.local)
  if (process.env.REACT_APP_BASE_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using environment variable API URL:', process.env.REACT_APP_BASE_URL);
    }
    return process.env.REACT_APP_BASE_URL;
  }
  
  // Default for local development
  if (process.env.NODE_ENV === 'development') {
    console.log('Using default localhost API URL');
  }
  return 'http://localhost:8080';
};

// Export the resolved API URL
export const API_BASE_URL = getApiUrl();

// Export full API endpoint paths for convenience
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  USER_REGISTER: `${API_BASE_URL}/api/v1/auth/userReg`,
  SELLER_REGISTER: `${API_BASE_URL}/api/v1/auth/sellerReg`,
  TEST: `${API_BASE_URL}/api/v1/auth/test`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/v1/product/getProducts`,
  PRODUCT_DETAILS: `${API_BASE_URL}/api/v1/product/getProductDetails`,
  PRODUCT_ADD: `${API_BASE_URL}/api/v1/product/add`,
  
  // Purchase endpoints
  PURCHASE: `${API_BASE_URL}/api/v1/purchase`,
  
  // Order endpoints
  ORDERS: `${API_BASE_URL}/api/v1/order`,
  CUSTOMER_ORDERS: `${API_BASE_URL}/api/v1/order/customer`,
  SET_ORDER_STATE: (id) => `${API_BASE_URL}/api/v1/order/setState/${id}`,
};
