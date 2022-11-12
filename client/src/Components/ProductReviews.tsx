
import { BsStarFill,BsPerson } from "react-icons/bs"

const ProductReviews = ()=> {
  return (
    <div>
        <div>
            <span className=" text-lg font-bold text-gray-900">Customer Reviews (14)</span>

            <div className="flex flex-col-reverse sm:flex-row items-center gap-5 my-3  sm:gap-24">

                <div className="">
                    <StartBar stars={5} percentage= {48} />
                    <StartBar stars={4} percentage= {48} />
                    <StartBar stars={3} percentage= {48} />
                    <StartBar stars={2} percentage= {48} />
                    <StartBar stars={1} percentage= {48} />
                </div>

                <div className="flex items-center gap-4" >
                    <div className="flex items-center gap-0.5">
                        <span className="font-bold" >5.0</span>
                        <span className="text-gray-600">/</span>
                        <span className="text-gray-600" >5</span>
                    </div>
                    <Stars maxStars={5} size={25} number= {5} />
                </div>

            </div>
        </div>
        
        <UserReview/>
        <UserReview/>
        <UserReview/>
        <UserReview/>
        <UserReview/>
        <UserReview/>
        <UserReview/>
    </div>
  )
}
 


export default  ProductReviews

const UserReview= ()=>(

    <div className="inline-flex gap-2 py-4 border-t border-gray-200" >

        <div className="flex flex-col  items-center max-w-[80px] w-full gap-2  " > 
            <span className="font-semibold text-gray-900" >User 007</span> 
            <span className="bg-gray-200 rounded-full p-1" ><BsPerson size={45} /> </span>
        </div>

        <div className="flex flex-col gap-2" >

            <Stars size={15} number={5} />

            <span className="font-semibold text-sm text-gray-500" >Color: Black </span>
            
            <p>
                They are excellent pieces, very good sound, 
                arrived in good time and shape, there was a missing one out there but nothing that can't be fixed, 
                ready for the following orders
            </p>
            <span className=" text-sm text-gray-500">07 Oct 2022 04:14</span>
        </div>

    </div>
)

interface starsPropTypes{
    number:number
    maxStars?:number
    size:number
}

const Stars = ({number,maxStars=5,size}:starsPropTypes)=>(
    <div className="flex gap-1">
        {
            Array(maxStars).fill(0).map((i,ind)=>(
                <BsStarFill key={ind} color={Math.floor(number)>ind? "F87171":"#DDD"} size={size} />
            ))
        }
    </div>
)


interface StartBarPropTypes{
    stars:number
    percentage:number
}

const StartBar = ({stars,percentage}:StartBarPropTypes)=>(
    <div className="flex gap-4 items-center my-2" >
        <span  >{stars} Stars</span>
        <div className="h-1 w-48 bg-gray-200 translate-y-0.5" >
            <div className="h-full w-1/2 bg-red-400"/>
        </div>
        <span className=" border border-gray-200 px-3 rounded-md cursor-pointer hover:border-red-400 ">{percentage}%</span>
    </div>
)