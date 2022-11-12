import {BsTrashFill,BsCart2} from 'react-icons/bs'

import { useAuthed } from '../hooks/useAuth'
import { useGetProduct } from '../hooks/useProduct'
import { useUser } from '../hooks/useUser'

const UserWhishList = ()=> {
    const {user} = useAuthed()
    
  return (
    
    <div className='flex flex-col gap-2 mx-5 bg-white rounded-md p-4'>
        {
            user?.whishlist.map((it)=>(
                <WhishListProduct productID={it.product} key={it.product}/>
            ))
        }
    </div>  
  )
}

export default UserWhishList

type whishListProductPropTypes = {
    productID:string
}

const WhishListProduct = ({productID}:whishListProductPropTypes)=>{
    const {product,status} = useGetProduct(productID)
    const {removeProductFromwhishlist,addItemToCart} = useUser()
    const onAddToCart = ()=>{
        addItemToCart({
            product:productID,
            sku:0,
            qty:1
        })
    }
    const onRemove= ()=>{
        removeProductFromwhishlist(productID)
    }
return (

    <div className="flex flex-col sm:flex-row items-center gap-3 " >


        <img src={product?.image.link} className ="h-32 w-32 self-start mt-2 object-cover" />


        <div className='flex flex-col gap-1'>
            <span>{product?.name}</span>
            <span className="text-xs text-gray-600">{product?.skus[0].name}</span>
            <div>
                <span className="text-gray-900 font-semibold">€ {product?.skus[0].price as number /1000}</span>
            
                <div className='border-b border-b-gray-200 flex justify-end items-center gap-2'>
                    <div className='flex items-center py-2 gap-3'>
                        <button onClick={onAddToCart} className='bg-red-400 rounded-full flex items-center gap-2 text-white px-4 py-1 text-lg font-semibold' >
                            <BsCart2 size={25}/>to Cart
                        </button>
                        <button onClick={onRemove} className='bg-gray-200 rounded-full flex items-center gap-2  px-4 py-1 text-lg font-semibold'>
                            <BsTrashFill/> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
)}