import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";


exports.signup = (req, res) =>{
    try{
        const {email, password, role} = req.body
    }catch(err){
        res.status(400).json({error: `signup failed ${err.message}`})
    }
};

exports.login = (req, res) =>{
    try{
        const {username, password} = req.body
    }catch(err){
        res.status(400).json({error: `Login failed ${err.message}`})
    }
};