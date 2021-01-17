const express=require('express')
const mongoose=require('mongoose')
const authrouter=require('./routes/auth')
const movierouter=require('./routes/movie')
const {ATLAS_URI}=require('./key')
const cors=require('cors')

const app=express();

const port=5000;
app.use(express.json())
app.use(cors());

const uri=ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb database connection established successfully")
})

app.use('/',authrouter)
app.use('/movie',movierouter)

app.listen(port,()=>{
    console.log("Server is running");
})