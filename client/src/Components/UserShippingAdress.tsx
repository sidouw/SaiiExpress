import { useState } from 'react';

import AddNewShippingAdressForm from './AddNewShippingAdressForm'
import ShippingAdress from './ShippingAdressCard'

import { useAuthed } from '../hooks/useAuth';
import { IShippingAdress } from '../api/types';
import { useUser } from '../hooks/useUser';
import { updateUserdefualtAdressFn } from '../api/users';

const UserShippingAdress= ()=> {
    
    const [addingNewAdress,setAddingNewAdress] = useState(false)
    const {addUserShippingAdress,setUserDefaultAdress} = useUser()
    const {loadingAuth,user} = useAuthed()
    
    const addNewAdress = (address:IShippingAdress)=>{
        addUserShippingAdress(address)
        setAddingNewAdress(false)
    }
    const onAdressClick = (id:string)=>{
        setUserDefaultAdress(id)
    }
  return (
    <>
        {
            addingNewAdress?
            <AddNewShippingAdressForm onSubmit={addNewAdress} onCancel={()=>setAddingNewAdress(false)}/>
            :
            <>
                <button onClick={()=>setAddingNewAdress(true)} className= {"font-semibold bg-red-400 self-start text-lg rounded-md p-1 px-2 text-white hover:brightness-110"} >Add a new Adress</button>
                <div className='flex justify-center sm:justify-start flex-wrap gap-4' >
                    {
                        // Array(7).fill(0).map((v,i)=>(                                   
                        user?.shippingadresses.map((ad,i)=>(                                   
                        <button key={ad.adress1} >
                            <ShippingAdress onAdressClick={onAdressClick} adress={ad}/>
                        </button>))
                    }

                </div>
            </>
        }
    </>
  )
}

export default UserShippingAdress