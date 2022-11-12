import FeaturedCategory from "./FeaturedCategory"
import Separator from "./Separator"

const FeaturedCategories = ()=> {

  return (
    <>
        <Separator>Featured Categories</Separator>

        <div className="grid grid-cols-2 grid-rows-4 sm:grid-rows-2 sm:grid-cols-4 gap-3" >
        <FeaturedCategory title="Fashion" hero/>
        <FeaturedCategory title="Tech"/>
        <FeaturedCategory title="Home"/>
        <FeaturedCategory title="Pet Care"/>
        <FeaturedCategory title="Sports"/>
        <FeaturedCategory title="Vehicles"/>
        <FeaturedCategory title="Home"/>
        </div>
    </>
  )
}


export default  FeaturedCategories