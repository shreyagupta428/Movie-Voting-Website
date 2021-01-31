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
   <div style={{maxWidth:"600px",margin:"2px auto"}}>
           <div style={{
              margin:"15px 0px",
               borderBottom:"1px solid white"
              
           }}>
 
         
           
               <div>
                   <h1 className="profilename">Hi, {state?state.name:"loading"}</h1>
                   <br></br>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h3 className="profilename">You Have Nominated {mymovies.length} Movies</h3>
                   </div>
 
              
           </div>
           </div>
           
   </div>
    <main className="profo" >
      {mymovies.map((movie) => {
        return(
           
            //<ProfileDisplay movie={movie}  />
         <section className="profile">
         <div class="card">
    <div class="card-image waves-effect waves-block waves-light" >
      <img class="activator"src={movie.image} />
    </div>
    
    <div class="card-content"  >
      <span class="card-title activator dark grey-text text-darken-4">{movie.title}<i class="material-icons right">more_vert</i></span>
       <a class="waves-effect waves-light btn" onClick={()=>remove(movie)}>Remove</a>
    </div>
    
    
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{movie.title}<i class="material-icons right">close</i></span>
      <p>{movie.overview}</p>
    </div>
  </div>
         </section>  
 
 
        )
      })}
    </main>
   </React.Fragment>
      
    
  );
};
 
export default Profile;