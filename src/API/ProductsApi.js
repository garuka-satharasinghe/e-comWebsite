import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { API_BASE_URL } from '../config/apiConfig'

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


export const ProductAdd=( Category, AvailableUnits, DisplayName, Description, UnitPrice, Discount, DiscountEndDate,imgs )=> {
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
    
    return axios({
        baseURL: API_BASE_URL,
        url: "/api/v1/product/add",
        method: "POST",
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,

    })
}

export const SetSellerOrderStatus = (id,state)=>{
    return apiClient.post(`/api/v1/order/setState/${id}`, {state}, {
        timeout: 10000,
    })
}

export const CustomerOrdersState = ()=>{
    return apiClient.get(`/api/v1/order/customer`)
}

export const ProductGet=(limit=20,offset=0)=> {
    return apiClient.get("/api/v1/product/getProducts", {
        timeout: 10000,
        params:{limit,offset}
    })
}

export const SellerOrders =(SId)=> {
    return apiClient.get('/api/v1/order/', {
        timeout: 10000,
        data: JSON.stringify({SId})
    })
}

export const GetProductDetails=(productId)=> {
    return apiClient.get(`/api/v1/product/getProductDetails?productId=${productId}`)
}

export const PurchaseProduct = (ProductId,Units)=>{
    return apiClient.post(`/api/v1/purchase`, {ProductId,Units})
}

export const calculateDiscount=(unitprice,discountPersentage,DiscountEndDate)=>{
    const discountEnd  = moment(DiscountEndDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    const now = moment();
    if(discountEnd.isValid() && now.isBefore(discountEnd) && discountPersentage>0 && discountPersentage<=100){
        console.log("discount valied");
        let discountRemains = discountEnd.diff(now,'days');
        let timeUnit = " days";
        if(discountRemains===0){
            discountRemains = discountEnd.diff(now,'hours');
            timeUnit = " hours";
            if(discountRemains===0){
                return {price:unitprice,isDiscountApplied:false,remainingDays:"0 days"};
            }
        }
        return {price:(unitprice * (100-discountPersentage) / 100),isDiscountApplied:true ,remainingDays:discountRemains+timeUnit};
    }
    else{
        console.log("discount not valied");
        return {price:unitprice,isDiscountApplied:false,remainingDays:0};
    }
    
    
}



export default function ProductsApi() {
  return (
    <div>
      
    </div>
  )
}
