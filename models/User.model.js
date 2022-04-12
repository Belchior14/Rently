const mongoose = require("mongoose");
const { Schema,model,SchemaTypes } = mongoose;

const userSchema = new Schema({
  firstName: {
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
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    min:4
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: 0,
  },
  products: {
    type: [SchemaTypes.ObjectId],
    default:[],
    ref:"Product",
  },
  rentedProducts:{
    type: [SchemaTypes.ObjectId],
    default:[],
    ref:"Product"
  },
  comments: {
    type: [SchemaTypes.ObjectId],
    ref: 'Comment',
    default: [],
  },
  image: {
    type: String,
    default:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png',
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  money: {
    type: Number,
    default: 0,
  },
});

const User = model("User", userSchema);

module.exports = User;
