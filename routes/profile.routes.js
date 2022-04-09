const express = require("express");
const { json } = require("express/lib/response");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

const router = express.Router();

//route to see the user profile
router.get("/:id" , async (req,res)=> {

    const {id} = req.params

    const user = await User.findById(id)

    const products = await Product.find({user: req.jwtPayload.user._id})
    console.log(products)

    res.status(200).json(user)

})


module.exports = router;

/* //home route
router.get("/home", async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
});

//about route
router.get("/about", async (req, res) => {
    res.status(200).json();
}); */
