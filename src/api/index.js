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
    res.status(500).json({ message: "Student Creation Failed", error: err });
  }
});

const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, "Q$%&*()!@#$%^&*()_+", { expiresIn: "1h" });
  return token;
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password Required" });
    return;
  }

  try {
    const student = await Student.findOne({ email: email });

    if (!student) {
      const teacher = await Teacher.findOne({ email: email });

      if (!teacher) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, teacher.password);

      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

      const token = createToken(teacher._id);
      res.status(200).json({
        message: "Login Successful",
        token: token,
        teacher: teacher,
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, student.password);

      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

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

const Course = require("./model/Course");

app.post("/teacher/:teacherId/course", async (req, res) => {
  const teacherId = req.params.teacherId;
  const { title, description, image, price, duration, rating } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: "Teacher Not Found" });
      return;
    }

    const newCourse = new Course({
      teacher: teacherId,
      title,
      description,
      image,
      price,
      duration,
      rating,
    });
    const savedCourse = await newCourse.save();
    teacher.providedCourses.push(savedCourse._id);
    await teacher.save();

    res
      .status(200)
      .json({ message: "Course Created Successfully", course: savedCourse });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Course Creation Failed", error: err.message });
  }
});
// endpoint to get all courses provided by a teacher
app.get("/teacher/:teacherId/courses", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const teacher = await Teacher.findById(teacherId).populate(
      "providedCourses"
    );
    if (!teacher) {
      res.status(404).json({ message: "Teacher Not Found" });
      return;
    }

    res.status(200).json({ courses: teacher.providedCourses });
  } catch (err) {
    res.status(500).json({ message: "Failed to get courses", error: err });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses: courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to get courses", error: err });
  }
});
// endpoint to get course details by courseId
app.get("/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course Not Found" });
      return;
    }

    res.status(200).json({ course: course });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get course details", error: err });
  }
});
// endpoint to enroll a student in a course
app.post("/enroll-course/:studentId/:courseId", async (req, res) => {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ message: "Student Not Found" });
      return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course Not Found" });
      return;
    }

    // Check if student is already enrolled in the course
    if (student.coursesEnrolled.includes(courseId)) {
      res
        .status(400)
        .json({ message: "Student is already enrolled in the course" });
      return;
    }

    student.coursesEnrolled.push(courseId);
    await student.save();

    res.status(200).json({ message: "Enrollment Successful" });
  } catch (err) {
    res.status(500).json({ message: "Enrollment Failed", error: err.message });
  }
});
// endpoint to get total students enrolled in a course by a teacher
app.get("/teacher/:teacherId/students", async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    const providedCourses = teacher.providedCourses;

    const studentsEnrolled = await Student.find({
      coursesEnrolled: { $in: providedCourses },
    });

    res.status(200).json({ studentsEnrolled });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
});
app.get("/student/:studentId/courses", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findById(studentId).populate(
      "coursesEnrolled"
    );
    if (!student) {
      res.status(404).json({ message: "Student Not Found" });
      return;
    }

    res.status(200).json({ courses: student.coursesEnrolled });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get enrolled courses", error: err });
  }
});
app.put("/update-image/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { image } = req.body;

  try {
    const teacher = await Teacher.findById(userId);
    if (teacher) {
      teacher.image = image;
      await teacher.save();
      res.status(200).json({ message: "Image updated successfully" });
      return;
    }

    const student = await Student.findById(userId);
    if (student) {
      student.image = image;
      await student.save();
      res.status(200).json({ message: "Image updated successfully" });
      return;
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update image", error: err });
  }
});

// endpoint to get information of a user by email
app.get("/user/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const teacher = await Teacher.findOne({ email: email });
    if (teacher) {
      res.status(200).json({ user: teacher });
      return;
    }

    const student = await Student.findOne({ email: email });
    if (student) {
      res.status(200).json({ user: student });
      return;
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user", error: err });
  }
});
const Content = require("./model/Content");
// endpoint to add content to a course
app.post("/course/:courseId/content", async (req, res) => {
  const courseId = req.params.courseId;
  const { thumbnail, title, videoLink } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course Not Found" });
      return;
    }

    const newContent = new Content({
      course: courseId,
      thumbnail,
      title,
      videoLink,
    });
    const savedContent = await newContent.save();
    course.content.push(savedContent._id);
    await course.save();

    res
      .status(200)
      .json({ message: "Content Added Successfully", content: savedContent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add content", error: err.message });
  }
});
