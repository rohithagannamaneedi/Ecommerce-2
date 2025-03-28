const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/",(res,req)=>{
    res.setEncoding("connected to e-commerce backend successfully");
})

mongoose.connect(MONGO_URL)
.then((check)=>{
    app.listen(PORT,()=>{
        console.log("connected to server");
    })
}).catch((err)=>{
    console.log(err);
})


