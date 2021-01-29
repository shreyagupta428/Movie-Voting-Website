import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState(false);
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
       //console.log("remove");

     axios.post("http://localhost:5000/movie/remove/nomination",movie,{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
   
  }

  return (
    <div>
      <div className='gallery'>
        {mymovies.map((item, ind) => {
          return (
            <div key={ind}>
              <h1>{item.title}</h1>
              <img
                key={item.movieId}
                className='item'
                src={item.image}
                alt={item.title}
              />
              <button onClick={()=>remove(item)}>Remove</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
