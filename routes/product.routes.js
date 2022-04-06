const express = require("express");
const Product = require("../models/Product.model");

const router = express.Router();

//route to see all the products
router.get("/", async (req, res) => {
  const product = await Product.find();

  res.status(200).json(product);
});

//route to add one product
router.post("/add", async (req, res) => {
  const { category, name, image, description, price, city, country } = req.body;

  const user = req.jwtPayload.user._id;

  console.log(req.jwtPayload);

  const product = await Product.create({
    category,
    name,
    image,
    description,
    price,
    city,
    country,
    user,
  });

  res.status(200).json(product);
});

module.exports = router;
