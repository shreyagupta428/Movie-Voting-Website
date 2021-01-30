import React, { useEffect, useState } from "react";
import { Typography, Row } from "antd";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../constants/config";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCards";
import { MDBCol, MDBIcon } from "mdbreact";
import axios from "axios"

const { Title } = Typography;

function LandingPage(props) {
  
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [mymovies,setMyMovies]=useState([])
  const [blacklistedMovies,setBlacklistedmovies]=useState([]);

  useEffect(()=>{
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
      
    axios.get("http://localhost:5000/movie/blacklistedmovies",{
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }
    })
    .then(res=>{
      console.log(res.data.movies)
      setBlacklistedmovies(res.data.movies)
    })
   
  },[])
  useEffect(() => {
    let uri;
    if (search.length === 0)
      uri = `${API_URL}trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`;
    else
      uri = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&page=1&query=${search}`;

    axios.get(uri)
      .then((res) => {
        console.log(res.data)
        setMovies([...res.data.results]);
        setMainMovieImage(res.data.results[0] || MainMovieImage);
      })
      .catch((err) => console.log(err));
  }, [search]);
 
  
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      {/* search bar   */}
      <MDBCol md='6'>
            <input
              className='form-control my-0 py-1'
              type='text'
              size={100}
              placeholder='Search'
              aria-label='Search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
      </MDBCol>

      <div style={{ width: "20%", margin: "1rem auto" }}>
        <Title level={2}> Movies by latest </Title>
        <hr />
        <Row gutter={[16, 16]}>
          {movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
                movie_overview={movie.overview}
                movie_lang={movie.original_language}
                movie_releasedate={movies.release_date}
              />
            </React.Fragment>
          ))}
        </Row>
        <br />
      </div>
    </div>
  );
}
export default LandingPage;
