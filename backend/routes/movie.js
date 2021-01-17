const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin= require('../middleware/requireLogin')
let Movie=require('../models/movie')


router.post("/nominate",requireLogin,(req,res)=>{
    console.log(req.user)
    console.log(req.body)
    const {title,language,overview,movieId}=req.body
    console.log(title,language,overview,movieId)
    Movie.findOne({movieId:movieId})
    .then((savedMovie)=>{
        if(savedMovie)
        return res.json({error:"Movie is already in database"})
        else
        {
            
                const movie=new Movie({
                    title,
                    language,
                    overview,
                    movieId,
                    nominatedby:req.user._id
                })
                movie.save()
                .then(movie=>{
                    res.json({message:"saved successfully"})
                })
                .catch(err=>console.log(err))
            
            
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router