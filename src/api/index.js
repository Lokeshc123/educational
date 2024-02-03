const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
mongoose
  .connect(
    "mongodb+srv://lokeshchauhan629:lokesh123@cluster0.pnzgnow.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const Teacher = require("./model/Teacher");
const Student = require("./model/Students");
app.post("/register-teacher", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const tc = await Teacher.findOne({ email: email });
  if (tc) {
    // Fix typo from 'st' to 'tc'
    return res.status(400).json({ message: "User Already Exists" });
  }
  try {
    const newTeacher = new Teacher({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedteacher = await newTeacher.save();
    res.status(200).json({
      message: "User Created Successfully",
      user: savedteacher,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Teacher Creation Failed", error: err });
  }
});

app.post("/register-student", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const st = await Student.findOne({ email: email });
  if (st) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newStudent = new Student({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedStudent = await newStudent.save();
    res.status(200).json({
      message: "User Created Successfully",
      user: savedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Student Creation Failed", error: err }); // Fix typo from 'Teacher' to 'Student'
  }
});

const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  // create token
  const token = jwt.sign(payload, "Q$%&*()!@#$%^&*()_+", { expiresIn: "1h" });
  return token;
};

// endpint for login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if the email and password are provided
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password Required" });
    return;
  }

  try {
    // Hash the entered email for comparison with the hashed email in the database

    // check for the student with the hashed email
    const student = await Student.findOne({ email: email });

    if (!student) {
      // check for the teacher with the hashed email
      const teacher = await Teacher.findOne({ email: email });

      if (!teacher) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }

      // compare the hashed password for teacher
      const passwordMatch = await bcrypt.compare(password, teacher.password);

      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

      // generate and send the token for teacher
      const token = createToken(teacher._id);
      res.status(200).json({
        message: "Login Successful",
        token: token,
        teacher: teacher,
      });
    } else {
      // compare the hashed password for student
      const passwordMatch = await bcrypt.compare(password, student.password);

      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

      // generate and send the token for student
      const token = createToken(student._id);
      res.status(200).json({
        message: "Login Successful",
        token: token,
        student: student,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login Failed", error: err });
  }
});

// endpoint to enroll in a course

// Enroll in a course endpoint

app.post("/enroll", async (req, res) => {
  const { courseId, courseTitle, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // Check if the user is already enrolled in the course
    const isEnrolled = user.enrolledCourses.some(
      (enrolledCourse) => enrolledCourse.courseId.toString() === courseId
    );

    if (isEnrolled) {
      res
        .status(400)
        .json({ message: "User is already enrolled in the course" });
      return;
    }

    // Update the enrolledCourses field of the user
    user.enrolledCourses.push({ courseId, courseTitle });
    await user.save();

    res.status(200).json({ message: "Enrollment Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Enrollment Failed", error: err });
  }
});
const Course = require("./model/Course");

app.post("/add-course", async (req, res) => {
  try {
    const { title, description, teacher, image, price, duration } = req.body;

    const newCourse = new Course({
      title,
      description,
      teacher,
      image,
      price,
      duration,
    });

    // Save the course to the database
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
