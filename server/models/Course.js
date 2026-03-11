import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  instructor:{
    type:String,
    required:true
  },

  description:{
    type:String
  },

  price:{
    type:Number,
    required:true
  },

  rating:{
    type:Number,
    default:4.5
  },

  students:{
    type:Number,
    default:0
  },

  image:{
    type:String
  }

},{timestamps:true})

const Course = mongoose.model("Course",courseSchema)

export default Course