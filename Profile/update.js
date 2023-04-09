const {User}=require('../models/User')
const express=require('express')
const jsonwebtoken=require("jsonwebtoken")
const profile=express.Router()
var CyrptoJS=require("crypto-js")


profile.post('/',async (req,res) =>
{
    try
    {
        let token=req.body.token
        let user=jsonwebtoken.verify(token,'jwttokens')
        let userDb=await User.findOneAndUpdate({email: user.email},{name: req.body.name,username: req.body.username,phone: req.body.phone,image: req.body.image})
        res.status(200).json({success: true})
    } catch(err)
    {
        res.status(400).json({Error: err.message})
    }

});
//profile.post('/image', async (req, res) => {
//    try {
//      const user = await User.findOne({ email: req.body.email });
//        //console.log(req.body.email)
//        console.log(user)
//  res.send('working')
//    //  if (!student) {
//    //    return res.status(404).json({ message: "Resource not found" });
//    //  }
//    //  const profile = req.files.image;
//    //  // Validate Image
//    //  const fileSize = profile.size / 1000;
//    //  const fileExt = profile.name.split(".")[1].toLowerCase();
//    //  if (fileSize > 500) {
//    //    return res
//    //      .status(400)
//    //      .json({ message: "file size must be lower than 500kb" });
//    //  }
  
//    //  if (!["jpg", "png"].includes(fileExt)) {
//    //    return res
//    //      .status(400)
//    //      .json({ message: "file extension must be jpg or png" });
//    //  }
  
//    //  const fileName = `${req.params.id}${path.extname(profile.name)}`;
  
//    //  cloudinary.uploader.upload(
//    //    profile.tempFilePath,
//    //    {
//    //      // use_filename: true,
//    //      // unique_filename: false,
//    //      folder: "students",
//    //      public_id: req.params.id,
//    //    },
//    //    async (err, image) => {
//    //      if (err) {
//    //        console.log(err);
//    //      }
//    //      console.log("File Uploaded");
//    //      await Student.findByIdAndUpdate(req.params.id, { profile: image.url });
//    //      fs.unlink(profile.tempFilePath, (err) => {
//    //        if (err) console.log(err);
//    //      });
//    //      res.status(200).json({
//    //        data: {
//    //          file: image.url,
//    //        },
//    //      });
//        //}
//    //  )
//    } catch (error) {
//      console.log(error);
//      res.status(500).json({ message: "Internal Server Error" });
//    }
//  });
module.exports={profile}