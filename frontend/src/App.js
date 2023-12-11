import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/layout/Home/Home.js';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import ScrollToTop from "./Scroll";


function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
   <Router>
    <ScrollToTop />
    <Header />
    <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/product/:id' element={<ProductDetails />}/>
    <Route exact path='/products' element={<Products />}/>
    <Route path='/products/:keyword' element={<Products />}/>
    <Route exact path='/search' element={<Search /> }/>
    

    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
