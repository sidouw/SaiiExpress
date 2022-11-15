import { useState,useEffect } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';


import { IProduct, IShippingAdress } from '../api/types';
import ShippingAdress from '../Components/ShippingAdressCard';
import { useAuthed } from '../hooks/useAuth';
import useCheckout from '../hooks/useCheckout';
import { useGetProduct,useGetProducts } from '../hooks/useProduct';
import useQueryParams from '../hooks/useQueryParams';
import { useUser } from '../hooks/useUser';

interface IcheckoutItem {
    product:IProduct |undefined
    qty:number
    sku:number
}

const CheckoutPage = ()=> {
    
    const queryParams = useQueryParams()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectAdress, setSelectAdress] = useState<IShippingAdress>();
    const [checkoutItems, setCheckoutItmes] = useState<IcheckoutItem[]>();
    const {user} = useAuthed()

    const productId = queryParams.get('product')

    const productsListFromCart = productId ? [] : user? user.cart.map((it)=>(it.product),[]):[]

    const {product,status:productStatus} = useGetProduct(productId||'')
    
    
    const {products,status:productsStatus} = useGetProducts(productsListFromCart)
    
    const checkout = useCheckout()

    useEffect(()=>{
       setSelectAdress(user?.shippingadresses.find((adr)=>adr.default)) 
    },[user])


    useEffect(()=>{
        if (!productId) return
        if (!product) return
        const qty = Number(queryParams.get('qty')) || 1
        const sku = Number(queryParams.get('sku'))|| 0
        setCheckoutItmes([{product:product,qty,sku}])
    },[product])
    
    useEffect(()=>{
        if (productId) return
        if (!products) return
        if(!user) return
        const checkoutItemList:IcheckoutItem[] = user.cart.map(it=>{
            const prod = products.find(p=>p._id===it.product)
            return{product:prod, qty:it.qty, sku:it.sku}
        })
        setCheckoutItmes([...checkoutItemList])

    },[products,user?.cart])  

    useEffect(()=>{
        checkout.isLoading
        if (!checkout.data) return
        window.location.href = checkout.data.data
    },[checkout.data])   


    const onSetShippingAdress = (adress:IShippingAdress)=>{
        setSelectAdress(adress)
        setIsOpen(false)
    }

    const handleCheckoutQty = (change:number,productID:string='')=>{
        if(!checkoutItems) return
        const productIndex = checkoutItems?.findIndex((it => it.product?._id === productID))
        checkoutItems[productIndex].qty=checkoutItems[productIndex].qty+change
        setCheckoutItmes([...checkoutItems])
    }

    const onPlaceOrder= ()=>{
        if(!checkoutItems) return 
        if(!selectAdress) return 
        const orders = checkoutItems.map(ch=>({product:(ch.product ? ch.product._id : ""),sku:ch.sku,qty:ch.qty}))
        checkout.mutate({orders,adress:selectAdress})
        
    }
  return (
    <>
        <div className="w-full pb-16 sm:pb-5  bg-gray-100">

        <div className="max-w-[1200px] mx-auto">

            <div className='flex flex-col sm:flex-row py-10 -400 gap-4' >
                
                <div className='flex flex-1 flex-col gap-4 bg-teal rounded-md'>

                    <div className='relative min-h-[10rem] '> 
                        {
                            selectAdress ?
                        <>
                            <ShippingAdress adress={selectAdress} title/>
                            <button className='absolute font-semibold top-10 right-5 sm:top-[40%]  sm:right-10 text-red-400 hover:brightness-125' onClick={()=> setIsOpen(true)} >Change</button>
                        </>
                        :
                        <div className='w-full h-full flex justify-center items-center bg-white rounded-md'>
                            <Link className='font-semibold text-red-400' to='/user'> Add A shipping adress </Link>
                        </div>
                        }
                        
                    </div>


                    <div className='flex flex-col gap-2 bg-white rounded-md p-4'>
                        {
                            checkoutItems?.map((it,ind)=><CheckoutProduct showRemoveBtn={!productId} handelQty={(change)=> handleCheckoutQty(change,it.product?._id)} key={it.product?._id} item={it}/>)
                        }
                    </div>

                </div>


                <div className="h-96 flex-[.5] p-5 bg-white rounded-md">
                    
                    <div className="flex flex-col gap-3 border-b border-b-gray-200 pb-5 mb-5">
                        <span className="text-2xl font-bold" >Summary</span>

                        <div className="flex justify-between items-center" >
                            <span className="text-sm font-semibold">Total item costs</span>
                            <span className="text-sm font-semibold">€ {checkoutItems ? checkoutItems.reduce((partialSum, a) => partialSum + ((a.product?.skus[a.sku].price as number * a.qty)), 0) : 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Promo Code</span>
                            <input placeholder='Coupon' className="outline-none bg-gray-100 px-3 py-1 border-gray-400 rounded-md" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Total shipping</span>
                            <span className="text-sm font-semibold">Free</span>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">€ {checkoutItems ? checkoutItems.reduce((partialSum, a) => partialSum + ((a.product?.skus[a.sku].price as number * a.qty)), 0) : 0}</span>
                        </div>
                        <button onClick={onPlaceOrder} disabled ={checkout.isLoading} className='font-semibold bg-red-400 w-full text-lg  rounded-lg py-2 px-3 text-white hover:brightness-110'>Place Order</button>
                    </div>
                </div>
                
            </div>
            <div className='fixed flex sm:hidden sm:pointer-events-none flex-col gap-2 right-0 left-0 bottom-0 z-10 p-4 bg-white border-t shadow' >
                <div className='flex justify-between w-full text-gray-900 font-semibold text-lg '>
                    <span >Total</span>
                    <span>€ {checkoutItems ? checkoutItems.reduce((partialSum, a) => partialSum + ((a.product?.skus[a.sku].price as number * a.qty)), 0) : 0}</span>
                </div>
                <button onClick={onPlaceOrder} disabled={checkout.isLoading} className='font-bold text-white bg-red-400 rounded-lg py-2 px-3' >Place Order</button>
            </div>

        </div>

        </div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        contentLabel="Example Modal"
        className="  p-3 rounded-md bg-gray-100"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 z-40 grid justify-center items-center bg-black bg-opacity-50"
    >
           
            <div className='flex flex-col gap-2 w-96 max-h-96 overflow-y-auto '>

                {
                    user?.shippingadresses.map((a,i)=>(                                   
                    <button key={i} onClick={()=> onSetShippingAdress(a)}>
                        <ShippingAdress  adress={a}/>
                    </button>))
                }
            </div>
        </Modal>
    </>
  )
}


