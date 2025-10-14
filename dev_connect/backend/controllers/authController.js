
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//signup controller

const signup = async(req, res)=>{
  try{
    const {email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({email, passowrd: hashedPassword, role});

    await user.save();

    res.json({message: "User created successfully! "})

  }catch(err){
    res.status(400).json({error: "Signup failed! "});
  }
};

// login controller
const login = async(req, res) =>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error: "invalid email or password"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({error: "invalid email or password"});

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET || "secretkey", 
      {expiresIn: "1h"}
    );

    res.json({token, role: user.role});
  }catch(err){
    res.status(400).json({erro: "Login failed!"})
  }
};

module.exports = { signup, login };
