import axios from 'axios';
import cookies from 'js-cookie'
import {IUpdateUserInfo, IUser,IUpdateUserPassword, IUpdateUserEmail, IShippingAdress, ICartItem} from "./types"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const authApi = axios.create({
  baseURL: BASE_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json';



export const updateUserInfoFn = async (info: IUpdateUserInfo) => {
    return await authApi.patch<IUser>('users/info', info,{
        headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }});
    //  response.data;
  }


export const updateUserPasswordFn = async (pass: IUpdateUserPassword) => {
    return await authApi.patch<IUser>('users/password', pass,{
        headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }});

  }

export const updateUserEmailFn = async (email: IUpdateUserEmail) => {
    return await authApi.patch<IUser>('users/email', email,{
        headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }})
  }

export const updateUserAdressFn = async (adress: IShippingAdress) => {
    return await authApi.post<IShippingAdress>('users/adress', adress,{
        headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }})
  }

export const updateUserdefualtAdressFn = async (adress: string) => {
  
    return await authApi.patch<IShippingAdress>('users/adress',{adress},{
        headers:{
        'Authorization':'Bearer '+cookies.get('token')
      }})
  }

export const confirmationFn = async (id:string='') => {
  
    return await authApi.get<string>(`users/confirm?id=${id}`)
  }

export const recoverPasswordCheckFn = async (id:string='') => {
  
    return await authApi.get<string>(`users/recoverpasswordcheck?id=${id}`)
  }

export const recoverPasswordFn = async (email:string='') => {  
    return await authApi.get<string>(`users/recoverpassword?email=${email}`)
  }

export const setRecoveryPasswordFn = async (pass: string,id:string='') => {
  return await authApi.post<string>('users/recoverpassword', {newpassword:pass,id})
}

export const uploadUserImageFn = async (image: string) => {
  return await authApi.post<string>('users/image', {image},{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
}

export const addProductToCartFn = async (cartItem: ICartItem) => {
  
  return await authApi.patch<string>('users/cart',{...cartItem},{
      headers:{
      'Authorization':'Bearer '+cookies.get('token')
    }})
}

export const addProductToWhishListtFn = async (product: string) => {
  
  return await authApi.patch<string>('users/whish',{product},{
      headers:{
      'Authorization':'Bearer '+cookies.get('token')
    }})
}

export const removeProductFromCartFn = async (product: string) => {
  return await authApi.delete('users/cart',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
    },
    data: {
      product
    }
  }
  )
}

export const removeProductFromWhishListtFn = async (product: string) => {
  
  return await authApi.delete('users/whish',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
    },
    data: {
      product
    }
  }
  )
}


export const getUserOrdersFn = async () => {
  return await authApi.get<any[]>('users/orders',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
}
