
import {useState} from 'react'
import { BsChevronLeft,BsChevronRight } from 'react-icons/bs';

interface itemViewerProps{
    items: string[]
    rounded?:boolean
    dotIndicators?:boolean
}

// TODO Prevent Button Spam
// TODO Seamless Wrap

const ItemViewer = ({items,rounded,dotIndicators}:itemViewerProps)=> {

const [index, setIndex] = useState(0)

const handleControl= (nindex:number)=>{
    const newIndex = index+nindex
    if (newIndex<0) {
        setIndex(items.length-1)
        return
    }
    setIndex((index+nindex)%items.length)
}


  return (
    <div className={`h-full w-full relative group ${rounded&&'rounded-lg'} overflow-hidden`}>
        <div className='absolute top-0 bottom-0 right-0 left-0 '>
            {items.map((i,ind)=>(
                
                 <div key={ind} className='absolute top-0 bottom-0 right-0 left-0 transition-all duration-700'
                        style={{
                            transform: `translateX(${(ind -index) * 100}%)`,
                        }}
                 >
                    <img className=" w-full h-full object-cover" src={i} />
                </div>
                )    
            )}
        </div>
        <Viewercontrols onControlClick={handleControl}/>
        {dotIndicators && <DotIndicators index={index} length={items.length} />}
    </div>
  )
}

export default ItemViewer

export interface viewerControlsProps {
    onControlClick:(index:number)=>void
}

const Viewercontrols = ({onControlClick}:viewerControlsProps)=>(
    <div className=" text-white absolute left-0 right-0  flex justify-between top-[40%] pointer-events-none opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:pointer-events-auto ">
        <button onClick={()=>onControlClick(-1)} className=' py-2 bg-neutral-800 bg-opacity-40 hover:bg-opacity-70 transition-all duration-700'>
            <BsChevronLeft size={30}/>
        </button>
        <button onClick={()=>onControlClick(1)} className=' py-2 bg-neutral-800 opacity-80 bg-opacity-30 hover:bg-opacity-70 transition-all duration-700'>
            <BsChevronRight size={30}/>
        </button>
    </div>

)


export interface viewerDotIndicatorsProps {
    index:number
    length:number
    dotIndicatorsGap?:number
}

// TODO To be turned into controls
const DotIndicators = ({index=1,length=1,dotIndicatorsGap=2}:viewerDotIndicatorsProps)=>{

    return(
        <div className={`h-5 flex gap-${dotIndicatorsGap} justify-center items-center absolute left-0 right-0 bottom-0`}>
            {
                Array(length).fill(0).map((i,ind)=>(
                    <div className={`${index===ind?'w-4':'w-2'}  h-2 bg-gray-200 relative rounded-full  overflow-hidden transition-all ease-in duration-500`} key={ind as React.Key}>
                        <div className={`absolute top-0 left-0 ${index===ind?'w-4':'w-2'} h-2 rounded-full bg-red-400 transition-all ease-in duration-500`} 
                            style={{
                                transform: `translateX(${(index - ind) * 8}px)`,
                              }}
                        ></div>
                    </div>
                ))
            }
        </div>
    )
}

  