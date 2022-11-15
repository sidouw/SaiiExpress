import { useMutation,useQuery} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cartCheckoutFn, CheckoutSessionFn } from '../api/checkout';

export const useCheckout = ()=>{
    return  useMutation(
        cartCheckoutFn,
        {
        onSuccess(data) {
            console.log(data);
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )
}

export const useCheckoutSession= (id:string|undefined)=>{
    return useQuery(['checkoutSession'],()=>CheckoutSessionFn(id), {
        enabled: Boolean(id),
        refetchOnWindowFocus:false,
        refetchInterval:0
      })
}

export default useCheckout