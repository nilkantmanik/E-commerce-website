const express = require('express')
const app = express();

const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require("./middleware/error")
app.use(cookieParser())
app.use(express.json())
app.use(cors())



// route imports
const productroute = require('./routes/productRoute');
const userroute = require('./routes/userRoute')
const orderroute = require('./routes/orderRoute');


// paths 
app.use('/api/v1',productroute);
app.use('/api/v1',userroute);
app.use('/api/v1',orderroute);


// middleware for error
app.use(errorMiddleware);

module.exports=app;