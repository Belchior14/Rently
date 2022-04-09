const express = require("express");
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/guard");

const router = express.Router();

//profile page
router.get("/profile", isLoggedIn, (req, res) => {
    res.render("user/profile");
  });

//home route
router.get("/home", async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
});

//about route
router.get("/about", async (req, res) => {
    res.status(200).json();
});

module.exports = router;