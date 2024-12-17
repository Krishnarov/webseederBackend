import express from "express";
import { createStick,getAllSticks } from "../Controllers/stick_controller.js";

const router = express.Router();
router.post("/create", createStick);
router.get("/getAllSticks", getAllSticks);



export default router;
