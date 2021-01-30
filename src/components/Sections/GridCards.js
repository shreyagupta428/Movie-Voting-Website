import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL } from "../../constants/config";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";

function GridCards(props) {
  let {
    actor,
    key,
    image,
    movieId,
    movieName,
    characterName,
    movie_overview,
    movie_lang,
  } = props;
  const POSTER_SIZE = "w154";
  


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
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  
  


  if (actor) {
    return (
      <Col key={key} lg={6} md={8} xs={200}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt={characterName}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
        <Link to={`/movie/${movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt={movieName}
              src={image}
            />
            {/* <p>{movieName}</p> */}
          </Link>
          {/* {isNominated?<button onClick={handleclickRomoveNominate}>Nominated</button>:<button onClick={handleclickNominate}>Nominate</button>} */}
          <button onClick={handleclickNominate}>Nominate</button>
          
        </div>
      </Col>
    );
  }
}

export default GridCards;
