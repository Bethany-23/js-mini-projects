import { Router } from "express";
import { addProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, addProgress);

export default router;
