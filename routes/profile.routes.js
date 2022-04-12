const express = require("express");
const { json } = require("express/lib/response");
const User = require("../models/User.model");
const Product = require("../models/Product.model")

const router = express.Router();

//profile page
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    const product = await Product.find();
    res.status(200).json(user);
  });

//home route
router.get("/home", async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
});

module.exports = router;
