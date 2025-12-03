
import Book from "../models/Book";
import User from "../models/User";

exports.toBeRead = async(req,res) =>{
    try{

    }catch(err){
        res.status(400).json({error: "book not added to this category!"})
    }
};

exports.read = async(req, res) =>{
    try{

    }catch(err){
        res.status(400).json({error: "book not added to this category"})
    }
};

exports.reading = async(req,res) =>{
    try{

    }catch(err){
        res.status(400).json({error: "book not added to this category"});
    }
};

exports.removeBook = async(req,res) =>{
    try{

    }catch(err){
        res.status(400).json({error: "book not deleted from this category"});
    }
};