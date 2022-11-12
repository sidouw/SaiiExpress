import { useState } from "react";
import { BsStarFill,BsHeartFill,BsHeart } from "react-icons/bs";

import { Link } from "react-router-dom";
import { IProduct } from "../api/types";
import { useAuthed } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

interface ProductCardPropTypes {
    large?:boolean
    product:IProduct
}

// TODO Better Stylying
const ProductCard = ({large=false,product}:ProductCardPropTypes)=>{
   
    const {user} = useAuthed()
    const {addProductTowhishlist,removeProductFromwhishlist} = useUser()
    const [whishListed,setWhishListed] = useState(Boolean(user?.whishlist.find(w=>w.product===product._id)))
    
    const onWhishList= (e:React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(whishListed){
            removeProductFromwhishlist(product._id)
            setWhishListed(false)
        }else{
            addProductTowhishlist(product._id)
            setWhishListed(true)
        }
    }
    
    return (
    <Link to={`/product/${product?._id}`} className={` flex flex-col h-72 ${large? 'sm:h-80  sm:gap-2': 'sm:h-72'} relative bg-white rounded-lg hover:shadow-lg cursor-pointer overflow-hidden hover:underline sm:[&:nth-child(even)]:translate-y-0 [&:nth-child(even)]:translate-y-16 `}>
        <img src={product.image.link} className ="h-3/5 object-cover" />
            <button onClick={onWhishList} className=' absolute bottom-4 right-5 z-10 rounded-full text-red-400 hover:brightness-120 hover:shadow-lg shadow-white'>
               {whishListed ? <BsHeartFill size={20} /> : <BsHeart size={20} /> }
            </button>
        <div className={`flex flex-col flex-1 p-2 gap-2 ${ large&&'gap-2'}`} >

                <span className="whitespace-nowrap text-sm mb-1" >{product.name}</span>

                <span > 
                    <span className="whitespace-nowrap text-xl font-semibold " >{product.skus[0].price.toString().split(".")[0]}</span>
                    <span className="whitespace-nowrap text-sm "  >,{product.skus[0].price.toString().split(".")[1]}$</span>
                </span>

                <span className="flex items-center" > 
                    <span className="whitespace-nowrap text-sm mr-2 text-gray-500 " >{product.orders} Sold</span>
                    <span className="flex items-center gap-1 whitespace-nowrap text-sm "  > <BsStarFill color="#F87171" size={7} /> {product.rating}</span>
                </span>
        </div>
    </Link>
)}
export default ProductCard
