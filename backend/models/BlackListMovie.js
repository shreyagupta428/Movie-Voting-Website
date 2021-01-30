const mongoose=require('mongoose')
const User=require('./user')
const BlackListMoviesSchema=new mongoose.Schema({
    movieId:{
        type:String,
        required:true
    },
    nominatedby:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        }  
   ]

},{timestamps:true })

const BlackListMovies=mongoose.model("BlackListMovies",BlackListMoviesSchema)
module.exports=BlackListMovies