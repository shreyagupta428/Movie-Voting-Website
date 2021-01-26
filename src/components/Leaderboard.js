import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setMovies([1]);
    axios.get("http://localhost:5000/movie/leaderboard").then((res) => {
      var arr = res.data.movies;
      console.log(arr);
      arr.sort(function (a, b) {
        if (a.nominatedby.length > b.nominatedby.length) return -1;
        else return 1;
      });
      setMovies(arr);
    });
  }, []);

  return (
    <div>
      {movies.map((item) => {
        console.log(item);
        return <div>{item.title}</div>;
      })}
    </div>
  );
};

export default Leaderboard;
