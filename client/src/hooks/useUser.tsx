import { useMutation,useQueryClient} from '@tanstack/react-query';
import {AxiosError} from "axios"

import { IUpdateUserInfo,IUpdateUserPassword,IUpdateUserEmail, IShippingAdress, ICartItem, IWhishListItem} from '../api/types'
import { updateUserAdressFn, updateUserdefualtAdressFn, updateUserEmailFn, updateUserInfoFn, updateUserPasswordFn,addProductToCartFn, addProductToWhishListtFn, removeProductFromWhishListtFn, removeProductFromCartFn} from '../api/users'



interface useUser {
    updateUserInfo: (info:IUpdateUserInfo) => void;
    loadingInfoUpdate : boolean
    updateUserEmail: (info:IUpdateUserEmail) => void;
    loadingEmailUpdate : boolean
    updateUserPassword: (info:IUpdateUserPassword) => void;
    loadingPasswordUpdate : boolean
    addUserShippingAdress : (adress: IShippingAdress) =>void
    setUserDefaultAdress : (adress:string) => void
    addItemToCart : (item:ICartItem) => void
    addProductTowhishlist : (product:string) => void
    removeItemFromCart : (product:string) => void
    removeProductFromwhishlist : (product:string) => void
  }

export function useUser(): useUser {

    // const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const updateInfoMutation = useMutation(
        updateUserInfoFn,
        {
        onSuccess(data) {
            queryClient.setQueryData(['user'],(old:any)=>{
                return{...old,fullname:data.data.fullname,phonenumber:data.data.phonenumber}
            })
            
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const updateEmailMutation = useMutation(
        updateUserEmailFn,
        {
        onSuccess(data) {
            queryClient.setQueryData(['user'],(old:any)=>{
                return{...old,email:data.data.email}
            })
            
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const updatePasswordMutation = useMutation(
        updateUserPasswordFn,
        {
        onSuccess(data) {
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const addItemToCartMutation = useMutation(
      addProductToCartFn,
        {
        onSuccess:(data,variables)=> {
          queryClient.setQueryData(['user'],(old:any)=>{
            const oldCart = old.cart
            return{...old,cart:[...oldCart,variables]}
        })
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const addProductToWhishListMutation = useMutation(
      addProductToWhishListtFn,
        {
        onSuccess:(data,variables)=> {
          queryClient.setQueryData(['user'],(old:any)=>{
            const oldwhishlist = old.whishlist
            return{...old,whishlist:[...oldwhishlist,variables]}
        })
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const rmoveItemFromCartMutation = useMutation(
      removeProductFromCartFn,
        {
        onSuccess:(data,variables)=> {
          queryClient.setQueryData(['user'],(old:any)=>{
            const filtredCart = old.cart.filter((it:ICartItem) => it.product !== variables)
            return{...old,cart:filtredCart}
        })
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const rmoveProductFromWhishListMutation = useMutation(
      removeProductFromWhishListtFn,
        {
        onSuccess:(data,variables)=> {
          queryClient.setQueryData(['user'],(old:any)=>{
            const filtredWhichList = old.whishlist.filter((it: IWhishListItem) => it.product !== variables)
            return{...old,whishlist:filtredWhichList}
        })
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const addAdressMutation = useMutation(
        updateUserAdressFn,
        {
        onSuccess(data) {
          queryClient.setQueryData(['user'],(old:any)=>{            
            return{...old,shippingadresses:[...old.shippingadresses,data.data]}
        })
          
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const updateDefaultAdressMutation = useMutation(
        updateUserdefualtAdressFn,
        {
        onSuccess(data) {

          queryClient.setQueryData(['user'],(old:any)=>{            
            // 
            const newAdresses = [...old.shippingadresses]

              for (let index = 0; index < newAdresses.length; index++) {
                if(newAdresses[index].adress1 === data.data.adress1){
                  newAdresses[index].default = true
                  continue
                }
 
                newAdresses[index].default = false
              }
              
            return{...old,shippingadresses:[...newAdresses]}
            // ,shippingadresses:adressIndex
            })

        },
        
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )



  const  updateUserInfo = (info:IUpdateUserInfo)=>{
    updateInfoMutation.mutate(info)
  }
  const  updateUserEmail = (email:IUpdateUserEmail)=>{
    updateEmailMutation.mutate(email)
  }
  const  updateUserPassword = (password:IUpdateUserPassword)=>{

    updatePasswordMutation.mutate(password)
  }

  const  addUserShippingAdress = (adress:IShippingAdress)=>{
    addAdressMutation.mutate(adress)
  }
  const  setUserDefaultAdress = (adress:string)=>{
    updateDefaultAdressMutation.mutate(adress)
  }
  
  const  addItemToCart = (item:ICartItem)=>{
    if(addItemToCartMutation.isLoading) return
    addItemToCartMutation.mutate(item)
  }  

  const  addProductTowhishlist = (product:string)=>{
    if(addProductToWhishListMutation.isLoading) return
    addProductToWhishListMutation.mutate(product)
  }  
  const removeItemFromCart = (item:string)=>{
    
    if(rmoveItemFromCartMutation.isLoading) return
    rmoveItemFromCartMutation.mutate(item)
  }  

  const  removeProductFromwhishlist = (product:string)=>{
    if(rmoveProductFromWhishListMutation.isLoading) return
    rmoveProductFromWhishListMutation.mutate(product)
  }

  return {
    updateUserInfo,
    loadingInfoUpdate:updateInfoMutation.isLoading,
    updateUserEmail,
    loadingEmailUpdate:updateEmailMutation.isLoading,
    updateUserPassword,
    loadingPasswordUpdate:updatePasswordMutation.isLoading,
    addUserShippingAdress,
    setUserDefaultAdress,
    addItemToCart,
    addProductTowhishlist,
    removeItemFromCart,
    removeProductFromwhishlist

  };
}