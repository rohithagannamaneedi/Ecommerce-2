const express = require("express");

const userRouter = express.Router();

const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs")

userRouter.post('/signup',async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).send({msg:"All fields are required"});
        }
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        const user = await new userModel({name,email,password:hash});
        await user.save();
        return res.status(201).send({msg:"User created successfully"});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong"});
    }
});

userRouter.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({msg:"All fields are required"});
        }
        const checkUser = await userModel.findOne({email});
        if(!checkUser){
            return res.status(400).send({msg:"Please signup first"});
        }
        console.log(checkUser.password,password)
        const realUser = await bcrypt.compare(password, checkUser.password);
        if(!realUser){
            return res.status(400).send({msg:"Please enter correct password"});
        }
       
        return res.status(200).send({msg:"Successfully logged in"});
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Something went wrong",error});
    }
})


module.exports = userRouter;