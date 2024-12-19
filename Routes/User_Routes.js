import express from "express"
import {isAuthenticated} from "../Middleware/authMiddleware.js"
import {signup,login,LogOut,logoutandlogin} from "../Controllers/User_controllers.js"


const route=express.Router()

route.post("/register",signup)
route.post("/login",login)
route.post("/logoutandlogin",logoutandlogin)
route.post("/logout",isAuthenticated, LogOut);


export default route