const ErrorHandler = require('../util/errorhandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    if(err.name === "CastError")
    {
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // Mongoose duplicate key Error
    if(err.code === 11000){
        const message = ` Entered ${Object.keys(err.keyValue)} already exists `;
        err = new ErrorHandler(message,400);
    }

    // Wrong Jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid , Try again`;
        err = new ErrorHandler(message,400);
    }
    //  Jwt Expire error
    if(err.name === "JsonExpiredError"){
        const message = `Json Web Token is Expired , Try again`;
        err = new ErrorHandler(message,400);
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}


// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
  
//   if (!err.message || err.message === "Internal Server Error") {
//     // Set more specific default messages for common error scenarios
//     if (err.statusCode === 404) {
//       err.message = "Resource not found";
//     } else {
//       err.message = "Internal Server Error";
//     }
//   }
  
//   res.status(err.statusCode).json({
//     success: false,
//     error: err, // Send the error message instead of the entire error object
//   });
// };


// const ErrorHandler = require('../util/errorhandler');