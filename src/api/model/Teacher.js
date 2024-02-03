const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "teacher",
  },
  StudentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  providedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    default: "https://www.gravatar.com/avatar/000?d=mp",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
