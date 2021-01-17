const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const {JWT_SECRET_KEY}=require('../key')
let User=require('../models/user')
const requireLogin= require('../middleware/requireLogin')


// router.get('/home',requireLogin,(req,res)=>{
//     console.log("HII")
//     res.send("hello")
// })

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body 
    if(!email || !password || !name)
    return res.json({error:"Please add all the fields"})
    else
    {
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser)
            return res.json({error:"User already exits with that email"})
            else
            {
                bcrypt.hash(password,12)
                .then(hashedpassword=>{
                    const user=new User({
                        email:email,
                        password:hashedpassword,
                        name:name
                    })
                    user.save()
                    .then(user=>{
                        res.json({message:"saved successfully"})
                    })
                    .catch(err=>console.log(err))
                })
                
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({error:"Please provide email and password"})
    }
    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
            return res.json({error:"invalid email or password"})
            else{
                bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch===true)
                    {
                          // return res.json({error:"signed in successfully"})
                          const token=jwt.sign({_id:savedUser._id},JWT_SECRET_KEY)
                          const {_id,email,name}=savedUser
                          res.json({token,user:{_id,name,email}})
                    }
                    else
                    return res.json({error:"invalid email or password"})
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
})



module.exports=router