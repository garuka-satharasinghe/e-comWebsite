/**
 * Application Routes
 * Centralized route definitions for the application
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  BROWSE: '/browse',
  VIEW_PRODUCT: (pid) => `/viewProduct/${pid}`,
  PAYMENTS: (pid) => `/payments/${pid}`,
  ORDER_STATUS: '/orderStatus',
  ADD_PRODUCTS: '/AddProducts',
  MANAGE_ORDERS: '/manageOrders',
};
