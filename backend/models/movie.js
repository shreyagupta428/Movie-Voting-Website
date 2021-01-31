const mongoose=require('mongoose')
const User=require('./user')
const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
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

const Movie=mongoose.model("Movie",movieSchema)
module.exports=Movie