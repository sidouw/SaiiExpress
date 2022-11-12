import {useEffect,useState} from 'react'
import  {useParams,useNavigate,Link} from 'react-router-dom'
import { recoverPasswordCheckFn, recoverPasswordFn, setRecoveryPasswordFn } from '../api/users'


const ForgotPassword = ()=> {

    const {id} = useParams()
    const [loading,setLoading] = useState<boolean>(true)
    const [verified,setVerified] = useState<boolean>(false)
    
    useEffect(()=>{
        if(!id)
            return
        recoverPasswordCheckFn(id).then((data)=>{
            console.log(data);
            console.log("data.data");
            setLoading(false)
            setVerified(true)
            
        }).catch((e)=>{
            console.log(e);
            setLoading(false)
            setVerified(false)
            alert("No recovery requet found")
        })

    },[id])


  return (

    <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center gap-7">
        
        <div className='w-full border-b flex justify-center   border-gray-200' >
            <Link to="/" className='  text-red-400 text-5xl font-semibold py-4 ' >SaiiExpress</Link>
        </div>
        
        <div className='  flex-1 w-full' >
            <div className="w-full flex justify-center ">  
                <div className="p-12 max-w-[450px] flex-1 ">
                  {verified?<PasswordForm/>:<EmailForm/>}
                </div>
            </div>
        </div>
    </div>

  )
}

export default  ForgotPassword

const EmailForm = ()=>{

    const handleSubmit=(e:React.SyntheticEvent)=>{
        e.preventDefault()
        const target = e.target as typeof e.target & {
            email: { value: string }
        }
        if(!target.email.value ||target.email.value.trim()==='')
            return
        console.log(target.email.value);
        
        recoverPasswordFn(target.email.value).then((d)=>{
            alert(d.data);
            
        }).catch((e)=>{
            console.log(e.response);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className=" mb-6 w-full">
                <input
                type="text"
                className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-400 focus:outline-none"
                name='email'
                placeholder="Email"
                required
                />
            </div>
            
            
            <div className="pt-1 mb-12 pb-1">
                <button
                className="inline-block px-6 py-3 text-white font-medium text-xs leading-tight uppercase rounded bg-red-400 hover:bg-red-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                >
                    Recover
                </button>
            </div>

        </form>
    )
}

const PasswordForm = ()=>{
    const {id} = useParams()
    const navigate = useNavigate()

    const handleSubmit=(e:React.SyntheticEvent)=>{
        e.preventDefault()
        const target = e.target as typeof e.target & {
            password: { value: string }
        }
        if(!target.password.value ||target.password.value.trim()==='')
            return
        setRecoveryPasswordFn(target.password.value,id).then((d)=>{
            alert(d.data);
            navigate("/auth")
            
        }).catch((e)=>{
            console.log(e.response);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className=" mb-6 w-full">
                <input
                type="password"
                className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-400 focus:outline-none"
                name='password'
                placeholder="password"
                required
                />
            </div>
            
            
            <div className="pt-1 mb-12 pb-1">
                <button
                className="inline-block px-6 py-3 text-white font-medium text-xs leading-tight uppercase rounded bg-red-400 hover:bg-red-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                >
                    Confirm password
                </button>
            </div>

        </form>
    )
}