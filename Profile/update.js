const {User}=require('../models/User')
const express=require('express')
const jsonwebtoken=require("jsonwebtoken")
const profile=express.Router()
var CyrptoJS=require("crypto-js")

//profile.post('/changepassword',async (req,res) =>
//{
//    try
//    {
//        let token=req.body.token
//        let user=jsonwebtoken.verify(token,'jwttokens')
//        let acount=await User.findOne({email: user.email})
//        const bytes=CyrptoJS.AES.decrypt(acount.password,'brar123');
//        let decryptedPass=bytes.toString(CyrptoJS.enc.Utf8);
//        console.log(decryptedPass)
//        if(decryptedPass==req.body.password&&req.body.newpassword==req.body.confirmpassword)
//        {
//            let userDb=await User.findOneAndUpdate({email: user.email},{password: CyrptoJS.AES.encrypt(req.body.confirmpassword,'brar123').toString()})
//            res.status(200).json({success: true})
//            return
//        }
//        res.status(200).json({success: false})

//    } catch(err)
//    {
//        res.status(400).json({Error: err.message})
//    }

//});
profile.post('/',async (req,res) =>
{
    try
    {
        let token=req.body.token
        let user=jsonwebtoken.verify(token,'jwttokens')
        let userDb=await User.findOneAndUpdate({email: user.email},{name: req.body.name,username: req.body.username,phone: req.body.phone,image: req.body.image})
        res.status(200).json({success: true})
        //res.send('wroking')
    } catch(err)
    {
        res.status(400).json({Error: err.message})
    }

});
module.exports={profile}