import axios from 'axios';
import {IProduct, ISearchPage} from "./types"

const BASE_URL = 'http://127.0.0.1:5000/api/'

export const authApi = axios.create({
  baseURL: BASE_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const getProduct = async (id:string='') => {
    return await authApi.get<IProduct>(`/products/${id}`)
  }

export const getProducts = async (ids:string[]) => {
    const idstring = ids.reduce((prv,cr)=>(prv+`ids[]=${cr}&`),'')
    return await authApi.get<IProduct[]>(`/products?${idstring}`)
  }

export const getBestSellingProducts = async (cat='',lim=30) => {
  console.log(lim);
    return await authApi.get<IProduct[]>(`/products/bestSelling?cat=${cat}&lim=${lim}`)
  }

export const getProductsQuery = async (skip=0,limit=15,q='',cat='',mip='',map='',order=-1,fUp=false,sortBy='') => {
    return await authApi.get<ISearchPage>(`/products?skip=${skip}&limit=${limit}&q=${q}&cat=${cat}&mip=${mip}&map=${map}&order=${order}&fUp=${fUp}&sortBy=${sortBy}`)
  }



