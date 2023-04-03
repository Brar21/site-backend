const {User}=require('../models/User')
var CyrptoJS=require("crypto-js")
const express=require('express')

const userroute=express.Router()
 userroute.post('/register',async (req, res) => {
    try
    {
      const {name,email,username,phone,image}=req.body
      let u=new User({name,email,username,password:CyrptoJS.AES.encrypt(req.body.password,'brar123').toString()},phone,image)
      await u.save()
      res.status(200).json({ success:"signup done" });
    }
   catch(err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports={userroute}
