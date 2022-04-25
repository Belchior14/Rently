const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();

//route to create an user
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  if (
    email === "" ||
    password === "" ||
    firstName === "" ||
    lastName === "" ||
    username === ""
  ) {
    res.status(400).json({
      message: "Provide email, password, first and last name, and the username",
    });
    return;
  } else {
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
    const userFound = await User.findOne({ email, username });
    if (!userFound) {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstName,
          lastName,
          email,
          username,
          password: passwordHash,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({
          message:
            "Email/username already exists",
        });
      }
    } else {
      res.status(400).json({ message: "Email/username already exists" });
    }
  }
});

//route to log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (passwordCorrect) {
        const payload = {
          user,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({ message: "Email or password are incorrect" });
      }
    } else {
      res.status(401).json({ message: "Email or password are incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//route to see all the users

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

module.exports = router;
