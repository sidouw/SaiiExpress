import { IProduct } from '../api/types';
import useQueryCach from '../hooks/useQueryCach';




const ProductDesription = ()=> {
    const product = useQueryCach('product') as IProduct
    
  return (
    <div className=" flex justify-center p-5">
        {product?.description}
    </div>
  )
}

export default ProductDesription