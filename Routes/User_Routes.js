import express from "express";
import { isAuthenticated } from "../Middleware/authMiddleware.js";
import {
  signup,
  login,
  LogOut,
  logoutandlogin,
  update,
} from "../Controllers/User_controllers.js";
import upload from "../Middleware/Multer_middleware.js";

const route = express.Router();

route.post("/register", signup);
route.post("/login", login);
route.post("/logoutandlogin", logoutandlogin);
route.post("/logout", isAuthenticated, LogOut);
route.put("/update/:id", upload.single("photo"), isAuthenticated, update);

export default route;
