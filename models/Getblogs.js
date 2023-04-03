const mongoose = require("mongoose");
const GetBlogSchema = mongoose.Schema(
  {
    userId: { type: String, required: true  },
    title: { type: String, required: true, unique:true  },
    slug: { type: String, required: true, unique:true  },
    description: { type: String, required: true },
    img: { tyep: String },
    category: { type: String, required: true },
    blogs: [
      {
        blogId: { type: String },
        author: { type: String },
      },
    ],
    email: { type: String, required: true },
  },
  { timestamps: true }
);
const Blogs=mongoose.model("GetBlog",GetBlogSchema);
module.exports={Blogs}
