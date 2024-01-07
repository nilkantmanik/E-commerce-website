import React,{useEffect, useState , useMemo} from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import CheckoutSteps from "./CheckoutSteps";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import { useSelector,useDispatch } from "react-redux";

const OrderSuccess = () => {

  
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [done,setdone]=useState(true);
  const dispatch=useDispatch();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const order = useMemo(
    () => ({
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.itemsPrice,
      taxPrice: orderInfo.taxPrice,
      shippingPrice: orderInfo.shippingPrice,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: {
        id: "sample PaymentInfo",
        status: "succceeded",
      },
    }),
    [shippingInfo, cartItems, orderInfo]
  );
  

  useEffect(() => {
    if (done) {
      dispatch(createOrder(order));
      setdone(false);
    }
  }, [dispatch, order, done]);
  
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
