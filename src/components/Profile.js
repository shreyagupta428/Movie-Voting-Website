import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios';



const Profile=()=>{
    const [mymovies,setMyMovies]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/movie/mypost',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>{
            setMyMovies(res.data.myPost)

            console.log(res.data.myPost)
        })
        .catch(err=>console.log(err))
    },[])
    return(
        <div>
            <div className="gallery">
               {
                   mymovies.map(item=>{
                       return(
                           <div>
                        <h1>{item.title}</h1> 
                        <img key={item.movieId} className="item" src={item.image} alt={item.title}/>
                        </div> 
                       )
                   })
               } 
           </div>
        </div>
    )
}



export default Profile