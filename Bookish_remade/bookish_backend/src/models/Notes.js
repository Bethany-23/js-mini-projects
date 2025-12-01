
import mongoose from "mongoose";

const noteShema = new mongoose.Schema({
    title: {type: String, required: true},
    id: {type: Number},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    createdFor: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true}

})

module.exports = mongoose.model("Note", noteShema);