import {useForm} from "react-hook-form";
import {Link} from 'react-router-dom'
import {ILoginUser} from '../api/types'
import {useAuth} from '../hooks/useAuth'


const LoginForm = ()=>{

    const { register, handleSubmit,formState: {errors}  } = useForm();

    const {signin} =useAuth()

    const onSubmit = (user:ILoginUser)=>{
        // console.log(newUser);
        signin(user)
    }
    return(
            <div className="rounded-lg w-full">  
                <div className="p-12">
                    <form onSubmit={handleSubmit((data) => onSubmit(data as ILoginUser))}>
                        
                        <div className="mb-6 w-80 ">
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-400 focus:outline-none"
                            {...register("email", { required: true })}
                            placeholder="Email"
                        />
                        </div>
                        
                        <div className="mb-6 w-80">
                        <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-400 focus:outline-none"
                            {...register("password", { required: true })}
                            placeholder="Password"
                        />
                        </div>
                        
                        <div className="text-center pt-1 mb-12 pb-1">
                        <button
                            className="inline-block px-6 py-3 text-white font-medium text-md leading-tight uppercase rounded bg-red-400 hover:bg-red-300 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        >
                            Log in
                        </button>
                        <Link className="text-gray-500" to="/recover">Forgot password?</Link>
                        </div>

                    </form>
                </div>
            </div>
    )
}

export default LoginForm