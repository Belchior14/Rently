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

//route to delete a product only if you are the owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product.user.toString() === req.jwtPayload.user._id) {
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted with sucess!");
  } else {
    res.status(401).json("You are not the owner of the product");
  }
});

//route to edit a product only if you are the owner
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { category, name, image, description, price, city, country } = req.body;
  let product = await Product.findById(id);

  if (product.user.toString() === req.jwtPayload.user._id) {
    product.category = category;
    product.name = name;
    product.image = image;
    product.description = description;
    product.price = price;
    product.city = city;
    product.country = country;
    product = await product.save();
    res.status(200).json("Product edited with sucess!");
  } else {
    res.status(401).json("You are not the owner of the product");
  }
});

module.exports = router;
