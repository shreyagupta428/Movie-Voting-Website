import React, { useEffect, useState, useContext } from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../../constants/config";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function GridCards(props) {
  let {
    image,
    movieId,
    movieName,
    movie_overview,
    movie_lang,
    mymovies,
    blacklistedMovies,
  } = props;
  const { state, dispatch } = useContext(UserContext);

  const [isNominated, setIsNominated] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const isAdmin = true;

  useEffect(() => {
    mymovies.forEach((item) => {
      if (item.movieId == movieId) setIsNominated(true);
    });
    blacklistedMovies.forEach((item) => {
      if (item.movieId == movieId) setIsBlacklisted(true);
    });
  }, [mymovies, blacklistedMovies]);

  const handleblacklist = () => {
    const movie = {
      title: movieName,
      language: movie_lang,
      overview: movie_overview,
      movieId: movieId,
      image: image,
    };
    axios
      .post("http://localhost:5000/movie/blacklist", movie, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
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
          setIsBlacklisted(true);
        }
      })
      .catch((err) => console.log(err));
  };

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
                setIsNominated(true);
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
          <Link to={`/movie/${movieId}`}>
            <img src={image} alt={movieName} />
          </Link>
          <span className='card-title'>{movieName}</span>
          {isBlacklisted ? (
            <a className='btn-floating halfway-fab waves-effect waves-light red'>
              <i className='material-icons'>block</i>
            </a>
          ) : isNominated ? (
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
          {isAdmin && !isBlacklisted && (
            <div className='card-action' style={{ float: `center` }}>
              <button className='btn red' onClick={handleblacklist}>
                Blacklist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GridCards;
