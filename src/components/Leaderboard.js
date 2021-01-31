import React, { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardMovie from "./Sections/LeaderboardMovie";
import "../Leaderboard.css";

const Leaderboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/movie/leaderboard").then((res) => {
      var arr = res.data.movies;
      arr.sort(function (a, b) {
        if (a.nominatedby.length > b.nominatedby.length) return -1;
        else return 1;
      });
      setMovies(arr);
    });
  }, []);

  return (
    <main className='container'>
      <h1
        style={{
          fontFamily: `Grand Hotel, cursive`,
          color: `white`,
          textAlign: `center`,
        }}
      >
        Leaderboard <i class='fas fa-trophy'></i>
      </h1>
      {movies.map((item) => {
        return <LeaderboardMovie item={item} />;
      })}
    </main>
  );
};

export default Leaderboard;
