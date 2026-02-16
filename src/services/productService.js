import api from './api';

/**
 * Product Service
 * Handles all product-related API calls
 */

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    try {
      const response = await api.get('/product');
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching products:', error);
      }
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching product ${id}:`, error);
      }
      throw error;
    }
  },

  /**
   * Create new product (seller only)
   */
  createProduct: async (productData) => {
    try {
      const response = await api.post('/product', productData);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating product:', error);
      }
      throw error;
    }
  },

  /**
   * Update product (seller only)
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/product/${id}`, productData);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error updating product ${id}:`, error);
      }
      throw error;
    }
  },

  /**
   * Delete product (seller only)
   */
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error deleting product ${id}:`, error);
      }
      throw error;
    }
  },
};
