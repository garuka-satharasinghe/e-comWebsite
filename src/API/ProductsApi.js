import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from '../config/apiConfig';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Add a new product (sellers only)
 */
export const ProductAdd = (Category, AvailableUnits, DisplayName, Description, UnitPrice, Discount, DiscountEndDate, imgs) => {
    const formData = new FormData();
    formData.append('Category', Category);
    formData.append('AvailableUnits', AvailableUnits);
    formData.append('DisplayName', DisplayName);
    formData.append('Description', Description);
    formData.append('UnitPrice', UnitPrice);
    formData.append('Discount', Discount);
    formData.append('DiscountEndDate', DiscountEndDate);

    for (let i = 0; i < imgs.length; i++) {
        formData.append(`imgs`, imgs[i]);
    }
    
    return apiClient.post('/api/v1/product/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

/**
 * Set seller order status
 */
export const SetSellerOrderStatus = (id, state) => {
    return apiClient.post(`/api/v1/order/setState/${id}`, { state }, {
        timeout: 10000,
    });
};

/**
 * Get customer orders state
 */
export const CustomerOrdersState = () => {
    return apiClient.get('/api/v1/order/customer');
};

/**
 * Get products with pagination
 */
export const ProductGet = (limit = 20, offset = 0) => {
    return apiClient.get('/api/v1/product/getProducts', {
        params: { limit, offset },
        timeout: 10000,
    });
};

/**
 * Get seller orders
 */
export const SellerOrders = (SId) => {
    return apiClient.get('/api/v1/order/', {
        params: { SId },
        timeout: 10000,
    });
};

/**
 * Get product details by ID
 */
export const GetProductDetails = (productId) => {
    return apiClient.get(`/api/v1/product/getProductDetails?productId=${productId}`);
};

/**
 * Purchase a product
 */
export const PurchaseProduct = (ProductId, Units) => {
    return apiClient.post('/api/v1/purchase', { ProductId, Units });
};

/**
 * Calculate discount price and remaining time
 */
export const calculateDiscount = (unitprice, discountPersentage, DiscountEndDate) => {
    const discountEnd = moment(DiscountEndDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    const now = moment();
    if (discountEnd.isValid() && now.isBefore(discountEnd) && discountPersentage > 0 && discountPersentage <= 100) {
        console.log("discount valied");
        let discountRemains = discountEnd.diff(now, 'days');
        let timeUnit = " days";
        if (discountRemains === 0) {
            discountRemains = discountEnd.diff(now, 'hours');
            timeUnit = " hours";
            if (discountRemains === 0) {
                return { price: unitprice, isDiscountApplied: false, remainingDays: "0 days" };
            }
        }
        return { price: (unitprice * (100 - discountPersentage) / 100), isDiscountApplied: true, remainingDays: discountRemains + timeUnit };
    }
    else {
        console.log("discount not valied");
        return { price: unitprice, isDiscountApplied: false, remainingDays: 0 };
    }
};

const ProductsApi = {
    ProductAdd,
    SetSellerOrderStatus,
    CustomerOrdersState,
    ProductGet,
    SellerOrders,
    GetProductDetails,
    PurchaseProduct,
    calculateDiscount,
};

export default ProductsApi;
