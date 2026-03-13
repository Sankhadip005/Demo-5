import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import aiRoutes from "./routes/ai.js";
import progressRoutes from "./routes/progress.js";
import enrollmentRoutes from "./routes/enrollments.js";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Database */
connectDB();

/* Test route (VERY useful for debugging) */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/enrollments", enrollmentRoutes);

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});