
import {Router} from "express";
import{addNote, readNote, updateNote, removeNote} from "../controllers/noteController.js";

const router = Router();

router.post("/", addNote);
router.get("/", readNote);
router.put("/:id", updateNote);
router.delete("/:id", removeNote);

export default router;