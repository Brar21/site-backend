const mongoose = require("mongoose");
const GetBlogSchema = mongoose.Schema(
  {
    userId: { type: String },
    title: { type: String, required: true, unique:true },
    slug: { type: String, required: true, unique:true  },
    description: { type: String, required: true },
    category: { type: String, required: true },
   image:{type:String},
  },
  { timestamps: true }
);
const Blogs=mongoose.model("GetBlog",GetBlogSchema);
module.exports={Blogs}
