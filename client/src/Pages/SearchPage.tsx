import { useEffect,useRef,useState } from "react";
import { BsArrowUpShort,BsStarFill,BsArrowDownShort } from "react-icons/bs";
import {useInfiniteQuery} from "@tanstack/react-query"
import { getProductsQuery } from "../api/products";

import ProductCard from "../Components/ProductCard"; 
import useQueryParams from '../hooks/useQueryParams';
import useOnScreen from "../hooks/useOnScreen";


const SearchPage = ()=> {

    const queryParams = useQueryParams()

    const [sortBy,setSortBy] = useState<string>("rating")
    const [order,setOrder] = useState<number>(-1)
    const [fourStars,setFourStars] = useState<boolean>(false)
    const maxPRef = useRef<LegacyRef<HTMLInputElement>>()
    const minPRef = useRef<LegacyRef<HTMLInputElement>>()

    const scrollRef = useRef<HTMLDivElement>()
    const ScrellDivVisible = useOnScreen(scrollRef,'10px')
    const {data,isFetching,hasNextPage,fetchNextPage,refetch} = useInfiniteQuery(['products'],
    async ({ pageParam = 0 }) => {
        const q=queryParams.get('q')||''
        const cat=queryParams.get('cat')||''
        const res = await getProductsQuery(pageParam,15,q,cat,minPRef.current.value,maxPRef.current.value,order,fourStars,sortBy)
        return res.data
      },
    {
        getNextPageParam:(pages) =>{
            const nextPage = Number(pages.skip)+15
            return nextPage<Number(pages.totalProducts) ? nextPage:undefined
        },
    })
    useEffect(()=>{
        (ScrellDivVisible && hasNextPage)&&fetchNextPage()
    },[ScrellDivVisible])

    useEffect(()=>{
        refetch()
    },[queryParams,fourStars,sortBy,order])    

    useEffect(()=>{

        
    },[fourStars])

  return (
    <div className="w-full bg-gray-100">
        <div className="max-w-[1200px] mx-auto">

            <div className="flex flex-col  gap-3 p-1 sm:p-3" >

                <div>
                    <span className="font-semibold text-sm text-gray-400">All Categories &gt; </span>
                    <span className="font-semibold  ">{queryParams.get('cat') ||"All"}</span>
                </div>

                <div className=" flex flex-row flex-wrap sm:flex-row gap-4 p-2">

                    <div className=" flex gap-1 items-center">
                        <span className="font-semibold text-gray-800">Price:</span>
                        <input ref={minPRef} type="number" placeholder="Min" className="w-14 text-sm rounded-sm p-1 bg-white outline-none border-none focus:shadow"/>
                        <span className="font-semibold text-gray-800">-</span>
                        <input ref={maxPRef} type="number" placeholder="Max" className="w-14 text-sm rounded-sm p-1 bg-white outline-none border-none focus:shadow"/>
                    </div>

                    <div className=" flex gap-1 items-center">
                        <span className="font-semibold text-gray-800">Sort by:</span>
                        <select value={sortBy} onChange ={(e)=>setSortBy(e.currentTarget.value)} className="  text-sm rounded-sm w-24 p-1 font-semibold text-red-400 bg-white outline-none border-none" >
                            <option value="rating">
                                Rating
                            </option>
                            <option value="orders">
                                Orders
                            </option>
                            {/* <option value="price">
                                Price
                            </option> */}
                        </select>
                        
                        <button onClick={()=>setOrder(order==-1?1:-1)} className=" flex justify-center items-center  rounded-sm  w-6 bg-transparent outline-none border-none  ">
                           {order==1 ? <BsArrowUpShort size={25}/> : <BsArrowDownShort size={25}/>}
                        </button>
                    </div>

                    <div className=" flex gap-2 items-center">
                        <input onChange={()=>setFourStars(!fourStars)}  type="checkbox" className="w-4 h-4 accent-red-400 rounded after:hidden"/>
                        <span className="flex items-center gap-1 font-semibold text-sm text-gray-800">
                            <BsStarFill color="#F87171" size={11}/>
                            <BsStarFill color="#F87171" size={11}/>
                            <BsStarFill color="#F87171" size={11}/>
                            <BsStarFill color="#F87171" size={11}/>
                            <BsStarFill color="#D8D8D8" size={11}/>
                            & Up
                        </span>
                        
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 md:grid-cols-5  p-2" >
                    <>
                        {
                            data?.pages.map(page=>(
                                page.products.map(prod=>(
                                    <ProductCard product={prod} large key={prod._id}  />
                                    ))
                            ))
                        }
                        <div ref={scrollRef} className ="w-96 mt-16 flex justify-center" >
                            {isFetching && <span className="semi-bold text-xl text-gray-600">Loading more Products.....</span>}
                            {!hasNextPage && <span className="semi-bold text-lg text-gray-600">No More Products you've seen it all !!</span>}
                        </div>
                    </>
                </div>
        
            </div>
        </div>

    </div>

  )
}


export default  SearchPage