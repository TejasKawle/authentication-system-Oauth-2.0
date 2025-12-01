import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import "./src/config/passport.js"; 
import authRoute from "./src/routes/authRoute.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialize passport BEFORE routes
app.use(passport.initialize());

// Auth routes (includes Google OAuth routes)
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port :", PORT);
});
