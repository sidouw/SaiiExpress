

import Separator from "./Separator"
import ProductCard from "./ProductCard";

const MoreProducts = ()=> {
  return (
    <>
    <Separator>Best Selling!</Separator>
    <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 md:grid-cols-5 p-2 [&:nth-child(3)]:hidden" >
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>

    </div>
    </>
    
  )
}


export default MoreProducts