const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

//profile page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("products")
    .populate("rentedProducts");

  res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("products")
    .populate("rentedProducts");
  user.money += 100;
  await user.save();
  res.status(200).json(user);
});

router.put("/id", async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  const user = await User.findById(id);
  console.log(image)
  if (user_id === req.jwtPayload.user._id) {
    user.image = image;
    await user.save();
    res.status(200).json("User edited with sucess!");
  } else {
    res.status(401).json("You are not the user");
  }
});

module.exports = router;
