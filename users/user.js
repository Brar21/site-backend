const {User}=require('../models/User')
const express=require('express')
const jsonwebtoken =require("jsonwebtoken")

const Users=express.Router()
Users.post('/',async(req,res)=>
{
try
    {
        let token=req.body.token
        let user=jsonwebtoken.verify(token,'jwttokens')
        let userDb=await User.findOne({email: user.email})
        const {name,email,username,phone,image}=userDb
        res.status(200).json({name,email,username,phone,image})
    } catch(err)
    {
        res.status(400).json({Error:err.message})
    }

})

module.exports={Users}