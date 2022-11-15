import { useMemo } from 'react';
import { BsCheckCircleFill,BsFillXCircleFill } from 'react-icons/bs';

import { useCheckoutSession } from '../hooks/useCheckout';
import useQueryParams from '../hooks/useQueryParams';

const CheckoutCompletedPage = ()=> {
const queryParams = useQueryParams()
const sessionID = useMemo(()=>queryParams.get('id') as string|undefined ,[queryParams])
const {data,isLoading} = useCheckoutSession(sessionID)
  return (
    <div className=" pb-16 sm:p-5 ">

        <div className="max-w-[1200px] mx-auto">
          <div className={`flex flex-col justify-start items-center py-12 gap-9 ${Boolean(data?.data) ?'text-green-700':'text-red-700'}`}>
            { isLoading?
            <h2 className='text-4xl font-bold text-gray-700 '>Loading .....</h2>
            : 
            <>       
              <h2 className='text-4xl font-bold'>{Boolean(data?.data) ?"Order Completed":"Wrong Order"}</h2>
              {Boolean(data?.data) ? <BsCheckCircleFill size={120}/> : <BsFillXCircleFill size={120}/>}
            </>   
            }
          </div>
        </div>
    </div>
  )
}

export default  CheckoutCompletedPage