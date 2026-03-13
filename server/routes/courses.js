import express from "express";
import Course from "../models/Course.js";

const router = express.Router();


// GET ALL COURSES
router.get("/", async (req, res) => {
  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
});


// GET SINGLE COURSE BY ID
router.get("/:id", async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});


export default router;