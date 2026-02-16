import api from './api';

/**
 * Authentication Service
 * Handles user authentication operations
 */

export const authService = {
  /**
   * Login user
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error);
      }
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Registration error:', error);
      }
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      // Note: Token management should be consistent with login/register
      // Clear authToken if your auth system uses it
      // localStorage.removeItem('authToken');
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching user profile:', error);
      }
      throw error;
    }
  },
};

export default authService;
