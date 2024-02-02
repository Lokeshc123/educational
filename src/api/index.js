const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

const User = require("./model/User");

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // create new user

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt the name, email, and role fields
    const encryptedName = await bcrypt.hash(name, 10);

    // Create new user with hashed password and encrypted fields
    const newUser = new User({
      name: encryptedName,
      email: email,
      password: hashedPassword,
      role: role,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(200).json({
      message: "User Created Successfully",
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User Creation Failed", error: err });
  }
});

// endpoint to login
const createToken = (userId) => {
  // set token payload
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

    // check for the user with the hashed email
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    // compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }

    // generate and send the token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "Login Successful", token: token, role: user.role });
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
