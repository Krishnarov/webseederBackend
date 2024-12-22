import express from "express";
import { createStick, getAllSticks ,deletesticky,getAllSticksbyId,TaskDone} from "../Controllers/stick_controller.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", isAuthenticated, createStick);
router.post("/getAllSticksbyId", isAuthenticated, getAllSticksbyId);
router.get("/getAllSticks", getAllSticks);
router.delete("/deletesticky/:id",isAuthenticated, deletesticky);
router.put("/taskdone/:id",isAuthenticated, TaskDone);

export default router;
