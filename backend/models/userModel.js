const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
    
},{timestamps:true});

const userModel = mongoose.model("users",schema);
module.exports = userModel;