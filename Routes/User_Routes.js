import express from "express"
import {isAuthenticated} from "../Middleware/authMiddleware.js"
import {signup,login,LogOut} from "../Controllers/User_controllers.js"


const route=express.Router()

route.post("/signup",signup)
route.post("/login",login)
route.post("/logout",isAuthenticated, LogOut);


export default route