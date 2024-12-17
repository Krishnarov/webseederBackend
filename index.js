import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./Configs/DB.js";
import authRoutes from "./Routes/User_Routes.js";
import cookieParser from "cookie-parser";
import StickNots from "./Routes/stick_route.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://webseederfrontendbykrishna.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/user", authRoutes);
app.use("/sticky", StickNots);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
