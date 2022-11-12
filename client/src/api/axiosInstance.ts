import axios, { AxiosRequestConfig } from 'axios';



const config: AxiosRequestConfig = { baseURL: '127.0.0.1:5000/api' };
export const axiosInstance = axios.create(config);