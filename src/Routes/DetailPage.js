import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/DetailPage.css';

function DetailPage() {
  const [movie, setMovie] = useState({});
  let {movieId} = useParams();
  console.log('useParams()->',useParams())
  console.log('movieId->',movieId);
  console.log('movie',movie);
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
    <>
    <div className='detail' style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition: "top center",backgroundSize: "cover"}}>
      <div className='detail__contents'>
        <h1 className='detail__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='detail__buttons'>
          <button className='detail__button play' /*onClick={()=> setIsClicked(true)}*/>
            play
          </button>
          <button className='detail__button info'>
            More Information
          </button>
        </div>
        <p className='detail__description'>
         {movie.tagline}
        </p>
      </div>

      <div className='detail--fadeBottom'></div>
    </div>
        <div className='detail_list'>
          <div className='detail_poster' style={{
             backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path || 'default_image_url'}")`}}>
          </div>
          <div className='detail_poster' style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path}")`}}>
          </div>
          <div className='detail_poster' style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`}}>
          </div>
          <div className='detail_poster' style={{
             backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path || 'default_image_url'}")`}}>
          </div>
        </div>
        </>
                // {movie.belongs_to_collection.backdrop_path}
  )
}

export default DetailPage;