import axios from 'axios';
import cookies from 'js-cookie'
import {IRegisterUser,ILoginUser,GenericResponse,ILoginResponse, IUser} from "./types"

const BASE_URL = 'http://127.0.0.1:5000/api/'

export const authApi = axios.create({
  baseURL: BASE_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json';


// export const refreshAccessTokenFn = async () => {
//     const response = await authApi.get<ILoginResponse>('auth/refresh');
//     return response.data;
//   };



export const signUpUserFn = async (user: IRegisterUser) => {
    return await authApi.post<GenericResponse>('users/register', user);
    //  response.data;
  };
  
  export const loginUserFn = async (user: ILoginUser) => {
    return await authApi.post<ILoginResponse>('users/login', user);
    // return response.data;
  };
  
  export const verifyEmailFn = async (verificationCode: string) => {
    const response = await authApi.get<GenericResponse>(
      `auth/verifyemail/${verificationCode}`
    );
    return response.data;
  };
  
  export const logoutUserFn = async () => {
    const response = await authApi.get<GenericResponse>('users/logout');
    return response.data;
  };
  
  export const getUserFn = async () => {
    const response = await authApi.get<IUser>('users/auth', {
      headers:{
        'Authorization':'Bearer '+cookies.get('token')
     }});
    return response.data;
  };