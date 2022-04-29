const { Schema, model, SchemaTypes } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  product:{
    type: SchemaTypes.ObjectId,
    ref: "Product",

  },
  username:{
    type:String
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
