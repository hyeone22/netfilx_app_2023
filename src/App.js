import DetailPage from "Routes/DetailPage";
import MainPage from "Routes/MainPage";
import SearchPage from "Routes/SearchPage";
import Footer from "components/Footer";
import Nav from "components/Nav";
import { Outlet, Route, Routes } from "react-router-dom";
import "styles/App.css";

const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  // layout 컴포넌트를 만들어줘 
  )  
}

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
            {/* 프로필페이지만들어여기 */}
          </Route>  
        </Routes>
      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Science Fiction Movie" id="SM" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction} />
      <Footer /> */}
    </div>
  );
}

export default App;
