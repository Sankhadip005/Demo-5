import express from "express";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";

const router = express.Router();


// SAVE PROGRESS
router.post("/", async (req, res) => {

  try {

    const { userId, courseId, lessonId } = req.body;

    let progress = await Progress.findOne({ userId, courseId });

    const course = await Course.findById(courseId);
    const totalLessons = course?.videos?.length || 1;

    if (!progress) {

      progress = new Progress({
        userId,
        courseId,
        completedLessons: [lessonId],
        progress: 0
      });

    } else {

      const alreadyCompleted = progress.completedLessons.some(
        (id) => id.toString() === lessonId
      );

      if (!alreadyCompleted) {
        progress.completedLessons.push(lessonId);
      }

    }

    progress.progress =
      (progress.completedLessons.length / totalLessons) * 100;

    await progress.save();

    res.json(progress);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Progress update failed" });

  }

});


// GET PROGRESS
router.get("/:userId/:courseId", async (req, res) => {

  try {

    const progress = await Progress.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId
    });

    res.json(progress || { progress: 0, completedLessons: [] });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to fetch progress" });

  }

});

export default router;