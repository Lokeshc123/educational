const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null,
  },
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "https://www.gravatar.com/avatar/000?d=mp",
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    default: "0",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
