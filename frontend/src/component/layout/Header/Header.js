import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaShoppingBag } from 'react-icons/fa';

import './header.css'
import Search from "../../Product/Search";


const Header = () => {

  return (
    <nav className="navbar navbar-expand-lg" style={{ height: "81px", backgroundColor: "rgb(233 238 236)" }}>
      <div className="container-fluid d-flex justify-content-center align-items-center" id="dropdown" style={{ fontSize: "1.4rem" }}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaShoppingBag size={36} style={{ marginRight: "0.5rem", fontSize: "30px" }} />
          <span style={{ fontSize: "30px"}}>E-Commerce</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ color: "#000" }}><span>Home</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="/products" style={{ color: "#000" }}><span>Products</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#000" }}><span>Contact</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#000" }}><span>About</span></Link>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse " id="navbarSupportedContent" style={{margin:"0 3rem"}}>
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "30vw" }} />
                <button className="btn btn-outline-success" type="submit">Search</button>
                <Link className="nav-link" to="/search" style={{ color: "#000" }}><span>Search</span></Link>
              </form>
            </li>
          </ul> */}
          <Search />
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Link className="nav-link" to="/" style={{ fontSize: "1.4rem", color: "#000" }}><span>Profile</span>  <FaUser /></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: "1.4rem", color: "#000" }}><span>Cart</span> <FaShoppingCart /></Link>
            </li>
          </ul>
        </div>

        
      </div>
    </nav>
  )
};

export default Header;
