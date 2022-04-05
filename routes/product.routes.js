const express = require("express");
const Product = require("../models/Product.model")



const router = express.Router();

router.post("/add" , async (req,res)=> {

    const {category, name, image,description, price,city, country } = req.body


    const product = await Product.create({category, name, image,description, price,city, country})

    res.status(200).json(product)
})





module.exports = router;