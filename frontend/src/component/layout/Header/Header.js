import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaShoppingBag } from "react-icons/fa";

import "./header.css";
import Search from "../../Product/Search";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const Header = () => {
  const {user,isAuthenticated} = useSelector((state) => state.user);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ height: "81px", backgroundColor: "rgb(233 238 236)" }}
    >
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        id="dropdown"
        style={{ fontSize: "1.4rem" }}
      >
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaShoppingBag
            size={36}
            style={{ marginRight: "0.5rem", fontSize: "30px" }}
          />
          <span style={{ fontSize: "30px" }}>E-Commerce</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                style={{ color: "#000" }}
              >
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
                style={{ color: "#000" }}
              >
                <span>Products</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: "#000" }}>
                <span>Contact</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: "#000" }}>
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="collapse navbar-collapse "
          id="navbarSupportedContent"
          style={{ margin: "0 3rem" }}
        >
          
          <Search />
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li
              className="nav-item"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              {!isAuthenticated ? (
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ fontSize: "1.4rem", color: "#000" }}
                >
                  <span>Login</span> <FaUser />
                </Link>
              ) : (
                <>
                  <span
                    className="user-profile"
                    style={{
                      fontSize: "1.4rem",
                      color: "#000",
                      cursor: "pointer",
                      position: "relative",
                      top:'10px',
                      display: "inline-block",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={user.avatar.url}
                      alt="User Avatar"
                      style={{ height: "1.5vmax", width: "1.5vmax" }}
                    />
                    {user.name}
                    {isHovered && <UserOptions user={user} />}
                  </span>
                </>
              )}
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
                style={{ fontSize: "1.4rem", color: "#000" }}
              >
                <span>Cart</span> <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