export default CheckoutPage


type CheckoutProductPropTypes = {
    item:IcheckoutItem
    handelQty:(change:number)=>void
    showRemoveBtn?:boolean
}

const CheckoutProduct = ({item,handelQty,showRemoveBtn}:CheckoutProductPropTypes)=>{

    const {removeItemFromCart} = useUser()

    const onRemoveItemFromCart = ()=>{
        if (!item.product) return
        removeItemFromCart(item.product._id)
    }
    return(
        <div className="flex flex-col sm:flex-row items-center gap-3 relative" >

            
            <img src={item.product?.image.link} className ="h-32 w-32 self-start mt-2 object-cover" />

            <div className='flex flex-col gap-1'>
                <span>{item.product?.name}</span>
                <span className="text-xs text-gray-600">{item.product?.skus[item.sku].name}</span>
                <div >
                    <span className="text-gray-900 font-semibold">€ {item.product?.skus[item.sku].price as number}</span>
                
                    <div className='border-b border-b-gray-200 flex items-center py-2 gap-2 w-full '>
                        <span className='text-sm mr-auto' >Quantity:</span>
                        <div className='flex items-center py-2 gap-3'>
                            <button onClick={()=>{item.qty>1 && handelQty(-1)}} className='bg-gray-200 rounded-full px-2.5 py-0 text-lg font-semibold' >-</button>
                            <span>{item.qty}</span>
                            <button onClick={()=>{item.qty< (item.product? item.product.skus[item.sku].qty:0) && handelQty(1)}} className='bg-gray-200 rounded-full px-2 py-0 text-lg font-semibold'>+</button>
                        </div>
                    </div>
                </div>
            </div>
           {showRemoveBtn&& <button onClick={onRemoveItemFromCart} className='bg-gray-200 rounded-full px-2 py-2 absolute right-5 bottom-1/3 hover:shadow-lg hover:brightness-105'>
                    <BsTrashFill  size={20}/> 
            </button>}
        </div>
    )}


