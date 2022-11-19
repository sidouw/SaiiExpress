import { useState } from 'react';

import {Link,useNavigate} from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsSearch,BsCart2,BsHeart,BsPerson,BsClipboard } from 'react-icons/bs';

import useEventListener from '../hooks/UseEventListener';
import Categories from './Categories'
import {useAuthed,useAuth} from '../hooks/useAuth';
const Navbar = () => {

  const [nav, setNav] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [onTop, setOnTop] = useState(true);

  const {user,loadingAuth} = useAuthed()

  useEventListener("scroll",(e)=>{
    if (window.scrollY>100 && onTop) {
        setOnTop(false)
    }else if(window.scrollY<=70 && !onTop){
        setOnTop(true)
    }
    
  })

  const handleNav = () => {
    setNav(!nav);
  }



  return (

    <div className={`sticky top-0 z-30 w-full bg-white bg-opacity-90`}>  
     
        <div className={`max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center ${onTop? 'h-16 sm:h-24':'h-14 sm:h-16'} px-2 transition-all duration-400`}>

            <div className=' flex items-center w-full sm:w-auto gap-3 p-2 sm:p-0 sm:hidden' >
                
                <div onClick={handleNav} className='ml-4 block '>
                    {nav ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25} />}
                </div>

                <Link className='mr-auto' to='/'>
                    <h1 className=' text-3xl font-semibold text-center text-red-400 '>SaiiExpress</h1>
                </Link>
                

                <button onClick={()=>setOpenSearch(true)} className="sm:hidden rounded-full relative  " >
                      <BsSearch size={20} className = "translate-y-[5px]"/>
                </button>

                <Link to='user?tab=Settings' className="sm:hidden  rounded-full relative  " >
                      <BsPerson size={25} className = "translate-y-1"/>
                </Link>

                <Link
                    to ="Checkout"  className="sm:hidden rounded-full relative  " >
                      <BsCart2 size={25} className = "translate-y-1"/>
                </Link>

            </div>
            
            <Link to='/'>
                <h1 className=' text-4xl font-semibold text-center text-red-400 hidden sm:block '>SaiiExpress</h1>
            </Link>
            
            <SearchBar desktop />

            <div className='hidden sm:flex items-center justify-center text-3xl gap-2'>
                
                
                <Link
                    to="user?tab=WhishList"
                    className="p-2 rounded-full relative hover:text-red-400 "
                >
                      <BsHeart className = "translate-y-1"/>
                </Link>

                <Link
                to ="Checkout"
                    className="p-2 rounded-full relative hover:text-red-400 "
                >
                      <BsCart2/>
                    <div
                    className="flex justify-center items-center bg-red-400  w-7 h-7 rounded-full absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 text-white text-lg font-semibold "
                    >
                        {user? user.cart.length :0}
                    </div>
                </Link>
               
            </div>
            
            <div className='hidden sm:flex gap-2' >
                {!loadingAuth &&!user?.fullname ?
                <>
                    <Link className='font-semibold bg-red-400  text-lg rounded-lg p-1 px-2 text-white hover:brightness-110' to='auth'>
                        Register
                    </Link>
                    <Link className='font-semibold border-2 border-gray-900 bg-white  text-lg rounded-lg p-1 px-2 hover:border-red-400 hover:text-red-400 ' to='auth'>
                        Login
                    </Link>
                </>
                :

                <UserBadge/>
                }
            </div>



        <SideNav open={nav} setOpen={setNav} />
        <TopSearch open={openSearch} setOpen={setOpenSearch}/>

        </div>
    </div>
  );
};


export default Navbar

interface sideNavPropTypes{
    open:boolean
    setOpen:(val:boolean)=>void
}

