const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin= require('../middleware/requireLogin')
let Movie=require('../models/movie')
let BlackListMovies=require('../models/BlackListMovie')

//route to check if number of nominations made by user is greater than 5 or not
router.post("/nominate/checkfor5",requireLogin,(req,res)=>{
   var c=0,d=-1;
   Movie.find()
   .then(movies=>{
   
        movies.map((async movie=>{
            //console.log("movvvvv",movie.nominatedby)
            movie.nominatedby.map(async  x=>{
                if(JSON.stringify(x)===JSON.stringify(req.user._id))
                c++;
                if(c>4)
                d=0; 
            })
        }))  
        if(d==0)
        {
            return res.json({error:"You cannot nominate more than 5 movies"})   
        }
        else
        {
            return res.json({message:"You can make nomination"})    
        }
         
   })

})



//route to make nomination
router.post("/nominate",requireLogin,(req,res)=>{
    const {title,language,overview,movieId,image}=req.body
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

router.post('/remove',requireLogin, (req,res)=>{
   const {title,language,overview,movieId,image}=req.body
   Movie.findOne({movieId:movieId})
    .then(movies=>{
        let arr=movies.nominatedby;
      const index=arr.indexOf(req.user._id)
    
   arr.splice(index,1);
    movies.nominatedby=arr
              if(arr.length==0)
              {
                 movies.delete()
                 .then( result=> res.json({message:"Your Nomination is removed"})
                 )
                 .catch(err=>console.log(err))
              }
              else{
                movies.save()
                .then(movie=>{
                 res.json({message:"Your Nomination is removed"})
               })
               .catch(err=>console.log(err))
              }
})
})



//Route for blacklisting
router.post("/blacklist",requireLogin,(req,res)=>{
   const {movieId}=req.body;

   Movie.findOne({movieId},(err,savedMovie)=>{
       if(err)
       console.log(err)
      else{
        
        //if the movie admin wants to blacklist is not in database
        if(savedMovie==null)
        {
            const blacklistmovie=new BlackListMovies({
                movieId,
                nominatedby:[]
        
            })
            blacklistmovie.save()
            .then(result=> res.json({message:"Movie Blacklisted Successfully"}))
            .catch(err=>console.log(err))

        }
        else{

            const blacklistmovie=new BlackListMovies({
                movieId,
                nominatedby:savedMovie.nominatedby
        
            })
            blacklistmovie.save()
            .then(result=> res.json({message:"Movie Blacklisted Successfully"}))
            .catch(err=>console.log(err))
             
            //deleting the blacklisted movie from database
            savedMovie.delete()
            .then(result=>console.log("Movie deleted from database"))
            .catch(err=>console.log(err))
           
        }
        
      }
      
     
   })
   
   
})

//route to get list of all blacklisted movies
router.get("/blacklistedmovies",requireLogin,(req,res)=>{
  BlackListMovies.find()
  .then(movies=>res.json({movies}))
  .catch(err=>console.log(err))
})

module.exports=router

