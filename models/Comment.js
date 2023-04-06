const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema({
  name: String,
  comment: String,
  blogId: String,
},
{ timestamps: true });
const Commentmodel = mongoose.model("comment", CommentSchema);
module.exports = { Commentmodel };