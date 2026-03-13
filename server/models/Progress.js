import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completedLessons: [String],
  progress: Number
});

export default mongoose.model("Progress", progressSchema);