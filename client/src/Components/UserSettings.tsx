import { UserInfoForm,UserEmailForm,UserPasswordForm } from './UserInfoForms'
import UserProfileImage from './UserProfileImage';

const UserSettings = ()=> {

  return (
    
    <div className='flex flex-col gap-3 bg-white rounded-md p-4'>
        <UserProfileImage/>
        <div className='w-1/2 h-px bg-gray-200 self-center' ></div>
        <UserInfoForm />
        <div className='w-1/2 h-px bg-gray-200 self-center' ></div>
        <UserEmailForm />
        <div className='w-1/2 h-px bg-gray-200 self-center' ></div>
        <UserPasswordForm/>
    </div>  
  )
}

export default UserSettings

