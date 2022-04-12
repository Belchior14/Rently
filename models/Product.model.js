const mongoose = require("mongoose");
const { Schema, model,SchemaTypes } = mongoose;

const productSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ["Technology", "Sports", "Home", "Leisure", "Others"],
  },

  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    max: 150,
  },
  price: {
    type: Number,
    required: true,
    min:1
  },
  city:{
    type: String,
    required: true,
  },
  country:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  comments: {
    type: [SchemaTypes.ObjectId],
    ref: 'Comment',
    default: [],
  },
  scheduledDates:{
    type:[String]
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
