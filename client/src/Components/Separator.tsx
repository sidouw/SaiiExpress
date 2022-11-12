interface separatorProps{
    children?:React.ReactNode[]|string
}

const Separator = ({children}:separatorProps)=> {
    return (
          <div  className="flex justify-center items-center p-3 gap-3">
            <div className=" w-1/6 h-0.5 bg-gray-200 " ></div>
            <span className=" font-bold pb-2 text-xl sm:text-2xl "  >{children}</span>
            <div className=" w-1/6 h-0.5 bg-gray-200 " ></div>
          </div>
  
    )
  }
  
  export default Separator