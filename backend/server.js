const app = require('./app')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);

    process.exit(1);
    
})


//config

dotenv.config({ path: "backend/Mydata/config.env" });

//connecting to DB
connectDatabase();

cloudinary. config( {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret :process.env.API_SECRET
})

const server =app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
})



// Unhandled Promise Rejection

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Proomise Rejection`);
    
    server.close(()=>{
        process.exit(1);
    })
})

