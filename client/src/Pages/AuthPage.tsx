import {Link} from 'react-router-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm'
import { useAuthed } from '../hooks/useAuth';

const AuthPage= ()=> {
  const {loadingAuth,user}=useAuthed()

  
  return (

    <div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center gap-7">
        
        <div className='w-full border-b flex justify-center   border-gray-200' >
            <Link to="/" className='  text-red-400 text-5xl font-semibold py-4 ' >SaiiExpress</Link>
        </div>

        <div className='flex flex-col  items-center flex-1  w-full' >      
            <Tabs >
                <TabList className="px-4 flex items-center justify-center gap-8 ">
                <Tab className="inline-block p-2 cursor-pointer hover:text-red-400" selectedClassName='inline-block border-b-4 border-red-400 font-bold'>Login</Tab>
                <Tab className="inline-block p-2 cursor-pointer hover:text-red-400" selectedClassName='inline-block border-b-4 border-red-400 font-bold'>Register</Tab>
                </TabList>

                <TabPanel>
                    <LoginForm/>
                </TabPanel>

                <TabPanel>
                    <RegisterForm/>
                </TabPanel>

            </Tabs>
        </div>

    </div>
    
  )
}

export default AuthPage



