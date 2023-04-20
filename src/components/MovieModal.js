import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react'
import "styles/MovieModal.css";
import styled from 'styled-components';
import axios from 'api/axios';

function MovieModal({setModalOpen,backdrop_path,overview,release_date,first_air_date,title,name,vote_average,movieId}) {
 
  const [isClicked, setIsClicked] = useState(false);
  const [movie, setMovie] = useState([]);

  const ref = useRef(); // id역할 dom을 직접적으로 조작하기 위해서 사용

  const [movieOpen, setMovieOpen] = useState(false); 

  useOnClickOutside(ref, () => {
    setModalOpen(false);
    setMovieOpen(false);
  });
  

  useEffect(() => {
    fetchData(movieId);
  },[movieId])

  const fetchData = async (id) => {
    const { data: movieDetail } = await axios.get(`/movie/${id}`, {
      params: { append_to_response: "videos" }
    });

    setMovie(movieDetail);
  };

  let trailerId = null;

  if (movie && movie.videos && movie.videos.results) {
    const trailer = movie.videos.results.find((video) => {
      return video.type === "Trailer" && video.site === "YouTube";
    });
  
    if (trailer) {
      trailerId = trailer.key;
    }
  }


if(!isClicked){
  console.log('modal is open');
  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span className="modal-close" onClick={() => {
            setModalOpen(false);
            setMovieOpen(false);
          }}>X</span>
          <img className="modal__poster-img" alt={title ? title : name}
           src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} onClick={()=> setIsClicked(true)}/>
          <div className="modal__content">
            <p className="modal__details">
              <span className='modal__user_perc'>100% for you</span> {"   "}
              {release_date ? release_date : first_air_date }
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__details">평점 : {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}else{
  console.log('trailer is open');
   return (
        <Container>
          <HomeContainer
           onClick={() => {
            setIsClicked(false);
            setMovieOpen(false);
            setModalOpen(false);
          }}>
            <Iframe
            src={`https://www.youtube.com/embed/${trailerId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${trailerId}`}
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
z-index: 1200;
position: absolute;
`;
const HomeContainer = styled.div`
position: fixed;
width:100%;
left: 0;
top: 50%;

display: flex;
justify-content: center;
background-color: rgba(0, 0, 0, 0.71);
`;
const Iframe = styled.iframe`
position: relative;
max-width: 800px;
background: #111;
overflow: hidden;
border-radius: 8px;
box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
  0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  }
`;
export default MovieModal