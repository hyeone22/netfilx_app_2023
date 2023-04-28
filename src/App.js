import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";
import Auth from './Routes/Auth';
import MainPage from "./Routes/MainPage";
import DetailPage from "./Routes/DetailPage";
import SearchPage from "./Routes/SearchPage";
import Nav from "components/Nav";
import Footer from "components/Footer";
import './styles/App.css'
import Profile from "Routes/Profile";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  if (!init) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </div>
  );
}

export default App;