import {useRef,useState,useEffect,DragEvent } from "react";


type imageUploaderPropTypes = {
  imageUpload?: (image:string)=>void
  image?:string
  children:React.ReactNode
}

export default ({children,imageUpload,image}:imageUploaderPropTypes)=>{
    
    const dropArea = useRef<HTMLDivElement>(null)
    const types = ['image/png', 'image/jpeg', 'image/gif']
    const [uploadedImage,setUploadedImage] = useState<string | ArrayBuffer | null>('')
    //foncs

  
    useEffect(()=>{
      image && setUploadedImage(image)
    },[image])

    //
    const  handleDrop= (e:DragEvent<HTMLDivElement>)=> {
        unhighlight(e)
        const dt = e.dataTransfer
        const files = dt.files  
        handleFiles(files)
        
    
    }

    
    const  handleFiles = (files:FileList| null)=> {
        if(!files)
          return

        const filesArray = [...files]

        const errs:string[]=[]
          filesArray.forEach((file, i) => {
      
            if (types.every(type => file.type !== type)) {
              errs.push(`'${file.type}' is not a supported format`)
            }
      
            if (file.size > 2000000) {
              errs.push(`'${file.name}' is too large, please pick a smaller file`)//2MB Image
            }
          })
          
          if (errs.length) {
            return errs.forEach(err => alert(err))
          }

         
          filesArray.forEach(previewFile)
    }

    const  highlight = (e:DragEvent<HTMLDivElement>)=> {
        e.preventDefault()
        e.stopPropagation()
        dropArea.current?.classList.add('brightness-75')
    }
    const unhighlight=(e:DragEvent<HTMLDivElement>)=> {
        e.preventDefault()
        e.stopPropagation()
        dropArea.current?.classList.remove('brightness-75')
    }
 

    const previewFile = (file:File)=> {

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = ()=> {
            setUploadedImage(reader.result)
            imageUpload && imageUpload(reader.result as string)
        }
        
    }


    return (
            <div onDragEnter={highlight} 
                  onDragOver={highlight}  
                  onDragLeave={unhighlight} 
                  onDrop={handleDrop}  
                  // id="drop-area" 
                  className={`w-full h-full bg-cover flex flex-col justify-center items-center ${!uploadedImage &&"border-2 border-dashed"} bg-black/5 group relative rounded-full z-20`}
                  ref ={dropArea}
                  style = {{backgroundImage : ` url(${uploadedImage}`}}
            >
                <span className="absolute top-0 right-0 left-0 bottom-0 rounded-full z-10 flex justify-center items-center text-center text-gray-200 text-sm  bg-gradient-to-t from-black/50 to-black/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity ">
                  Click or drop an Image</span>
                {!uploadedImage && children}
                    <input type="file" className="hidden" id="fileElem" accept={types.reduce((pr,cr)=>pr+','+cr)} onChange={e =>handleFiles(e.target.files)} />
                <label 
                  className="absolute top-0 right-0 left-0 bottom-0 rounded-full z-10 cursor-pointer" 
                  htmlFor="fileElem" />                

             </div>
    )
}
