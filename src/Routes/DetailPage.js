import axios from '../api/axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/DetailPage.css';
import useOnClickOutside from 'hooks/useOnClickOutside';

function DetailPage() {
  const [movie, setMovie] = useState({});
  let {movieId} = useParams();
  const [genres, setGenres] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [movieSelected, setMovieSelected]= useState([]);

  const ref = useRef();  
  useOnClickOutside(ref, () => {setShowDetail(false)});

  console.log('useParams()->',useParams())
  console.log('movieId->',movieId);
  console.log('movie',movie);
  useEffect(() => {
    fetchData();
  },[movieId])

  const fetchData = async() => {
    const request = await axios.get(`/movie/${movieId}`);
    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{params:{append_to_response: "videos"}});
    if(false){
      const imgRequest = await axios.get(`/movie/${movieId}/image`);
    }
    setMovie(movieDetail);
    setGenres(request.data.genres);
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
      <p className="modal__details">
            <span className='modal__user_perc'>100% for you</span> {"   "}
            {movie.release_date ? movie.release_date : movie.first_air_date }
        </p>
        <h1 className='detail__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <p className='detail__description'>
         {movie.tagline}
         <p className="modal_details">평점 : {movie.vote_average}</p>
        </p>

      </div>
        
      <div className='detail--fadeBottom'></div>
    </div>
        <div className='detail_list'>
          <div className='detail_poster' style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.belongs_to_collection?.backdrop_path || 'default_image_url'}")`}}>
          </div>
          <div className='detail_poster' style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path}")`}}>
          </div>
          <div className='detail_poster' style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`}}>
          </div>
          <div className='detail_poster' style={{
             backgroundImage:`url("https://image.tmdb.org/t/p/w500/${movie.belongs_to_collection?.poster_path || 'default_image_url'}")`}}>
          </div>
        </div>
        </>
                // {movie.belongs_to_collection.backdrop_path}
  )
}

export default DetailPage;