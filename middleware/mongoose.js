const mongoose=require("mongoose")

const connection=mongoose.connect('mongodb+srv://varinder:varinderbrar@cluster0.jy11wkr.mongodb.net/test?retryWrites=true&w=majority')
module.exports={connection}
//mongosh "mongodb+srv://cluster0.jy11wkr.mongodb.net/" --apiVersion 1 --username varinder