import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/SearchPage.css";
import useDebounce from 'hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]); //영화가 배열로 받아오는거
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  } 
  console.log('useLocation()->',useLocation())

  let query = useQuery(); // ?q=spiderman

  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500)
  // console.log('searchTerm->',searchTerm); // spiderman
  console.log('debounceSearchTerm->',debounceSearchTerm); // spiderman

  useEffect(() => {
    if(debounceSearchTerm) { 
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm]);

  const fetchSearchMovie = async(searchTerm) => {
    try {
      // https://api.themoviedb.org/3/search/movie?&query=
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      console.log('request->',request);
      setSearchResults(request.data.results)
    } catch (error) {
      console.log("error",error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
              <div className='movie' > {/* 키값이랑 들어가야함 */}
                <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImgUrl} alt={movie.title} className='movie__poster'  />
                  {/* 영화정보들어가는곳 */}
                </div>
              </div>
             )
          }
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return renderSearchResults();
}

export default SearchPage