import { BsList,BsGenderFemale,BsGenderMale,BsPhone,BsLaptop,BsCamera,BsHandbag,BsGearWideConnected } from "react-icons/bs";


export const categoryList=[
    {
        icon:<BsGenderFemale  size={20} color={"grey"}/>,
        text:"Women's Fashion"
    },
    {
        icon:<BsGenderMale size={20} color={"grey"}/>,
        text:"Men's Fashion"
    },
    {
        icon:<BsPhone size={20} color={"grey"}/>,
        text:"Phones & Telecommunication"
    },
    {
        icon:<BsLaptop size={20} color={"grey"}/>,
        text:"Computer, Office"
    },
    {
        icon:<BsCamera size={20} color={"grey"}/>,
        text:"Consumer Electronics"
    },
    {
        icon:<BsHandbag size={20} color={"grey"}/>,
        text:"Accessories"
    },
    {
        icon:<BsGearWideConnected size={20} color={"grey"}/>,
        text:"Automobiles & Motorcycles"
    },

]

 const Categories= ()=> {
  return (
    <div className="flex-[1.01]  ">
        <div className="bg-white rounded-lg " >
            <span className="flex items-center gap-2 font-semibold mb-1 p-3 " > <BsList className=" text-xl"/> Categories</span>
            <ul className="list-none ">
                {
                    categoryList.map((cat)=>
                        <li className="flex items-center gap-2 cursor-pointer text-sm px-3 py-2 hover:font-bold hover:shadow-md" key={cat.text} >
                            {cat.icon} 
                            <span className="hover:text-red-400 whitespace-nowrap">{cat.text}</span>
                            
                        </li>
                    )
                }
            </ul>
        </div>
    </div>
  )
}

export default Categories
