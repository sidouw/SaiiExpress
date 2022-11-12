
import { IProduct } from '../api/types'
import t from '../assets/1.jpg'
// import { useAuthed } from '../hooks/useAuth'

const UserOrderList = ()=> {
    // const {user} = useAuthed()
  return (
    
    <div className='flex flex-col gap-2 ml-5 bg-white rounded-md p-4'>
        <OrderListProduct/>
        <OrderListProduct/>
    </div>  
  )
}

export default UserOrderList

type orderListPropTypes ={
    product?:IProduct
}

const OrderListProduct = ({product}:orderListPropTypes)=>(
    
    <div className="flex flex-col sm:flex-row items-center gap-3 border-b border-b-gray-200 pb-3 " >


        <img src={t} className ="flex-1 h-32 w-32 self-start mt-2 object-cover" />


        <div className='flex flex-col gap-1'>
            <span>New Bluetooth Wireless Mouse with USB Rechargeable RGB Mouse for Computer Laptop New Bluetooth Wireless Mouse with USB Rechargeable RGB Mouse</span>
            <span className="text-xs text-gray-600">Black Mouse</span>
            <div className=''>
                <span className="text-gray-900 font-semibold">€ 4,78</span>
            </div>
        </div>
        
        

        
    </div>
)