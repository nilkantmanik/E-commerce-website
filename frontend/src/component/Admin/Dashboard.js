import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from '../layout/Header/MetaData.js';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, ArcElement } from 'chart.js';

// Register scales and elements
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  console.log("products",products)
  console.log("orders",orders)
  console.log("users",users)




  // Ensure that products, orders, and users are defined before accessing their length
  const productCount = products ? products.length : 0;
  const orderCount = orders ? orders.length : 0;
  const userCount = users ? users.length : 0;




  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, productCount - outOfStock],
      },
    ],
  };

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'right', // Adjust the position as needed
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           return context.label + ': ' + context.parsed.y;
  //         },
  //       },
  //     },
  //   },
  // };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{productCount}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orderCount}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{userCount}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState}  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
