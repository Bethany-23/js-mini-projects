
import Book from "../models/Book";


exports.toBeRead = async(req,res) =>{
    try{
        const {title, status} = req.body;
        const book = new Book({title, createdBy: req.user.id, status});
        await book.save();
        res.json(book);
    }catch(err){
        res.status(400).json({error: "book not added to this category!"})
    }
};

exports.read = async(req, res) =>{
    try{
        const {title, status} = req.body;
        const book = new Book({title, createdBy: req.user.id, status});
        await book.save();
        res.json(book);
    }catch(err){
        res.status(400).json({error: "book not added to this category"})
    }
};

exports.reading = async(req,res) =>{
    try{
        const {title, status} = req.body;
        const book = new Book({title, createdBy: req.user.id, status})
    }catch(err){
        res.status(400).json({error: "book not added to this category"});
    }
};

exports.removeBook = async(req,res) =>{
    try{
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        res.json({message: "removed successfully"})
    }catch(err){
        res.status(400).json({error: "book not deleted from this category"});
    }
};