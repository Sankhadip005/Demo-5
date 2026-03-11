import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import aiRoutes from "./routes/ai.js";   // ✅ ADD THIS

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect MongoDB */
connectDB();

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ai", aiRoutes);   // ✅ ADD THIS

/* Test Route (optional but helpful) */
app.get("/", (req, res) => {
  res.send("LearnHub API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});