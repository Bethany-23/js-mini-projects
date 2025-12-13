
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    genre: String,
    description: String,
    pages: Number,
    status: {
      type: String,
      enum: ["to be read", "reading", "completed"],
      default: "to be read"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);