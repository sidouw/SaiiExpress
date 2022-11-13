import FeaturedCategory from "./FeaturedCategory"
import Separator from "./Separator"

const FeaturedCategories = ()=> {

  return (
    <>
        <Separator>Featured Categories</Separator>

        <div className="grid grid-cols-2 grid-rows-4 sm:grid-rows-2 sm:grid-cols-4 gap-3" >
          <FeaturedCategory hero title="Tech" cat='phone'/>
          <FeaturedCategory title="Fashion"  cat='women'/>
          <FeaturedCategory title="Home" cat='home'/>
          <FeaturedCategory title="Pet Care" cat='other'/>
          <FeaturedCategory title="Sports" cat='men'/>
          <FeaturedCategory title="Vehicles" cat='automotive'/>
          <FeaturedCategory title="other" cat='other'/>
        </div>
    </>
  )
}


export default  FeaturedCategories