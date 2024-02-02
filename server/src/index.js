// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import express from "express";
const app = express();

dotenv.config({
    path: './env'
})


connectDB();












// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("error", (err)=>{
//             console.log("err: ", err);
//             throw err
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (err) {
//         console.log("error: ", err)
//         throw err;
//     }
// })()