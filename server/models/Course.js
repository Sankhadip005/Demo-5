import mongoose from "mongoose";

// Define Lesson Schema separately for cleaner nesting
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String }, // e.g., "5 min"
  video: { type: String, required: true } // Matches your "video" key in JSON
});

// Define Section Schema
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String
  },
  overview: {
    type: String
  },
  objectives: [String], // Simplified array of strings
  stack: [String],      // Simplified array of strings
  duration: {
    type: String        // e.g., "12 hours"
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
    default: "Beginner"
  },
  price: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  sections: [sectionSchema] // Nested array of sections
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;