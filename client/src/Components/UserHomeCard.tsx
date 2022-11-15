import { BsPerson,BsClipboard } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


import { useAuthed } from "../hooks/useAuth";



const  UserHomeCard = ()=> {
    const {user} = useAuthed()
    const navigate = useNavigate()
  return (
    <div className=' flex flex-col h-full w-full p-3 gap-8' >

        <div className='flex flex-col justify-center items-center gap-2  ' >
            {user?.photo ?
                <img className='w-14 h-14 object-cover rounded-full' src={user?.photo} />
                :
                <div className='flex  justify-center items-center w-14 h-14 rounded-full bg-gray-100 '>
                    <BsPerson color={"grey"} size={30}/>
                </div>
            }
            <span className='font-semibold' >Hi, {user?.fullname.split(" ")[0]}</span>
        </div>

        <div className='flex  justify-center items-center gap-8  ' >
            <button onClick={()=>navigate('/user?tab=Settings')}>
                <div className='flex  justify-center items-center w-14 h-14 rounded-full bg-gray-100 '>
                    <BsPerson color={"grey"} size={30}/>
                </div>
                <span>Account</span>
            </button>

            <button onClick={()=>navigate('/user?tab=Orders')}>
                <div className='flex  justify-center items-center w-14 h-14 rounded-full bg-gray-100' >
                    <BsClipboard color={"grey"} size={30}/>
                </div> 
                <span>Oders</span>
            </button>
        </div>
    </div>
  )
}

export default UserHomeCard
