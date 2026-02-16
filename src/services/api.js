import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

/**
 * Axios instance configured for Choreo backend
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: enables cookies/sessions for Choreo managed auth
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor - add any auth tokens or modify requests
api.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', error.response.status, error.response.data);
      }
      
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        // Clear any stored auth data
        localStorage.removeItem('authToken');
        // Redirect to login page
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request made but no response received
      if (process.env.NODE_ENV === 'development') {
        console.error('Network Error: No response from server');
      }
    } else {
      // Something else happened
      if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error.message);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
