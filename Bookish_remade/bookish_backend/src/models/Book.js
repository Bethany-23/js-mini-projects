
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    title: {type:String, required: true},
    author:{type:String, required: true},
    genre: {type:String, required: true},
    status: {type:String,required: true, enum:["to be read", "reading", "completed"], default: "to be read"}
})