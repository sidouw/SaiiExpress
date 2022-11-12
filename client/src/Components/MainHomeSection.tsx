import Categories from "./Categories"
import ItemViewer from "./ItemViewer"
import HomeUserCard from './UserHomeCard'

import mg1 from '../assets/1.jpg'
import mg2 from '../assets/2.jpg'
import mg3 from '../assets/3.jpg'
import mg4 from '../assets/4.jpg'


const mgItems = [
  <img className=" w-full h-full object-fill" src={mg1} />,
  <img className=" w-full h-full object-fill" src={mg2} />,
  <img className=" w-full h-full object-fill" src={mg3} />,
  <img className=" w-full h-full object-fill" src={mg4} />,
]

const MainHomeSection =()=> (
    <>

        <div  className="hidden sm:flex p-5 gap-3">
            
            <Categories/>

            <div className="bg-white flex-[2.6] rounded-lg" >
                <ItemViewer dotIndicators rounded items={mgItems} />
            </div>

            <div className="bg-white flex-1 rounded-lg" >
                <HomeUserCard/>
            </div>

        </div>

    </>
)

export default  MainHomeSection