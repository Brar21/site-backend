const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
  {
    name: String,
    comment: String,
    blogId: String,
    image: String,
    userId: String,
  },
  { timestamps: true }
);
const Commentmodel = mongoose.model("comment", CommentSchema);
module.exports = { Commentmodel };
