const {User}=require('../models/User')
var CyrptoJS=require("crypto-js");
const express=require('express')
var jwt=require("jsonwebtoken");
const getUser=express.Router()
require('dotenv').config()
getUser.post('/',async (req, res) => {
try
    {
    let user = await User.findOne({ "email": req.body.email });

    const bytes = CyrptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY )
    let decryptedPass = bytes.toString(CyrptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
          var token=jwt.sign({email: user.email,name: user.name,username: user.username},process.env.JWT_TOKEN_KEY,{
            expiresIn:'10d'
        });
        res.status(200).json({success: true,token,email:user.email,name:user.name});
      } else if (
        req.body.email == user.email &&
        req.body.password != decryptedPass
      ) {
        res.status(401).json({
          success: false,
          error: "Invalid Password or Check your Password address",
        });
      } else {
        res.status(400).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "No user Found" });
    }
  } catch(err) {
    res.status(400).json({ Error: err.message });
  }
});

module.exports={getUser}
