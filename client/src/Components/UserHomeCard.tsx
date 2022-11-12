import { BsPerson,BsClipboard } from "react-icons/bs";


import mg2 from '../assets/2.jpg' 



const  UserHomeCard = ()=> {
  return (
    <div className=' flex flex-col h-full w-full p-3 gap-8' >

        <div className='flex flex-col justify-center items-center gap-2  ' >
            <img className='w-14 h-14 object-cover rounded-full' src={mg2} />
            <span className='font-semibold' >Hi, Sidouw</span>
        </div>

        <div className='flex  justify-center items-center gap-8  ' >
            <button>
                <div className='flex  justify-center items-center w-14 h-14 rounded-full bg-gray-100 '>
                    <BsPerson color={"grey"} size={30}/>
                </div>
                <span>Account</span>
            </button>

            <button>
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
