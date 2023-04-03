import GetBlogs from "../../models/Getblogs";
import connectDB from "../../middleware/mongoose";
import { v4 as uuidV4 } from "uuid";
const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new GetBlogs({
        userId: req.body[i].userId,
        title: req.body[i].title,
        slug: req.body[i].slug,
        description: req.body[i].description,
        img: req.body[i].img,
        category: req.body[i].category,
        blogs: [
          {
            blogId: uuidV4(),
            author: req.body[i].author,
          },
        ],
        email: req.body[i].email,
      });
      await p.save();
    }
    res.status(200).json({ success:"allBlogs" });
  }
   else {
    res.status(400).json({ error: "This is not allowed" });
  }
};

export default connectDB(handler);
