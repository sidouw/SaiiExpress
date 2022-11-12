import {  useQuery} from '@tanstack/react-query';

import {IProduct} from '../api/types'
import {getProduct,getProducts} from '../api/products'




interface IuseGetProduct{
  product : IProduct | undefined
  status : string
}

interface IuseGetProducts{
  products : IProduct[] |undefined
  status : string
}

export function useGetProduct(id:string=''): IuseGetProduct {
  const {data,status} = useQuery(['product'], () => getProduct(id), {
    enabled: Boolean(id),
  }) 
  const product = data?.data
  return {
    product,
    status
  }
}

export function useGetProducts(ids:string[]): IuseGetProducts {
  const {data,status} = useQuery(['products'], () => getProducts(ids), {
    enabled: Boolean(ids.length>0),
  }) 
  const products = data?.data
  return {
    products,
    status
  }
}