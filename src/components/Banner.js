import React, { useEffect, useState } from 'react'
import axios from 'api/axios';
import requests from 'api/requests';
import'styles/Banner.css';
import styled from 'styled-components';
import MovieModal from './MovieModal';


function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [movieSelected, setMovieSelected]= useState([]);

  useEffect(() => {
    fetchData();
  },[])
  const fetchData = async () => {
  //현재 상영중인 영화 정보를 가져오기(20개 영화)
  const request = await axios.get(requests.fetchNowPlaying);
  console.log('request->',request);
  //20개 영화 중 영화 하나의 ID를 랜덤하게 가져오기
  const movieId = request.data.results[
    Math.floor(Math.random() * request.data.results.length + 0) //0~19
  ].id;
  console.log('moviedId->',movieId);
 //특정 영화의 더 상세한 정보를 가져오기(vidieo 비디오 정보도 포함)
 const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{
    params : {append_to_response: "videos"}
  });
  console.log('results->', movieDetail);
  setMovie(movieDetail);
  }
  const truncate = (str, n) => {
 return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const showDet = (movie) => {
    setShowDetail(true);
    setMovieSelected(movie);
  }


  
if(!isClicked){
  return (
    <header className='banner' style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition: "top center",backgroundSize: "cover"}}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button play' onClick={()=> setIsClicked(true)}>
            play
          </button>
          <button className='banner__button info' onClick={()=>showDet(true)}>
            More Information
          </button>
        </div>      
        <p className='banner__description'>
         {truncate(movie.overview, 100)}
        </p>
        {showDetail && (
            <div className="presentation">
            <div className="wrapper-modal">
              <div className="modal" >
                <span className="modal-close" >X</span>
                <img className="modal__poster-img" alt={movie.title ? movie.title : movie.name}
                 src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
                <div className="modal__content">
                  <p className="modal__details">
                    <span className='modal__user_perc'>100% for you</span> {"   "}
                    {movie.release_date ? movie.release_date : movie.first_air_date }
                  </p>
                  <h2 className="modal__title">{movie.title ? movie.title : movie.name}</h2>
                  <p className="modal__details">평점 : {movie.vote_average}</p>
                  <p className="modal__overview">{movie.overview}</p>
                </div>
              </div>
            </div>
          </div> 
         
        )}
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  )
    }else{
      return (
        <Container>
          <HomeContainer>
            <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        
      )
   
    }
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after{
    content: "";
    position: absoulte;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default Banner