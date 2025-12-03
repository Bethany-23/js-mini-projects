

import Note from "../models/Notes"

exports.addNote = async(req, res) =>{
    try{
        const {title,content }= req.body;
        const note = new Note({title, createdBy:req.user.id, content})
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