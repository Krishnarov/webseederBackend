import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Configs/DB.js"
import userRoute from "./Routes/User_Routes.js"
import cookieParser from "cookie-parser";
import Sticks from "./Models/sticky_models.js"


dotenv.config()


const app=express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use("/user",userRoute)
app.use("/sticky",Sticks)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});




