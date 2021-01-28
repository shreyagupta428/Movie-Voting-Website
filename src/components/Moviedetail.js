import React, { useEffect ,useState} from "react";
import axios from "axios"
import {API_KEY,API_URL,movieUrl} from "../constants/config"
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ModalVideo from 'react-modal-video'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-modal-video/scss/modal-video.scss";

const MovieDetail=({ match })=>{

  let params=match.params
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);


   const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: API_KEY,
                language: 'en_US'
            }
        });
        return data;
    } catch (error) { }
  }

 const fetchMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: API_KEY,
            }
        });
        return data['results'][0];
    } catch (error) { }
}

 const fetchCasts = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: API_KEY,
            }
        });
        const modifiedData = data['cast'].map((c) => ({
            id: c['cast_id'],
            character: c['character'],
            name: c['name'],
            img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
        }))

        return modifiedData;
        
    } catch (error) { }
 }

  useEffect(()=>{

    const fetchAPI = async () => {
        setDetail(await fetchMovieDetail(params.id));
        setVideo(await fetchMovieVideos(params.id));
        setCasts(await fetchCasts(params.id));
        //console.log(detail,video,casts)
      };
  
      fetchAPI();
  },[params.id])



  genres = detail.genres;
  

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

 return(
    <div className="container">
    <div className="row mt-2">
      
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={video.key} onClose={() => setIsOpen(false)} control />
      <div className="col text-center" style={{ width: "100%" }}>
        <img
          className="img-fluid"
          src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
          alt={detail.title}
        ></img>
        <div className="carousel-center">
          <i
            onClick={() => setIsOpen(true)}
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {detail.title}
        </div>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <ul className="list-inline">{genresList}</ul>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        
        <div className="mt-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
          {detail.overview}
        </div>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-md-3">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
        <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
      </div>
      <div className="col-md-3">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
        <p style={{ color: "#f4c10f" }}>{detail.runtime} mins</p>
      </div>
      <div className="col-md-3">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
        <p style={{ color: "#f4c10f" }}>{detail.budget} USD</p>
      </div>
      
    </div>

    <div className="row mt-3">
      <div className="col">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
      </div>
    </div>
    <div className="row mt-3">{castList}</div>

    {/* <div className="row mt-3">
      <div className="col">
        <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
          SIMILAR MOVIES
        </p>
      </div>
    </div> */}

    {/* <div className="row mt-3">{similarMovieList}</div> */}

    <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

    
    
    
  </div>
 )
}

export default MovieDetail