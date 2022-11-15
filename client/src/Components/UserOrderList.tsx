
import { IProduct } from '../api/types'
import t from '../assets/1.jpg'
import { useUserOrders } from '../hooks/useUser'


const UserOrderList = ()=> {
    const {data,isLoading} = useUserOrders()
    const orders = data?.data
  return (
    
    <div className='flex flex-col gap-2 ml-5 bg-white rounded-md p-4'>
        {
           !isLoading&& orders?.map((or)=><OrderListProduct order={or} key={or._id}/>)
        }
    </div>  
  )
}

export default UserOrderList

interface IOrder {
    product?:IProduct
    qty: 1,
    sku: 0,
    createdAt:string
}

type orderListPropTypes ={
    order:IOrder
}

const OrderListProduct = ({order }:orderListPropTypes)=>(
    
    <div className="flex flex-col sm:flex-row items-center gap-3 border-b border-b-gray-200 pb-3 " >


        <img src={order.product?.image.link} className ="h-32 w-32 self-start mt-2 object-cover mx-auto sm:mx-0"  />


        <div className='flex flex-col gap-1 self-start'>
            <span>{order.product?.name}</span>
            <span className="text-xs text-gray-600 leading-[1.5]">{order.product?.skus[order.sku].name} x {order.qty} <br/> {order.createdAt.slice(0,10)} at {order.createdAt.slice(11,16)}</span>
            <div className=''>
                <span className="text-gray-900 font-semibold">$ {Number( order.product?.skus[order.sku].price)  * order.qty}</span>
            </div>
        </div>
        
        

        
    </div>
)