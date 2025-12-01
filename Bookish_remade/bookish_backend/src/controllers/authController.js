import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";


exports.signup = async(req, res) =>{
    try{
        const {email, password, role} = req.body;
        if (!email || !password || !role){
            return res.status(400).json({error: "Missing a required field!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashedPassword, role});
        await user.save();
        res.json({message: "User created successfully! "})
    }catch(err){
        res.status(400).json({error: `signup failed ${err.message}`})
    }
};

exports.login = async(req, res) =>{
    try{
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({error: "Invalid email or password!"})
        }
          const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ error: "Invalid email or password" });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
            const token = jwt.sign(
              { id: user._id, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            res.json({ token, role: user.role });
    }catch(err){
        res.status(400).json({error: `Login failed ${err.message}`})
    }
};