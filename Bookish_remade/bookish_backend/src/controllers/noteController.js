
import User from "../models/User";
import Book from "../models/Book";

exports.addNote = async(req, res) =>{
    try{
        const {title, createdFor, createdBy}= req.body;
    
    }catch(err){
        res.status(400).json({error: "adding notes failed!"});
    }
};

exports.updateNote = async(req, res)=>{
    try{

    }catch(err){
        res.status(400).json({error: "updating notes failed!"});
    }
};

exports.removeNote = async(req, res) =>{
    try{

    }catch(err){
        res.status(400).json({error: "deleting the notes failed!"})
    }
};