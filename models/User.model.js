const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  score: {
    type: String,
  },
  products: {
    type: String,
  },
  comments: {
    type: String,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  money: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
