import './App.css';
import { useEffect, useState } from 'react';
import {API_KEY,API_URL} from './constants/config'


function App() {
  const[movies,setMovies]=useState([]);
  const [search,setSearch]=useState("")
 
  useEffect(()=>{
    const uri=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        // console.log('movies',...movies)
        console.log('result',...data.results)
        // console.log('Data:', data)
        setMovies([...data.results])
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
        //console.log(movies)
      })
      .catch(err=>console.log(err))
  }
  return (
    <div className="App">
      <input type="text" name={search} value={search} onChange={handleChange}/>
      {movies.map((movie)=>{
        return(
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.release_date}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
