const express = require("express");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model")
const { authenticate } = require("../middlewares/jwt.middleware");

const router = express.Router();

//route to see all the products
router.get("/", async (req, res) => {
  const product = await Product.find();
  res.status(200).json({ product, message: "test" });
});

//route to add one product
router.post("/add", authenticate, async (req, res) => {
  const { category, name, image, description, price, city, country } = req.body;
  const user = req.jwtPayload.user._id;
  const userOfTheProduct = await User.findById(user);
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
  userOfTheProduct.products.push(product);
  await userOfTheProduct.save();
  res.status(200).json(product);
});

//route for individual product page
router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("comments").populate("user")
  const rentUserId = product.user; // set the ID of the person who is renting the product
  const rentUser = await User.findById(rentUserId); // set the Data of the person who is renting the product

  res.status(200).json({ product, rentUser });
});

//route to delete a product only if you are the owner
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product.user.toString() === req.jwtPayload.user._id) {
    const user = await User.findById(req.jwtPayload.user._id)
    const userProducts = user.products
    userProducts.remove(product.id) // remove the product from the user products array
    await user.save()
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted with sucess!");
  } else {
    res.status(401).json("You are not the owner of the product");
  }
});

//route to edit a product only if you are the owner
router.put("/edit/:id", authenticate, async (req, res) => {
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
    await product.save();
    res.status(200).json("Product edited with sucess!");
  } else {
    res.status(401).json("You are not the owner of the product");
  }
});

//route to rent a product
router.post("/rent/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); //find the product selected
  // the user can only rent a product that nor belong to them
  if (product.user.toString() !== req.jwtPayload.user._id) {
    const user = await User.findById(req.jwtPayload.user._id); // find the user that is logged in
    const price = product.price; // set the price of the product
    if (product.rented === false && user.money >= price) {
      product.rented = !product.rented; // changes the status of the product
      await product.save();
      const rentUserId = product.user; // set the ID of the person who is renting the product
      const rentUser = await User.findById(rentUserId); // set the Data of the person who is renting the product
      rentUser.money += price * 0.95; // new value for the money of the user who is renting the product
      await rentUser.save(); // saving the user who is renting the product
      user.rentedProducts.push(product); // add the product to the list of rented products who the user paid
      user.money -= price; // new value for the money of the user who paid the rent
      await user.save(); // saving the user who paid the rent
      res.status(200).json("Congratulations! You rented this product!");
    } else {
      res.status(500).json("This product isn't available");
    }
  } else {
    res.status(500).json("You can't rent your own products");
  }
});

//route to unrent a product
router.post("/unrent/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); //find the product selected
  const user = await User.findById(req.jwtPayload.user._id); //find the user
  const userRentedProducts = user.rentedProducts; //get the array of products that the user has rentered
  const foundIdProduct = userRentedProducts.includes(product.id);// check if the product id is inside of the array of the user's products rentered
  if (foundIdProduct) { //if yes
    product.rented = !product.rented //change the state of the product rented to False
    await product.save()
    userRentedProducts.remove(product.id) //and remove the product of the user's products rentered array
    await user.save()
    res.status(200).json(user)
  } else {
    res.status(504).json("You can't do this") 
  }
});

//route to post a comment for a product
router.post("/:id" , authenticate , async (req,res) => {

  const {id} = req.params 
  const product = await Product.findById(id); //find the product selected
  const user = await User.findById(req.jwtPayload.user._id); //find the user
  const { title, description} = req.body;
  const comment = await Comment.create({title, description, user:user , product:product , username: user.username})
  product.comments.push(comment)
  user.comments.push(comment)
  await product.save()
  await user.save()
  res.status(200).json(comment)
})

module.exports = router;
