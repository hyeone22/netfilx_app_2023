import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DetailPage() {
  const [movie, setMovie] = useState({});
  let {movieId} = useParams();
  console.log('useParams()->',useParams())
  console.log('movieId->',movieId);

  useEffect(() => {
    fetchData();
  },[movieId])

  const fetchData = async() => {
    const request = await axios.get(`/movie/${movieId}`);
    setMovie(request.data)
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
     }

  if (!movie) return <div>...Sorry not information this movie...</div>;  // 영화 정보가 없을때

  // if(){

  // }
  return (

    <header className='banner' style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition: "top center",backgroundSize: "cover"}}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button play' /*onClick={()=> setIsClicked(true)}*/>
            play
          </button>
          <button className='banner__button info'>
            More Information
          </button>
        </div>
        <p className='banner__description'>
         {truncate(movie.overview, 100)}
        </p>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
    // <section>
    //   <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
    //   alt={movie.title || movie.name || movie.original_name}/>
    //   <h2>{movie.original_title}</h2>
    //   <p>{movie.overview}</p>

    // </section>
  )
}

export default DetailPage;