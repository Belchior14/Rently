const express = require("express");
const { json } = require("express/lib/response");
const User = require("../models/User.model");

const router = express.Router();

//route to see the user profile
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("products");
  res.status(200).json(user);
});

module.exports = router;
