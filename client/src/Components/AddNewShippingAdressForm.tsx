
import {useForm,Resolver} from "react-hook-form";
import { IShippingAdress } from "../api/types";

interface AddNewShippingAdressFormProptypes {
    onSubmit:(values:IShippingAdress)=>void
    onCancel:()=>void
}


const resolver: Resolver<IShippingAdress> = async (values,c) => {
    return {
      values: values ? values : {},
      errors :{}
    }
  }
  
const AddNewShippingAdressForm = ({onSubmit,onCancel}:AddNewShippingAdressFormProptypes)=>{
    const { register, handleSubmit,formState: {errors}  } = useForm({ resolver });
    // const [data, setData]=useState<FieldValues>();
    return(

        <form className="bg-white p-5 " onSubmit={handleSubmit((data) => onSubmit({...data,default:false}))}>

            <div className="flex flex-col gap-2 mb-4">

                <span className="font-semibold">Contact</span>
                <div className="flex gap-4 ">
                    <input required className="w-full h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("fullname", { required: true })} placeholder="Full name" />
                    <input required type="number" className="w-full h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("phonenumber", { required: true })} placeholder="Phone Number" />
                </div>

            </div>

            <div className="flex flex-col gap-4 mb-5 ">

                <span className="font-semibold">Adress</span>

                <div className="flex gap-4 ">
                    <input required className="w-full h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("adress1", { required: true })} placeholder="Street,house/appartment/unit*" />
                    <input className="w-full h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("adress2")} placeholder="Apt/Suite/Unit,etc...(Optional)" />
                </div>
                
                <div className="flex flex-wrap gap-4 ">
                    <input required className="w-48 h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("country", { required: true })} placeholder="Country" />
                    <input required className="w-48 h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("state", { required: true })} placeholder="State/Province/Region" />
                    <input required className="w-48 h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("city", { required: true })} placeholder="City" />
                    <input  required type="number" className="w-48 h-8 px-3 py-5 bg-none outline-none border border-gray-300 rounded-md focus:border-gray-500 transition-all duration-300" 
                    {...register("zip", { required: true })} placeholder="Zip Code" />
                </div>
                
            </div>

            <button className="font-semibold bg-red-500 self-start text-lg rounded-md p-1 px-4 text-white hover:brightness-110 mr-4" type="submit">Save</button>
            <button className=" bg-gray-200 self-start text-lg rounded-md p-1 px-4 text-gray-800 hover:brightness-110" onClick={()=>onCancel() } type="button">Cancel</button>

        </form>

    )
}
export default AddNewShippingAdressForm