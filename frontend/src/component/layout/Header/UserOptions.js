import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import "./header.css";
import { useSelector,useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { logout } from "../../../actions/userAction";

const UserOptions = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);


  const onOrders = () => {
    navigate("/orders");
  };

  const onProfile = () => {
    navigate("/account");
  };

  const handledashboard = () => {
    navigate("/admin/dashboard");
  };

  const onLogout = () => {
    // Implement your logout logic here
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate('/')
  };

  return (
    <div className="user-options">
      {user.role === "admin" && (
        <div className="item" onClick={handledashboard}>
          <span>
            <FaTachometerAlt />
          </span>
          <span>Dashboard</span>
        </div>
      )}
      <div className="item" onClick={onOrders}>
        <span>
          <FaClipboardList />
        </span>
        <span>Orders</span>
      </div>
      <div className="item" onClick={onProfile}>
        <FaUser />
        <span>Profile</span>
      </div>

      <div className="item" onClick={onLogout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default UserOptions;
