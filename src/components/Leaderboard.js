import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Leaderboard = ()=>{
    const [movies,setMovies]=useState([])
//     useEffect(async ()=>{
//         const data = await axios.get("http://localhost:5000/movie/leaderboard")
//   console.log(data)
//   setMovies(data.data.movies)
//     //   console.log(movies) 
//          setMovies(movies.sort(function(a,b){
            
//             if(a.nominatedby.length>b.nominatedby.length)
//             return -1;
//             else
//             return 1;
             
//          }))
//     },[])
useEffect(()=>{
    setMovies([1])
    console.log("hh")
    axios.get("http://localhost:5000/movie/leaderboard")
    .then(res=>{
        var arr=res.data.movies
        console.log(arr)
        arr.sort(function(a,b){
            if(a.nominatedby.length>b.nominatedby.length)
            return -1;
            else
            return 1;
        })
        setMovies(arr)
    })
},[])
    // useEffect(()=>{
    //     axios.get("http://localhost:5000/movie/leaderboard")
    //     .then(result=>{
    //       //  console.log(typeof(res.data.movies))
    //    //const obj=res.parse()
    //    setMovies(result.data.movies)
    //    // console.log(typeof(res.data.movies))
    //     console.log(movies)
        
    //      movies.sort(function(a,b){
            
    //         if(a.nominatedby.length>b.nominatedby.length)
    //         return -1;
    //         else
    //         return 1;
             
    //      })
         
    //      setMovies(movies)
    //      console.log(movies)
    // })
    // .catch((err)=>console.log(err))
    // },[])
   // console.log(movies)
    return(
        <div>
            {
               
                   movies.map(item=>{
                       return(
                           <div >
                        {item.title} 
                        </div> 
                       )
                   })
            }
        </div>
    )
}


export default Leaderboard