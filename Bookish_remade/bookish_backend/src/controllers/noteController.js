

import Note from "../models/Notes"

exports.addNote = async(req, res) =>{
    try{
        const {title,content }= req.body;
        const note = new Note({title, createdBy:req.user.id, content});
        await note.save();
        res.json(note);
    }catch(err){
        res.status(400).json({error: "adding notes failed!"});
    }
};

exports.readNote = async(req,res) =>{
    try{
        const note = await Note.find().populate("createdBy", "email role")
    }catch(err){
        res.status(400).json({error: "failed to load the notes"})
    }
}

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