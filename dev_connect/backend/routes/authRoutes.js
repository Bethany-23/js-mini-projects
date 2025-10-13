const express = require("express");
const bcrypt = require(bcryptjs);
const jwt = require(jsonwebtoken);
const User = require("../models/User");

const router = express.Router();

//signup route

router.post("/signup", async(req,res)=>{
  try{
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({email, password: hashedPassword});
    await user.save();

    res.json({message: "User created successfully!"})
  }catch(err){
    res.status(400).json({error: "signup failed!"})
  }
});

//login route

router.post("/login", async(req, res)=>{
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error: "invalid email or password"});

    const isMatch = await bcrypt.compare(password, userpassword)

  }catch(err){
    res.status(400).json({error: "Login failed!"})
  }
});
module.exports= router;