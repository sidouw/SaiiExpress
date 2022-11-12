import {Outlet } from 'react-router-dom';

import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"

const MainPage = ()=> {


  return (
    <>
      <NavBar/>
        <Outlet/>
      <Footer/>
    </>
  )
}

export default MainPage