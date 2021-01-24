const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin= require('../middleware/requireLogin')
let Movie=require('../models/movie')


router.post("/nominate",requireLogin,(req,res,next)=>{
    console.log(req.user)
    console.log(req.body)
    const {title,language,overview,movieId,image}=req.body
    console.log(title,language,overview,movieId,image)
    Movie.findOne({movieId:movieId})
    .then((savedMovie)=>{
        if(savedMovie)
        {
            
            let y=0
            savedMovie.nominatedby.map(x=>{
                
                    if(JSON.stringify(x)===JSON.stringify(req.user._id))
                    {
                        y=-1
                    }
                }
            )
            if(y===-1)
            {
                return res.json({error:"You have already nominated this movie"})
            }
            
            savedMovie.nominatedby=[...savedMovie.nominatedby,req.user._id]
            savedMovie.save()
            .then(movie=>{
                res.json({message:"Nomination made!"})
            })
            .catch(err=>console.log(err))    
        }
        else
        {
            
                const movie=new Movie({
                    title,
                    language,
                    overview,
                    movieId,
                    nominatedby:req.user._id,
                    image
                })
                movie.save()
                .then(movie=>{
                    res.json({message:"Nomination made!"})
                })
                .catch(err=>console.log(err))
            
            
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get("/mypost",requireLogin,(req,res)=>{
   
 Movie.find({nominatedby:req.user._id})
 .populate("nominatedby","_id name")
 .then(myPost=>{
     res.send({myPost})
 })
})

router.get("/leaderboard",(req,res)=>{
    Movie.find()
    .then(movies=>res.send({movies}))
})
module.exports=router