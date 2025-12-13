import { Router } from "express";
import {
  addNote,
  getNotes,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, addNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
