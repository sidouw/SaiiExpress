import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProductDesription from './ProductDesription';
import ProductReviews from './ProductReviews';



interface productInfoPropTypes{

}

const ProductInfo = ({}:productInfoPropTypes)=>(
<Tabs >
    <TabList className="px-4 border-b-2 border-gray-200 ">
      <Tab className="inline-block p-2 cursor-pointer" selectedClassName='inline-block border-b-4 border-gray-900 font-bold'>DESCRIPTION</Tab>
      <Tab className="inline-block p-2 cursor-pointer" selectedClassName='inline-block border-b-4 border-gray-900 font-bold'>CUSTUMER REVIEW (0)</Tab>
    </TabList>

    <TabPanel>
      <div className="h-full w-full" >
          <ProductDesription/>
      </div>     
    </TabPanel>

    <TabPanel >
        <div className="h-full w-full  p-5" >
            <ProductReviews/>
        </div>
    </TabPanel>

  </Tabs>
)


export default ProductInfo
