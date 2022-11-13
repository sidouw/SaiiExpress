import { BsList,BsGenderFemale,BsGenderMale,BsPhone,BsLaptop,BsHandbag,BsGearWideConnected, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";


export const categoryList=[
    {
        icon:<BsGenderFemale  size={20} color={"grey"}/>,
        text:"Women's Fashion",
        cat:"women"
    },
    {
        icon:<BsGenderMale size={20} color={"grey"}/>,
        text:"Men's Fashion",
        cat:"men"
    },
    {
        icon:<BsPhone size={20} color={"grey"}/>,
        text:"Phones & Telecommunication",
        cat:"phone"
    },
    {
        icon:<BsLaptop size={20} color={"grey"}/>,
        text:"Computer, Office",
        cat:"computer"
    },
    {
        icon:<BsHandbag size={20} color={"grey"}/>,
        text:"Home",
        cat:"home"
    },
    {
        icon:<BsGearWideConnected size={20} color={"grey"}/>,
        text:"Automobiles & Motorcycles",
        cat:"automotive"
    },
    {
        icon:<BsThreeDots size={20} color={"grey"}/>,
        text:"Other",
        cat:"other"
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
                        <Link to={`/search?cat=${cat.cat}`} className="flex items-center gap-2 cursor-pointer text-sm px-3 py-2 hover:font-bold hover:shadow-md" key={cat.text} >
                            {cat.icon} 
                            <span className="hover:text-red-400 whitespace-nowrap">{cat.text}</span>
                        </Link>
                    )
                }
            </ul>
        </div>
    </div>
  )
}

export default Categories
