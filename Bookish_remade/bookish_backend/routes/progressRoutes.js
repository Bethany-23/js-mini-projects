
import {Router} from "express";
import{addProgress, updateProgress, deleteProgress} from "../controllers/progressController.js";

const router = new Router();

router.post("/",addProgress);
router.put("/:id",updateProgress);
router.delete("/:id",deleteProgress);

export default router;

