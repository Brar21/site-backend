const {connection}=require('../middleware/mongoose')
const {Blogs}=require('../models/Getblogs')
const express=require('express')
const {User}=require('../models/User')
const {BlogValidator}=require('../Validators/Blogvalidator')
const {Commentmodel}=require('../models/Comment')
const blogroute=express.Router()

blogroute.post("/blog",BlogValidator,async(req,res)=>{
        try{
    const blog=new Blogs(req.body)
    await blog.save()
    res.status(200).json({msg:res.message})
        }catch(err){
    res.status(400).send({Error:err.message})
        }
    })
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
})
blogroute.get(`/:slug`,async (req,res) =>
{
    try {
        const slug = req.params.slug;
        let blog = await Blogs.find({slug:slug});
    
        res.status(200).send(blog);
      } catch (err) {
        console.log({ err: err.message });
        res.status(404).send({ err: err.message });
      }
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
blogroute.post("/comment/:id",async(req,res)=>{

   const {userid}= req.headers
    try
    {
        let user=await User.findOne({_id: userid})
        let x=new Commentmodel({...req.body,blogId:req.params.id,image:user.image,name:user.name,userId:userid})
        await x.save()
        res.status(200).json({msg:"comment done"})
    }catch(err){
        res.status(400).send("you have to login first") 
    }
})
blogroute.delete("/comment/:id",async(req,res)=>{

    const {userid}= req.headers
     try
     {
         let dlt=await Commentmodel.findById({_id: req.params.id})     
         if(dlt.length!=0 && dlt.userId==userid)
         {
             await Commentmodel.findByIdAndDelete({_id:req.params.id})
             res.status(200).json({mgs:"deleted"})
         } else
         {
            res.status(400).json({mgs:"not deleted"})
             
         }
     }catch(err){
         res.status(400).send("you have to login first") 
     }
 })
blogroute.get("/comment/:id",async(req,res)=>{
    try{
let comments=await Commentmodel.find({blogId:req.params.id})
res.status(200).json({msg:"comment done",comments})

    }
    catch(err){
      req.status(400).send("comment get have error")  
    }
})
module.exports={blogroute}
