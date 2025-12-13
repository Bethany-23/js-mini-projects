import { Router } from "express";
import {
  createBook,
  updateBookStatus,
  deleteBook
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createBook);
router.patch("/:id/status", protect, updateBookStatus);
router.delete("/:id", protect, deleteBook);

export default router;
