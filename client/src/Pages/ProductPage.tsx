import {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom'

import { BsHeart, } from 'react-icons/bs';

import {useGetProduct} from '../hooks/useProduct'

import ItemViewer from '../Components/ItemViewer'
import ProductInfo from '../Components/ProductInfo'
import { useUser } from '../hooks/useUser'
import { useAuthed } from '../hooks/useAuth';



const ProductPage = ()=> {
  const navigate = useNavigate()
  const {id} = useParams<string>()
  const user = useAuthed()
  const {product,status} = useGetProduct(id)
  const {addItemToCart,addProductTowhishlist} = useUser()
  const [selectedSku,setSelectedSku] = useState<number>(0)
  const [qty,setQty] = useState<number>(1)

  useEffect(()=>{
    setQty(1)
  },[selectedSku])

  const onAddItemToCart = ()=>{
    if(!user) return
    if(!id) return
    addItemToCart({product:id,qty,sku:selectedSku})
  }
  const onWhishListProduct = ()=>{
    if(!user) return
    if(!id) return
    addProductTowhishlist(id)
  }
  const onBuyItem = ()=>{
    if(!user) return
    if(!id) return
    navigate(`/checkout?product=${id}&qty=${qty}&sku=${selectedSku}`)
  }

  return (
    <div className="w-full pb-16 sm:pb-5 bg-gray-100 ">

      <div className="max-w-[1200px] mx-auto flex gap-4 flex-col py-3">

        <div className="w-full bg-white overflow-hidden sm:rounded-lg flex sm:flex-row flex-col " >

          <div className="w-screen max-w-[500px] aspect-square bg-slate-400 ">
            <ItemViewer items={product?  product.skus[selectedSku].images.map(im=><img className=" w-full h-full object-cover" src={im} />) : []} />
          </div>

          <div className='flex-1 px-5 py-2'>
              <div className='border-b border-b-gray-200 flex flex-col pb-2'>
                <span className='text-2xl font-semibold mb-1'>{product?.name}</span>
                <span>{product?.orders} orders</span>
              </div>

              <div className='border-b border-b-gray-200 flex flex-col py-2'>
                  <span className='font-bold text-2xl text-gray-800' >$ { product?.skus[selectedSku].price}</span>
              </div>

              <div className='border-b border-b-gray-200 flex flex-col py-2'>
                <div className='flex gap-1 mb-3'>
                  <span className='text-sm' >model:</span> 
                  <span className='text-sm text-gray-400 '>{ product?.skus[selectedSku].name}</span>
                </div>
               

                <div className='flex gap-2' >
                  {
                    product?.skus.map((sku,ind)=>
                      <button className={`${selectedSku==ind&& "border border-red-500 rounded-sm"} `} key={ind} onClick= {()=>setSelectedSku(ind)}>
                        <img className=" w-14 h-14 object-fill rounded-md" src={sku.images[0]} />
                      </button>
                    )
                  }
                </div>

              </div>

              <div className='border-b border-b-gray-200 flex flex-col py-2 gap-2'>
                <span className='text-sm' >Quantity:</span>
                <div className='flex items-center py-2 gap-3'>
                  <button onClick={()=>setQty((old)=>old>1? old-1:1)} className='bg-gray-200 rounded-full px-2.5 py-0 text-lg font-semibold' >-</button>
                  <span>{qty}</span>
                  <button onClick={()=>setQty((old)=>old<(product?.skus[selectedSku].qty||2)? old+1:old)} className='bg-gray-200 rounded-full px-2 py-0 text-lg font-semibold'>+</button>

                  <span><>{ product?.skus[selectedSku].qty} Pieces available </> </span>

                </div>
              </div>

              <div className='hidden p-5 gap-2 sm:flex'>
                  <button onClick={onBuyItem} className='rounded-md text-lg font-bold text-white bg-red-400 px-10 py-2 hover:brightness-110 hover:shadow-md' >
                    Buy Now
                  </button>
                  <button onClick={onAddItemToCart} className='rounded-md text-lg font-bold text-white bg-red-500 px-10 py-2 hover:brightness-110 hover:shadow-md'>
                    Add to Cart
                  </button>
                  <button onClick={onWhishListProduct} className='rounded-md text-lg font-bold text-black bg-gray-300 px-4 py-2 hover:brightness-110 hover:shadow-md'>
                    <BsHeart size={20} />
                  </button>
              </div>
              <MobilePlaceOrder/>
          </div>

        </div>

        <div className="w-full  ounded-lg bg-white" >
          <ProductInfo/>
        </div>
      </div>

    </div>
  )
}

export default ProductPage


const MobilePlaceOrder = ()=>(
  <div className='fixed flex justify-around sm:hidden sm:pointer-events-none gap-2 right-0 left-0 bottom-0 p-4 z-10 bg-white border-t shadow' >
      
          <button className='rounded-md text-lg font-bold text-white bg-red-400 flex-1 py-2 hover:brightness-110 hover:shadow-md' >
            Buy Now
          </button>
          <button className='rounded-md text-lg font-bold text-white bg-red-500 flex-1 py-2 hover:brightness-110 hover:shadow-md'>
            Add to Cart
          </button>
          <button className='rounded-md text-lg font-bold text-black bg-gray-300 px-4 py-2 hover:brightness-110 hover:shadow-md'>
            <BsHeart size={20} />
          </button>

  </div>
)