
import mongoose from "mongoose";

const progressSchema= new mongoose.Schema({
user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    currentPage: {
      type: Number,
      default: 0
    },
    totalPages: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["unread", "reading", "completed"],
      default: "unread"
    },
    percentage: {
      type: Number,
      default: 0
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Progress",progressSchema);