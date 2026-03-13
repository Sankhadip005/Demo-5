import express from "express";
import mongoose from "mongoose";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

const router = express.Router();


// =========================
// TEST ROUTE
// =========================
router.get("/test", (req, res) => {
  res.json({ message: "Enrollments API working" });
});


// =========================
// ENROLL IN COURSE
// =========================
router.post("/", async (req, res) => {
  try {

    const { userId, courseId } = req.body;

    console.log("Enrollment request:", req.body);

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }

    // Check existing enrollment
    const existing = await Enrollment.findOne({ userId, courseId });

    if (existing) {
      return res.json(existing);
    }

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Count lessons
    let totalVideos = 0;

    if (Array.isArray(course.sections)) {
      totalVideos = course.sections.reduce(
        (sum, section) => sum + (section.lessons?.length || 0),
        0
      );
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      completedVideos: 0,
      totalVideos
    });

    await enrollment.save();

    res.status(201).json(enrollment);

  } catch (err) {

    console.error("Enrollment error:", err);
    res.status(500).json({ message: "Enrollment failed" });

  }
});


// =========================
// UPDATE PROGRESS
// =========================
router.put("/progress", async (req, res) => {

  try {

    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled" });
    }

    if (enrollment.completedVideos < enrollment.totalVideos) {
      enrollment.completedVideos += 1;
    }

    await enrollment.save();

    res.json(enrollment);

  } catch (err) {

    console.error("Progress update error:", err);
    res.status(500).json({ message: "Progress update failed" });

  }

});


// =========================
// GET USER ENROLLMENTS
// =========================
router.get("/:userId", async (req, res) => {

  try {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const enrollments = await Enrollment
      .find({ userId })
      .populate({
        path: "courseId",
        select: "title image instructor duration level"
      });

    res.json(enrollments);

  } catch (error) {

    console.error("Fetch enrollments error:", error);
    res.status(500).json({ message: "Server error" });

  }

});

export default router;