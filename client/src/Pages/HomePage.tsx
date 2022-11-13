
import FeaturedCategories from "../Components/FeaturedCategories"
import MainHomeSection from "../Components/MainHomeSection"
import MoreProducts from "../Components/MoreProducts"

// const product = 

const HomePage = ()=> {
  return (
    <div className="w-full pb-16 sm:pb-5  bg-gray-100">

      <div className="max-w-[1200px] mx-auto">
        <MainHomeSection/>
        <FeaturedCategories/>
        <MoreProducts/> 
        
      </div>
    </div>

  )
}

export default HomePage
