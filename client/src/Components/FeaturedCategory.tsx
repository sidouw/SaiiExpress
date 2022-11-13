
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getBestSellingProducts } from "../api/products";

interface FeaturedCategoryPropTypes{
    hero?:boolean
    title:React.ReactNode[] |string
    cat:string
  }
  
  const FeaturedCategory = ({hero=false,title="",cat}:FeaturedCategoryPropTypes)=>{

    const {data,isFetching} = useQuery([`products${cat}`],()=>getBestSellingProducts(cat,hero?6:3),{refetchOnWindowFocus:false})

    
    return (
    <>
      {isFetching ?
      <div className= {`${hero&&"col-span-2 sm:row-span-3"} bg-white p-3 rounded-lgw-full hover:shadow-lg cursor-pointer `} >
        <span className="font-bold py-2 text-lg " >{title}</span>
        <div className="flex gap-1 mt-1 " >
          <div className="w-20 h-20 rounded-lg bg-yellow-400" ></div> 
          <div className="w-20 h-20 rounded-lg bg-red-400" ></div> 
          <div className="w-20 h-20 rounded-lg bg-blue-400" ></div> 
        </div> 
      
      </div>
      :
      <Link to="/" className= {`${hero&&"col-span-2 sm:row-span-3"} bg-white p-1 rounded-lgw-full hover:shadow-lg cursor-pointer `} >
        <span className="font-bold py-2 text-lg " >{title}</span>
        <div className={"flex gap-1 mt-1 justify-center flex-wrap"} >
          {
            data?.data.map(prod=><img src={prod.image.link} className={`${hero?"w-[15%] h-20 sm:w-[45%] sm:h-32":"w-[30%] h-20"}  rounded-lg bg-cover shadow-md`} /> )
          }
        </div> 
      </Link>}
    </>
  )}

  export default FeaturedCategory