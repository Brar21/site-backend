const express=require('express')
const {connection}=require("./middleware/mongoose")
const {blogroute}=require('./blog/allblogs')
const {userroute}=require('./users/register')
const {getUser}=require('./users/login')
const {Users}=require('./users/user')
const {profile}=require('./Profile/update')
const {password}=require('./Profile/password')
const {contact}=require('./Profile/contactApi')
const cors=require('cors')
//require("dotenv").config()

let app=express()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.get("/",(req,res) =>
{
    res.send('welcome to javascriptfolks')
})
app.use('/blogs',blogroute)
app.use('/user',userroute)
app.use('/login',getUser)
app.use('/User',Users)
app.use('/info',profile)
app.use('/password',password)
app.use('/contact',contact)
app.listen(8080,async () =>
{
    try
    {
        await connection
        console.log('MongoDB is connected')
    } catch(err)
    {
        console.log({"Error":err.message})
    }
    console.log(`Server run on Port: 8080`)
})