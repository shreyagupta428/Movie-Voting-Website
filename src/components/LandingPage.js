import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row, Button } from 'antd';
import {API_KEY,API_URL,IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE} from '../constants/config'
import {BrowserRouter,Route,Switch} from "react-router-dom"
import MainImage from './Sections/MainImage'
import GridCard from './Sections/GridCards'
import { MDBCol, MDBIcon } from "mdbreact";



const { Title } = Typography;

function LandingPage(props){

    const[movies,setMovies]=useState([]);
    const [search,setSearch]=useState("");
    const [MainMovieImage, setMainMovieImage] = useState(null);
 
  useEffect(()=>{
    const uri=`${API_URL}trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        // console.log('movies',...movies)
       // console.log('result',...data.results)
        // console.log('Data:', data)
        setMovies([...data.results])
        setMainMovieImage(MainMovieImage || data.results[0])
        //console.log(movies)
      })
      .catch(err=>console.log(err))
  
  },[])


  const handleChange=(e)=>{
    setSearch(e.target.value)
 
     const uri=`${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&page=1&query=${search}`
     fetch(uri)
       .then((response) => response.json())
       .then((data) => {
         // console.log('movies',...movies)
         console.log('result',...data.results)
         // console.log('Data:', data)
         setMovies([...data.results])
         setMainMovieImage(data.results[0] || MainMovieImage )
         //console.log(movies)
       })
       .catch(err=>console.log(err))
   }


        return(
            <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />

            }

          {/* search bar   */}
          <MDBCol md="6">
            <div style={{marginLeft:600,marginTop:10}}>
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span className="input-group-text purple lighten-3" id="basic-text1">
                <MDBIcon className="text-white" icon="search" />
              </span>
            </div>
            <input className="form-control my-0 py-1" type="text" size={100} placeholder="Search" aria-label="Search" value={search} onChange={handleChange} />
          </div>
         </div>
        </MDBCol>


       

            <div style={{ width: '20%', margin: '1rem auto' }}>
                <Title level={2} > Movies by latest </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
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
  
        )
    
}
 export default LandingPage;

