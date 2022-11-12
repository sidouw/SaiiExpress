
// TODO Add icons

import { IShippingAdress } from "../api/types"


type shippingAdressPropTypes = {
    title?:boolean
    adress:IShippingAdress
    onAdressClick?:(id:string) =>void

}

const ShippingAdress = ({title=false,onAdressClick,adress}:shippingAdressPropTypes)=>(
    <div onClick={()=>onAdressClick&&onAdressClick(adress.adress1)} className={`flex flex-col min-w-[270px] gap-2 ${adress.default ?'bg-red-100':'bg-white'} rounded-md p-4`}>

        {title&& <span className='text-xl font-bold text-gray-800'>Shipping Address</span>   }
        
        <div className='flex flex-col leading-6 sm:leading-7 relative '>
            {adress.default && <span className="absolute right-0 bottom-0 text-sm text-red-400">Default</span>}
            <span className='font-semibold text-gray-900'>{adress.fullname}</span>
            <span className='font-semibold text-gray-600'>{adress.adress1} {adress.adress2}</span>
            <span className='font-semibold text-gray-600'>{adress.city}{adress.state}{adress.country}{adress.zip}</span>
            <span className='font-semibold text-gray-600'>{adress.phonenumber}</span>
        </div>
    </div>

)
export default ShippingAdress