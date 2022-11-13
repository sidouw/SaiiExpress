

import Separator from "./Separator"
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getBestSellingProducts } from "../api/products";

const MoreProducts = ()=> {
  const {data,isFetching} = useQuery(['products'],()=>getBestSellingProducts(),{refetchOnWindowFocus:false})
  
  return (
    <>
    <Separator>Best Selling!</Separator>
    <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 md:grid-cols-5 p-2 " >
        {
          isFetching?
          <span>Loading .....</span>
          :
          data?.data.map(prod=><ProductCard key={prod._id} product={prod}/>)
        }

    </div>
    </>
    
  )
}


export default MoreProducts