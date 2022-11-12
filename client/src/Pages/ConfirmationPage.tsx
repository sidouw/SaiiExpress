import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

import { confirmationFn } from '../api/users'

const ConfirmationPage = ()=> {
    const {id} = useParams<string>()
    const [confirmationType,setConfirmationType] = useState<string>('x')
    useEffect(()=>{
        confirmationFn(id).then((data)=>{
            setConfirmationType(data.data)
        })
    },[])

  return (
    <>
    {
        confirmationType===''?
        <div>Loading ......</div>
        :
        <div>{confirmationType}</div>
    }
    </>
    
  )
}


export default  ConfirmationPage