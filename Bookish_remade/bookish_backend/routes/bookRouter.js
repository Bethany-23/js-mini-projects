
import {Router} from "express";
import{toBeRead, read, reading, removeBook} from "../controllers/bookController.js";

const router = Router();
router.post("/",toBeRead);
router.put("/:id",reading);
router.put("/:id",read);
router.delete("/:id",removeBook);

export default router;