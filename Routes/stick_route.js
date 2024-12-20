import express from "express";
import { createStick, getAllSticks ,deletesticky,getAllSticksbyId} from "../Controllers/stick_controller.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", isAuthenticated, createStick);
router.post("/getAllSticksbyId", isAuthenticated, getAllSticksbyId);
router.get("/getAllSticks", getAllSticks);
router.delete("/deletesticky/:id",isAuthenticated, deletesticky);

export default router;
