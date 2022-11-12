import {BsPerson } from 'react-icons/bs';
import { uploadUserImageFn } from '../api/users';

import ImageUploader from './ImageUploader'
//TODO Spinner for image Upload
const UserProfileImage=()=>{
    
const imageUpload = (image:string)=>{

    uploadUserImageFn(image).then((d)=>{
        console.log(d.data);
        
    })
}

    return(
        <div className='w-48 h-48 p-0 rounded-full self-center  ' >
        <ImageUploader imageUpload={imageUpload} >
            <span className='font-semibold text-xl text-gray-800' >
              <BsPerson size={100}/>
            </span>
        </ImageUploader>
      </div>
    )
}

export default UserProfileImage