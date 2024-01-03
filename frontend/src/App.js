import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/layout/Home/Home';
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import ScrollToTop from "./Scroll";
import LoginSignUp from './component/User/LoginSignUp'
import store from './store'
import { loadUser } from './actions/userAction';
import UpdateProfile from './component/User/UpdateProfile'
import Profile from './component/User/Profile';
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword'
import ResetPassword from './component/User/ResetPassword'

import Cart from './component/Cart/Cart'

function App() {

  // const { user ,isAuthenticated} = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    
  },[]);

  return (
   <Router>
    <ScrollToTop />
    <Header />
    <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/product/:id' element={<ProductDetails />}/>
    <Route exact path='/products' element={<Products />}/>
    <Route path='/products/:keyword' element={<Products />}/>
    <Route path='/search' element={<Search /> }/>
    <Route path='/login' element={<LoginSignUp /> }/>
    <Route path='/account' element={<Profile /> }/>
    <Route path='/me/update' element={<UpdateProfile /> }/>
    <Route path='/password/update' element={<UpdatePassword /> }/>
    <Route path='/password/forgot' element={<ForgotPassword /> }/>
    <Route path='/password/reset/:token' element={<ResetPassword /> }/>
    
    <Route path='/cart' element={<Cart /> }/>

    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
