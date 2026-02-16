import React from 'react';
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';

// Set axios defaults
axios.defaults.withCredentials = true;

/**
 * Create axios instance with proper configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Create a new user (customer)
 */
export const createUser = async (uname, FirstName, LastName, Email, Password, Account_No, Card_CVC, Card_Exp, Phone_No, ProfilePicture) => {
    console.log('createUser');
    const body_data = { uname, FirstName, LastName, Email, Password, Account_No, Card_CVC, Card_Exp, Phone_No, ProfilePicture };
    console.log(body_data);

    return apiClient.post('/api/v1/auth/userReg', body_data);
};

/**
 * Create a new seller
 */
export const createSeller = async (DisplayName, Email, Password, Bank_Acc_No, Phone_No, ProfilePicture) => {
    console.log('createSeller');
    const body_data = { DisplayName, Email, Password, Bank_Acc_No, Phone_No, ProfilePicture };
    console.log(body_data);

    return apiClient.post('/api/v1/auth/sellerReg', body_data);
};

/**
 * Test API connection
 */
export const testCreate = () => {
    console.log("test create");

    return apiClient.get('/api/v1/auth/test')
        .then((res) => { 
            console.log('Test successful:', res); 
            return res;
        })
        .catch((err) => { 
            console.error('Test failed:', err); 
            throw err;
        });
};

/**
 * Validate user login
 */
export const validateLogin = async (email, password) => {
    console.log('validateLogin');
    
    if (email === '' || password === '') {
        return Promise.reject({ message: 'Email and password are required' });
    }
    
    const body_data = { email, password };
    return apiClient.post('/api/v1/auth/login', body_data);
};

/**
 * Server logout
 */
export const Serverlogout = async () => {
    console.log('logout');
    return apiClient.post('/api/v1/auth/logout');
};

/**
 * Default export component (kept for backward compatibility)
 */
export default function API() {
    return (
        <div>
            {/* API utility functions - no UI */}
        </div>
    );
}
