import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../../constants/config";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";

function GridCards(props) {
  let {
    image,
    movieId,
    movieName,
    movie_overview,
    movie_lang,
    mymovies,
    setMyMovies,
  } = props;
  const [isNominated, setIsNominated] = useState(false);

  useEffect(() => {
    mymovies.forEach((item) => {
      if (item.movieId == movieId) setIsNominated(true);
    });
  }, [mymovies]);

  const handleclickNominate = () => {
    const movie = {
      title: movieName,
      language: movie_lang,
      overview: movie_overview,
      movieId: movieId,
      image: image,
    };

    axios
      .post("http://localhost:5000/movie/nominate/checkfor5", movie, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        if (res.data.error)
          M.toast({ html: res.data.error, classes: "#c62828 red darken-3" });
        else {
          axios
            .post("http://localhost:5000/movie/nominate", movie, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            })
            .then((res) => {
              //console.log(res)
              if (res.data.error) {
                M.toast({
                  html: res.data.error,
                  classes: "#c62828 red darken-3",
                });
              } else {
                M.toast({
                  html: res.data.message,
                  classes: "#43a047 green darken-1",
                });
                let newMymovies = mymovies;
                newMymovies.push(movie);
                setMyMovies(newMymovies);
                mymovies.forEach((item) => {
                  if (item.movieId == movieId) setIsNominated(true);
                });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='row'>
      <div className='card'>
        <div className='card-image'>
          <img src={image} alt={movieName} />
          <span className='card-title'>{movieName}</span>
          {isNominated ? (
            <a className='btn-floating halfway-fab waves-effect waves-light green'>
              <i className='material-icons'>done</i>
            </a>
          ) : (
            <a
              className='btn-floating halfway-fab waves-effect waves-light blue'
              onClick={handleclickNominate}
            >
              <i className='material-icons'>add</i>
            </a>
          )}
        </div>
        <div className='card-content' style={{ color: `#ffffff !important` }}>
          <p>
            {movie_overview.length > 150
              ? `${movie_overview.substring(0, 150)}...`
              : movie_overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GridCards;
