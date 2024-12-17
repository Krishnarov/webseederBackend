import express from "express";
import { createStick, getAllSticks ,deletesticky} from "../Controllers/stick_controller.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";
const router = express.Router();
router.post("/create", isAuthenticated, createStick);
router.get("/getAllSticks", getAllSticks);
router.delete("/deletesticky/:id",isAuthenticated, deletesticky);

export default router;
