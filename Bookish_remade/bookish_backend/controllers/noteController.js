

import Note from "../models/Note.js"

export const addNote = async(req, res) =>{
    try{
        const {title, content} = req.body;
        const note = new Note({title, createdBy: req.user.id, content});
        await note.save();
        res.json(note)
    }catch(err){
        res.status(400).json({error: "adding notes failed!"});
    }
};

export const readNote = async(req,res) =>{
    try{
        const note = await Note.find().populate("createdBy", "email role");
        res.json(note)
    }catch(err){
        res.status(400).json({error: "failed to load the notes"})
    }
}

export const updateNote = async(req, res)=>{
    try{
        const {id} = req.params;
        const {title, content} = req.body;
        const note = await Note.findByIdAndUpdate(
            id, 
            {title, content},
            {new: true}
        );
        res.json(note)
    }catch(err){
        res.status(400).json({error: "updating notes failed!"});
    }
};

export const removeNote = async(req, res) =>{
    try{
        const {id} = req.params;
        await Note.findByIdAndDelete(id)
        res.json({message: "note has been deleted"})
    }catch(err){
        res.status(400).json({error: "deleting the notes failed!"})
    }
};