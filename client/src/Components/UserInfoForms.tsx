import { useEffect } from "react";
import {useForm, FieldValues} from "react-hook-form";

import {useAuthed} from '../hooks/useAuth';
import {useUser} from '../hooks/useUser';





export const UserInfoForm = ()=>{
    //TODO Fill Errors 
    const { register,reset, handleSubmit,formState: {errors}  } = useForm({});

    const {user,loadingAuth}= useAuthed()
    const {updateUserInfo}= useUser()

    const onSubmit = (vals:FieldValues)=>{
        updateUserInfo({
            fullname:vals.fullname,
            phonenumber:vals.phonenumber
        })
    }

    useEffect(()=>{
        reset(user)
    },[loadingAuth])

    return(<>
            
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex flex-wrap gap-4 mb-4 ">
                    <input  className="w-56 h-8 flex-1 sm:flex-none px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("fullname")} placeholder="First Name" />
                    <input className="w-56 h-8 flex-1 sm:flex-none px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("phonenumber")} placeholder="Phone Number" />
                </div>
                <button className="font-semibold bg-red-500 self-start text-md rounded-md p-1 px-4 text-white hover:brightness-110" >Update Information</button>
            </form>
            </>
            )
}


export const UserEmailForm = ()=>{

    const { register,reset, handleSubmit,formState: {errors}  } = useForm({});

    const {user,loadingAuth}= useAuthed()
    const {updateUserEmail}= useUser()

    const onSubmit = (vals:FieldValues)=>{
        updateUserEmail({email:vals.email})
    }

    useEffect(()=>{
        reset(user)
    },[loadingAuth])

    return(
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="flex flex-wrap gap-4 mb-4 ">
                <input required className="w-2/5 h-8 flex-1 sm:flex-none px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                {...register("email", { required: true })} placeholder="Email" />
            </div>
            <button className="font-semibold bg-red-500 self-start text-md rounded-md p-1 px-4 text-white hover:brightness-110" >Update Email</button>
        </form>
    )
}


export const UserPasswordForm = ()=>{

    const { register,reset, handleSubmit,formState: {errors}  } = useForm({});

    const {updateUserPassword}= useUser()

    const onSubmit = (vals:FieldValues)=>{
        updateUserPassword({currentpassword:vals.currentpassword,newpassword:vals.password})
    }

    return(
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="flex flex-wrap gap-4 mb-4 ">
                <input required type="password" className="w-56 h-8 flex-1 sm:flex-none px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                {...register("currentpassword", { required: true })} placeholder="Current Password" />
                <input autoComplete="new-password"  required type="password" className="w-56 h-8 flex-1 sm:flex-none px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                {...register("password", { required: true })} placeholder="New Password" />
            </div>
            <button className="font-semibold bg-red-500 self-start text-md rounded-md p-1 px-4 text-white hover:brightness-110" >Update Password</button>
        </form>
    )
}