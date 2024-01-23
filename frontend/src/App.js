import React, { useState ,useEffect} from 'react';
import './App.css';
import axios from 'axios'
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
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'

import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import UserList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/contact/Contact';
import About from './component/contact/About';

import NotFound from './component/layout/Not Found/NotFound' 

// import Payment from './component/Cart/Payment'

// import { useSelector } from 'react-redux';


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  // const [userdata,setUserdata] =useState({});

  // const { user } = useSelector((state) => state.user);

  // setUserdata(user);


  const [stripeApiKey,setstripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("api/v1/stripeapikey");

    setstripeApiKey(data.stripeApiKey);
  } 

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
    
  },[]);

  window.addEventListener("contextmenu",(e)=> e.preventDefault());

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
    <Route path='/shipping' element={<Shipping /> }/>
    {/* <Route path='/order/confirm' element={<ConfirmOrder /> }/> */}
    <Route path='/success' element={<OrderSuccess /> }/>


    <Route path="/order/confirm" element={<Elements stripe={stripeApiKey ? loadStripe(stripeApiKey) : null}><ConfirmOrder /></Elements>} />

    <Route path='/orders' element={<MyOrders /> }/>
    <Route path='/order/:id' element={<OrderDetails /> }/>

    <Route path='/admin/dashboard' element={<Dashboard /> }/>
    <Route path='/admin/products' element={<ProductList /> }/>
    <Route path='/admin/product' element={<NewProduct /> }/>
    <Route path='/admin/product/:productId' element={<UpdateProduct /> }/>
    <Route path='/admin/orders' element={<OrderList /> }/>
    <Route path='/admin/users' element={<UserList /> }/>
    <Route path='/admin/user/:userId' element={<UpdateUser /> }/>
    <Route path='/admin/reviews' element={<ProductReviews /> }/>

    <Route path='/contact' element={<Contact /> }/>
    <Route path='/about' element={<About /> }/>


    <Route path='/*' element={<NotFound /> }/>



    {/* <Elements stripe={loadStripe(stripeApiKey)}>
    <Route path='/process/payment' element={<Payment /> }/>
    </Elements> */}

    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
