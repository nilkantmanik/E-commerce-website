const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//config

dotenv.config({ path: "backend/config/config.env" });


const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// route imports
const productroute = require("./routes/productRoute");
const userroute = require("./routes/userRoute");
const orderroute = require("./routes/orderRoute");
const paymentroute = require("./routes/paymentRoute");

// paths
app.use("/api/v1", productroute);
app.use("/api/v1", userroute);
app.use("/api/v1", orderroute);
app.use("/api/v1", paymentroute);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
