import axios from 'axios';
import cookies from 'js-cookie'
import {ICheckoutOrder} from "./types"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const authApi = axios.create({
  baseURL: BASE_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json';



export const cartCheckoutFn = async (checkout:ICheckoutOrder) => {
  console.log(checkout);
  
    return await authApi.post<string>('chackout-session', {orders:checkout.orders,adress:checkout.adress},{
      headers:{
      'Authorization':'Bearer '+cookies.get('token')
    }})
  }

export const CheckoutSessionFn = async (sessionID='') => {
    return await authApi.get<string>(`chackout-session?id=${sessionID}`,{
      headers:{
      'Authorization':'Bearer '+cookies.get('token')
    }})
  }
  