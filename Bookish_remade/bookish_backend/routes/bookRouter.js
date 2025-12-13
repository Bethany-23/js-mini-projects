import { Router } from "express";
import {
  createBook,
  updateBookStatus,
  deleteBook
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createBook);                 // add book
router.patch("/:id/status", protect, updateBookStatus); // update status
router.delete("/:id", protect, deleteBook);            // delete book

export default router;
