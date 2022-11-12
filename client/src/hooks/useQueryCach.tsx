import {useQueryClient} from '@tanstack/react-query';

const  useQueryCach =(key:string)=>{
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData([key]) as any
    return data?.data
}
export default useQueryCach