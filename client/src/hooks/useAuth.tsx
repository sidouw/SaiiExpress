import { useMutation, useQuery,useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom'
import {AxiosError} from "axios"
import cookies from 'js-cookie'

import { IRegisterUser,ILoginUser,IUser } from '../api/types'
import { loginUserFn,signUpUserFn,getUserFn } from '../api/auth'

interface UseAuth {
  signin: (user:ILoginUser) => void;
  register: (user:IRegisterUser) => void;
  signout: () => void;
  isLoadingRegister:boolean
}

// type UserResponse = { user: IUser };
// type ErrorResponse = { message: string };
// // type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    
    const registerMutation = useMutation(
        signUpUserFn,
        {
        retry :0,
        onSuccess(data) {
          console.log(data);
            // toast.success(data?.message);
            navigate('/');
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

    const loginMutation = useMutation(
        loginUserFn,
        {
        onSuccess(data) {
          cookies.set('token',data.data.token)
            // toast.success(data?.message);
            // navigate('/verifyemail');
            navigate('/');
        },
        onError(error: AxiosError) {
            alert(JSON.stringify(error.response?.data));
        },
        }
    )

  
  function signin(user:ILoginUser):void {
    loginMutation.mutate(user)
  }

  function register(user:IRegisterUser):void {

    registerMutation.mutate(user)
    
  }

  function signout(): void {
    // clear user from stored user data
    cookies.set('token','')
    queryClient.setQueryData(['user'],(old:any)=>({}))
    queryClient.invalidateQueries(['user'])
  }

  // Return the user object and auth methods
  return {
    signin,
    register,
    signout,
    isLoadingRegister:registerMutation.isLoading
  };
}

type TAuthedUSer = {
  user:IUser|undefined
  loadingAuth:boolean
}
// Verify Email
export function useAuthed ():TAuthedUSer{
  const {data,isLoading} = useQuery(['user'],getUserFn,{
    retry: 0,
    // should be refetched in the background every 8 hours
    staleTime: 1000 * 60 * 60 * 8,
    refetchOnWindowFocus : true
  })
  
  return {user:data,loadingAuth:isLoading}
  
  
  // return({user:authQuery.data,loadingAuth:authQuery.isLoading})
}