const SideNav = ({open,setOpen}:sideNavPropTypes)=>(
    <>
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black ${open? "bg-opacity-50":"bg-opacity-0"} ${open&&"pointer-events-auto"} pointer-events-none transition-all ease-in-out duration-500`} onClick={()=>setOpen(false)} />

            
        <ul className= {`fixed ${open? 'left-0':'left-[-100%]'} h-full w-3/5 top-0 z-20  bg-white ease-in-out duration-500`}>

            <h1 className=' flex flex-col text-4xl font-semibold pb-3  text-red-400 m-4 border-b border-gray-200'>SaiiExpress</h1>
                <ul className='flex flex-col pb-3 border-b border-gray-200 '>
                    <li >
                        <Link className="flex items-center gap-2 cursor-pointer text-sm px-3 py-2 " to="user?tab=WhishList">
                            <BsHeart size={25} />
                            <span className="whitespace-nowrap">Whish list</span>
                        </Link>
                    </li>
                    <li >
                        <Link className="flex items-center gap-2 cursor-pointer text-sm px-3 py-2 " to="user?tab=Orders">
                            <BsClipboard size={25} />
                            <span className="whitespace-nowrap">Orders</span>
                        </Link>
                    </li>
                </ul>

            <Categories/>
            

        </ul>
    </>
)

interface topSearchPropTypes{
    open:boolean
    setOpen:(val:boolean)=>void
}

const TopSearch = ({open,setOpen}:topSearchPropTypes)=>(
    <>

        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black ${open? "bg-opacity-50":"bg-opacity-0"} ${open&&"pointer-events-auto"} pointer-events-none transition-all ease-in-out duration-500`} onClick={()=>setOpen(false)} />

        <div className= {`fixed ${open? 'top-0':'top-[-100%]'} h-92 w-full px-5 py-10 top-0 z-20 bg-gradient-to-b from-black/80 to-black/10 ease-in-out duration-500`}>
           <SearchBar/>
        </div>
    </>
)

interface searchBarPropTypes{
    desktop?:boolean
}

const SearchBar = ({desktop=false}:searchBarPropTypes)=>{
    const navigate = useNavigate()
    const onSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const query = e.currentTarget['q'].value.trim() as string
        navigate(`/search?q=${query}&cat=${e.currentTarget['cat'].value}`)         
    }
    return(
    <form onSubmit={onSubmit} className={`${desktop? 'hidden sm:flex':'flex' } justify-center items-center sm:py-2 py-1 px-4 rounded-full w-full sm:w-2/4 border-2 focus:border-red-400 gap-3 bg-white sm:bg-gray-100 text-black`}>
        <input name='q'  type="text" className='bg-transparent outline-none border-none pr-4 w-full' />
        <select name='cat' className="  text-sm rounded-lg block w-2/4 bg-transparent outline-none border-none text-gray-600 cursor-pointer">
            <option value="">Category</option>
            <option value="phone">SmartPhones</option>
            <option value="computer">Computers</option>
            <option value="home">Home</option>
            <option value="men">Men's wear</option>
            <option value="women">women's wear</option>
            <option value="automotive">automotive</option>
            <option value="other">Other</option>
        </select>
        <button >
            <BsSearch className=' text-lg text-gray-700'/>
        </button>
        
    </form>
)}

const UserBadge =()=> {
    const {signout} = useAuth()
    return (
    <div className='bg-gray-100 p-2 mr-4 rounded-full cursor-pointer relative group'>
        <BsPerson color={"grey"} size={30}/>
        <div className='absolute left-[-45%] bottom-[-180%] w-fit h-fit p-4 flex flex-col pointer-events-none gap-1 rounded-lg bg-white shadow  
                        opacity-0 group-hover:pointer-events-auto hover:pointer-events-auto group-hover:opacity-100 hover:opacity-100 transition-all duration-300 z-40'>
            <Link className='font-semibold hover:text-red-400' to= "user?tab=Settings">Settings</Link>
            <span className='font-semibold hover:text-red-400' onClick={()=>signout()}>Logout</span>
        </div>
    </div>
)}
