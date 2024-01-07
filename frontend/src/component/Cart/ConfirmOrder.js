import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";

// import {
//   // CardNumberElement,
//   // CardCvcElement,
//   // CardExpiryElement,
//   useStripe,
//   // useElements,
// } from "@stripe/react-stripe-js";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();
  const alert = useAlert();
  // const navigate = useNavigate();

  const [stripeApiKey, setstripeApiKey] = useState("");
  // const stripe = useStripe();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  // const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); // 3
  // const { shippingInfo, cartItems } = useSelector((state) => state.cart);   // 1

  const proceedToPayment = async (e) => {
    e.preventDefault();

    // const data = {
    //   subtotal,
    //   shippingCharges,
    //   tax,
    //   totalPrice,
    // };

    const data = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      totalPrice: totalPrice,
    };
    console.log(data);

    // Uncomment the line below and replace "ENTER YOUR PUBLISHABLE KEY" with your actual publishable key
    try {
      const stripe = await loadStripe(stripeApiKey);
      // console.log(stripeApiKey);
      const body = {
        products: cartItems,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      //http://localhost:4000
      const response = await axios.post(
        "http://localhost:4000/api/v1/create-checkout-session",
        body,
        { headers }
      );
      console.log(response.data);
      // dispatch(createOrder(order));

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }

      data.paymentInfo = {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status,
      };

      console.log("data updated");

      sessionStorage.setItem("orderInfo", JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        if (data.stripeApiKey) {
          setstripeApiKey(data.stripeApiKey);
        } else {
          console.error("Stripe API key is missing or empty.");
        }
      } catch (error) {
        console.error("Error fetching Stripe API key:", error.message);
      }
    }

    getStripeApiKey();
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
