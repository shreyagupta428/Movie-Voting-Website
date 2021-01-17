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
    // release_date:{
    //     type:String,
    //     required:true  
    // },
    // vote_avg:{
    //     type:Number,
    //     required:true  
    // },
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