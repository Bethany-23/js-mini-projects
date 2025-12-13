
import {Progress} from "../models/Progress.js";

exports.addProgress= async(req,res)=>{
    try{
        const {status, pageNumber} = req.body;
        const progress = new Progress({status, book: req.book.id, pageNumber})
        await progress.save();
        res.json(progress);
    }catch(err){
        res.json({error: "progress not added!"})
    }
};

exports.updateProgress = async(req, res) =>{
    try{
        const {id} = req.params
        const {status,pageNumber} = req.body;
        const progress = await Progress.findByIdAndUpdate(
            id,
            {status,pageNumber},
            {new: true}
        );
        res.json(progress);
    }catch(err){
        res.json({error: "progress not updated!"})
    }
};

exports.deleteProgress = async(req, res) =>{
    try{
        const {id} = req.params;
        const progress = await Progress.findByIdAndDelete(id);
        res.json({message: "progress deleted successfully"})
    }catch(err){
        res.json({error: "progress couldn't get deleted!"})
    }
};


