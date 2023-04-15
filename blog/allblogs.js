const { connection } = require("../middleware/mongoose");
const { Blogs } = require("../models/Getblogs");
const express = require("express");
const { User } = require("../models/User");
const { BlogValidator } = require("../Validators/Blogvalidator");
const { Commentmodel } = require("../models/Comment");
const blogroute = express.Router();

blogroute.post("/blog", BlogValidator, async (req, res) => {
  try {
    const username = await User.findOne({ _id: req.body.userId });
    const blog = new Blogs({ ...req.body, name: username.name,image:username.image });

    await blog.save();
    res.status(200).json({ msg:"Blog Posted Successfully",success:true });
  } catch (err) {
    res.status(400).send({ msg:"Login First",success:false });
  }
});
blogroute.get(`/`, async (req, res) => {
  try {
    let blog = await Blogs.find();
    res.status(200).send(blog);
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});
blogroute.get(`/:slug`, async (req, res) => {
  try {
    const slug = req.params.slug;
    let blog = await Blogs.find({ slug: slug });
    res.status(200).send(blog);
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});
blogroute.delete("/blog/:id",async(req,res)=>{
const {userid}=req.headers;
console.log(req.headers.userid,req.ha)
    try{
   const user=await User.findOne({_id:userid}) 
   const blogs=await Blogs.findOne({userId:userid,_id:req.params.id})
   console.log(user,blogs)

    if(blogs){
    const blog=await Blogs.findByIdAndDelete({_id:req.params.id})

    res.status(200).json({success:true,msg:"blog is deleted by authorized user",blog})
   }   
else{
    res.status(400).json({success:false,msg:"unauthorized user"})
}
}catch(err){
res.status(400).send("you have to login first")
    }
})
blogroute.patch("/blog/:id",async(req,res)=>{
    const {userid}=req.headers;
    
    console.log(req.headers)
        try{
       const user=await User.findOne({_id:userid}) 
       const blogs=await Blogs.findOne({userId:userid,_id:req.params.id})
       console.log(user,blogs)
    
       if(user.admin){
        const blog=await Blogs.findByIdAndUpdate({_id:req.params.id},req.body)
    res.status(200).json({msg:" blog is updated by admin",blog})
       } 
       else if(blogs){
        const blog=await Blogs.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).json({msg:"Blog is updated by authorized user",blog})
       }   
    else{
        res.status(400).json({msg:"unauthorized user"})
    }
    }catch(err){
    res.status(400).send("you have to login first")
        }
    })
blogroute.post("/comment/:id", async (req, res) => {
  const { userid } = req.headers;
  try {
    let user = await User.findOne({ _id: userid });
    let x = new Commentmodel({
      ...req.body,
      blogId: req.params.id,
      image: user.image,
      name: user.name,
      userId: userid,
    });
    await x.save();
    res.status(200).json({ msg: "comment done" });
  } catch (err) {
    res.status(400).send("you have to login first");
  }
});
blogroute.delete("/comment/:id", async (req, res) => {
  const { userid } = req.headers;
  try {
    let dlt = await Commentmodel.findById({ _id: req.params.id });
    if (dlt.length != 0 && dlt.userId == userid) {
      await Commentmodel.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ mgs: "deleted" });
    } else {
      res.status(400).json({ mgs: "not deleted" });
    }
  } catch (err) {
    res.status(400).send("you have to login first");
  }
});
blogroute.get("/comment/:id", async (req, res) => {
  try {
    let comments = await Commentmodel.find({ blogId: req.params.id });
    res.status(200).json({ msg: "comment done", comments });
  } catch (err) {
    req.status(400).send("comment get have error");
  }
});
module.exports = { blogroute };
