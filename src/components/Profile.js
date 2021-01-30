import React, { useEffect, useState, useContext } from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";
import M from "materialize-css";
//import ProfileDisplay from './Sections/ProfileDisplay';
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import '../App.css';

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState(false);
  const {userid} = useParams()
  const history = useHistory();
  if (!state) history.push("/");
  else if (!search) setSearch(true);
  const [mymovies, setMyMovies] = useState([]);
  useEffect(() => {
    if (search) {
      axios
        .get("http://localhost:5000/movie/mypost", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          setMyMovies(res.data.myPost);
        })
        .catch((err) => console.log(err));
    }
  }, []);
     const remove=(movie)=>{
       const ID=movie.movieId;
       console.log("remove");
       let newmovie = mymovies.filter((movie) => movie.movieId !== ID);
    setMyMovies(newmovie);
     axios
      .post("http://localhost:5000/movie/remove", movie, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
    .then(res=>{
     
      M.toast({
                  html: res.data.message,
                  classes: "#43a047 green darken-1",
                });
    })
    .catch((err) => console.log(err));
     }
    

  return (
   <React.Fragment>
   <div style={{maxWidth:"800px",margin:"2px auto"}}>
           <div style={{
              margin:"15px 0px",
               borderBottom:"1px solid white"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <h2 id="profilename">{state?state.name:"loading"}</h2>
                   <h3 id="profilename">{state?state.email:"loading"}</h3>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h4 id="profilename">You Have Nomainated {mymovies.length} Movies</h4>
                   </div>

               </div>
           </div>
           </div>
           
   </div>
    <main>
      {mymovies.map((movie) => {
        return(
           
            //<ProfileDisplay movie={movie}  />
            <main className="auth-card ">
<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src={movie.image} />
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4" >{movie.title}<i class="material-icons right">more_vert</i></span>
       <a class="waves-effect waves-light btn" onClick={()=>remove(movie)}>Remove</a>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{movie.title}<i class="material-icons right">close</i></span>
      <p>{movie.overview}</p>
    </div>
  </div>
 </main>
        )
      })}
    </main>
   </React.Fragment>
      
    
  );
};

export default Profile;
// <div>
    //   <div className='gallery'>
    //     {mymovies.map((item) => {
    //       return (
    //         <div>
    //           <h1>{item.title}</h1>
    //           <img
    //             key={item.movieId}
    //             className='item'
    //             src={item.image}
    //             alt={item.title}
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>

    // 