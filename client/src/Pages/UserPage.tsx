import { useState,useEffect } from 'react';

import {useNavigate } from 'react-router-dom'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {BsHeart,BsGear,BsGeoAlt, BsClipboard} from 'react-icons/bs'

import UserSettings from '../Components/UserSettings';
import UserShippingAdress from '../Components/UserShippingAdress';
import UserWhishList from '../Components/UserWhishList';
import UserOrderList from '../Components/UserOrderList';
import { useAuthed } from '../hooks/useAuth';
import useQueryParams from '../hooks/useQueryParams';


const tabList=[
    'ShippingAddress',
    'WhishList',
    'Orders',
    'Settings',
]

const  UserPage = ()=> {
    const navigate = useNavigate()
    const queryParams = useQueryParams()
    const {loadingAuth,user} = useAuthed()
    const [tabIndex, setTabIndex] = useState<number>(0);
    const tab = queryParams.get('tab')
    
    useEffect(()=>{       
        if(!user&&!loadingAuth)
            navigate('/auth')
    },[user,loadingAuth])    

    useEffect(()=>{
        const ind =Math.max(0,tabList.findIndex(v=>v===tab)) 
        setTabIndex(ind)
    },[tab])


  return (

    <div className="w-full bg-gray-100">
            
        <div className="max-w-[1200px] mx-auto py-5">

        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="flex" >

            <TabList  className="fixed bottom-0 z-20 left-0 right-0 py-3 sm:py-0 sm:w-auto sm:h-auto sm:static flex sm:flex-col gap-2 justify-evenly items-center sm:justify-start sm:items-stretch min-w-[200px] bg-white sm:rounded-lg border-t-2 border-gray-200 ">
                <Tab className="inline-flex items-center gap-1 p-2 pt-4 cursor-pointer outline-none" selectedClassName=' border-b-4 sm:border-b-0 sm:border-l-4 border-red-400 font-bold bg-gray-100'>
                    <BsGeoAlt size={20}/> <span className='hidden sm:block'>Shipping Address</span> </Tab>
                <Tab className="inline-flex items-center gap-1 p-2 cursor-pointer outline-none" selectedClassName='inline-block border-b-4 sm:border-b-0 sm:border-l-4 border-red-400 font-bold bg-gray-100'>
                    <BsHeart size={20}/> <span className='hidden sm:block'>Whish List</span></Tab>
                    <Tab className="inline-flex items-center gap-1 p-2 cursor-pointer outline-none" selectedClassName='inline-block border-b-4 sm:border-b-0 sm:border-l-4 border-red-400 font-bold bg-gray-100'>
                    <BsClipboard size={20}/> <span className='hidden sm:block'>Orders</span></Tab>
                <Tab className="inline-flex items-center gap-1 p-2 cursor-pointer outline-none" selectedClassName='inline-block border-b-4 sm:border-b-0 sm:border-l-4 border-red-400 font-bold bg-gray-100'>
                    <BsGear size={20}/> <span className='hidden sm:block'>Settings</span></Tab>

            </TabList>

            <TabPanel className={`${tabIndex===0 ? 'block' : 'hidden'} w-full`}>
                <div className="p-5 flex items-center flex-col gap-4 -300 w-full " >
                    <h2 className='text-2xl self-start' >My Shipping Adress</h2>
                    <UserShippingAdress/>

                </div>     
            </TabPanel>

            <TabPanel className={`${tabIndex===1 ? 'block' : 'hidden'} w-full`}>
                <h2 className='text-2xl ml-5 mb-4 mt-5' >My Whish List</h2>
                <UserWhishList/>
            </TabPanel>

            <TabPanel className={`${tabIndex===2 ? 'block' : 'hidden'} w-full`}>
                <h2 className='text-2xl ml-5 mb-4 mt-5' >My Whish List</h2>
                <UserOrderList/>
            </TabPanel>

            <TabPanel className={`${tabIndex===3 ? 'block' : 'hidden'} w-full`}>
                <div className="p-5 flex flex-col gap-4 w-full" >
                    <h2 className='text-2xl' >My Settings</h2>
                    <UserSettings/>
                </div>
            </TabPanel>

        </Tabs>
        </div>
    </div>
  )
}

export default  UserPage

