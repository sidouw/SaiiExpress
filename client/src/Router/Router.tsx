import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';



import HomePage from "../Pages/HomePage"
import SearchPage from "../Pages/SearchPage"
import ProductPage from "../Pages/ProductPage"
import CheckoutPage from "../Pages/CheckoutPage"
import AuthPage from "../Pages/AuthPage"
import ForgotPassword from "../Pages/ForgotPassword"
import UserPage from "../Pages/UserPage"
import MainPage from '../Pages/MainPage';
import ConfirmationPage from '../Pages/ConfirmationPage';
import CheckoutCompletedPage from '../Pages/CheckoutCompletedPage';

const Err= () =>(<h1>Errr</h1>)


const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<MainPage />} path='/' errorElement={<Err/> } >
                <Route element={<HomePage />} path='/' />
                <Route element={<SearchPage />} path='search' />
                <Route element={<ProductPage />} path='product/:id' />
                <Route element={<CheckoutPage/>} path='checkout' />
                <Route element={<CheckoutCompletedPage/>} path='checkout/completed' />
                <Route element={<UserPage />} path='user' />
                <Route element={<ConfirmationPage />} path='confirm/:id' />
            </Route>
            <Route element={<AuthPage />} path='/auth' errorElement={<Err/> }/>
            <Route element={<ForgotPassword />} path='/recover' errorElement={<Err/> }/>
            <Route element={<ForgotPassword />} path='/recover/:id' errorElement={<Err/> }/>
        </>
    )
  );
  
  export default Router