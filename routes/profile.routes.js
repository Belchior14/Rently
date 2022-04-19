const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

//profile page
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("products").populate("rentedProducts");
    
    res.status(200).json(user);
  });

  router.put("/:id", async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("products").populate("rentedProducts");
    user.money += 100;
    await user.save()
    res.status(200).json(user)
  })


module.exports = router;
