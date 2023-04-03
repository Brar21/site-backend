const {connection}=require('../middleware/mongoose')
const {Blogs}=require('../models/Getblogs')
const express=require('express')

const blogroute=express.Router()

blogroute.get(`/`,async (req,res) =>
{
    try
    {
        let blog=await Blogs.find()
        res.status(200).send(blog)
        
    }catch (err) {
        console.log({ "err": err.message })
        res.status(404).send({ 'err': err.message })
    }
    //res.send('work')
})
blogroute.get(`/:id`,async (req,res) =>
{
    const query=req.body
    try
    {
        const id = req.params.slug;
        //let blo=await Blogs.findOne({'_id': id})
        let blog=await Blogs.find({ slug: context.query.slug })
        
        res.status(200).send(blog)
        
    }catch (err) {
        console.log({ "err": err.message })
        res.status(404).send({ 'err': err.message })
    }
    //res.send('work')
})
blogroute.patch('/update/:id',async (req,res) =>
{
    try {
        const id = req.params.id;
        const payload = req.body;
        const product = await Blogs.findOne({ "_id": id })

        await Blogs.findByIdAndUpdate({ _id: id }, payload)
        res.status(200).send('updated success !!!')
    }
    catch (err) {
        res.status(404).send({ 'err': err.message })
    }
})
blogroute.delete('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id
        const product = await Blogs.findOne({ "_id": id })

        await Blogs.findByIdAndDelete({ _id: id })
        res.status(200).send('delete sucess !!!')
    }
    catch (err) {
        res.status(400).send({ 'err': err.message })
    }
})

module.exports={blogroute}
//import GetBlogs from "../../models/Getblogs";
//import connectDB from "../../middleware/mongoose";
//import { v4 as uuidV4 } from "uuid";
//const handler = async (req, res) => {
//  if (req.method == "PATCH") {
//    for (let i = 0; i < req.body.length; i++) {
//      let p = await GetBlogs.findByIdAndUpdate(req.body[i]._id,req.body[i])
  
//    }
//    res.status(200).json({ success:"allBlogs update" });
//  }
//   else {
//    res.status(400).json({ error: "This is not allowed" });
//  }

//};

//export default connectDB(handler);
