import Categories from "./Categories"
import ItemViewer from "./ItemViewer"
import HomeUserCard from './UserHomeCard'

const mg1 = 'https://api.lorem.space/image/watch?w=640&h=480&r=7329'
const mg2 = 'https://api.lorem.space/image/watch?w=640&h=480&r=3189'
const mg3 = 'https://api.lorem.space/image/shoes?w=640&h=480&r=2134'
const mg4 = 'https://api.lorem.space/image/watch?w=640&h=480&r=1466'


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