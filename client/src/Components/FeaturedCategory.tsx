
interface FeaturedCategoryPropTypes{
    hero?:boolean
    title:React.ReactNode[] |string
  }
  
  const FeaturedCategory = ({hero=false,title=""}:FeaturedCategoryPropTypes)=>(
    <div className= {`${hero&&"col-span-2 sm:row-span-2"} bg-white p-3 rounded-lgw-full hover:shadow-lg cursor-pointer `} >
      <span className="font-bold py-2 text-lg " >{title}</span>
      <div className="flex gap-1 mt-1 " >
        <div className="w-20 h-20 rounded-lg bg-yellow-400" ></div> 
        <div className="w-20 h-20 rounded-lg bg-red-400" ></div> 
        <div className="w-20 h-20 rounded-lg bg-blue-400" ></div> 
      </div> 
  
    </div>
  )

  export default FeaturedCategory