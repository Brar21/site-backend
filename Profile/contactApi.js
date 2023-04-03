const fs=require('fs')
const {Contactform}=require('../models/contact')
const express=require('express')
const contact=express.Router()  
contact.post('/',async(req,res)=>
{
   try
    {
        const {name,email,phone,message}=req.body
       let u=new Contactform({name,email,phone,message})
        await u.save()
        res.status(200).json({ success:"form done done" });
    }
    catch(err)
    {
        res.status(200).json({Error:err.message})
    }
})
module.exports={contact}