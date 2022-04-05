const { Schema, model, SchemaTypes } = require("mongoose");

const commentSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
});

module.exports = model("Comment", commentSchema);
