import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  completedVideos: {
    type: Number,
    default: 0
  },

  totalVideos: {
    type: Number,
    default: 10
  }

});

export default mongoose.model("Enrollment", enrollmentSchema);