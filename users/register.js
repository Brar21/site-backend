const {User}=require('../models/User')
var CyrptoJS=require("crypto-js")
const express=require('express')
const {Otpmodel}=require('../models/otp')
const nodemailer=require('nodemailer')
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
userroute.post("/otp",async (req,res) =>
{
    const otp=Math.floor(100000+Math.random()*900000);
    const {email}=req.body;
  let user=await Otpmodel.findOne({email:email});

    try
    {
        if(user)
        {
            res.send('already there')
        } else
        {
            const config={
                service: 'gmail',
                auth: {
                    user: "sssaini67730@gmail.com",
                    pass: "mpldhbnmuqposgkd"
                }
            }
            let transporter=nodemailer.createTransport(config);
            var mailOptions={
                from: 'sssaini67730@gmail.com',
                to: email,
                subject: 'Your OTP for reset password',
                text: `Your OTP is ${otp}. It will expire in 5 minutes.`
            }
            let otpgen=new Otpmodel({email,otp: otp})
            await otpgen.save()
            transporter.sendMail(mailOptions,function (error,info)
            {
                if(error)
                {
                    res.send(error);
                } else
                {
                    res.send({Email: info.response});
                }
            });
        }
    }
    catch(err)
    {
        res.send(err)
    }
})
userroute.post("/verify",async(req,res)=>{
    const {email,otp}=req.body;
    try{
  let user=await Otpmodel.findOne({email:email});
  if(!user){
    res.send("account is not exits")
  }else{
  if(user.otp===otp){
    res.status(200).send("user verified")
  }else{
    res.status(400).send("wrong otp")
  }
  }
    }catch(err){
      res.status(400).send(err)
    }
  })
module.exports={userroute}
