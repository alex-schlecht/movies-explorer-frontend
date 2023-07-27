import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CurrentUser } from "../../context/CurrentUser";
import Header from "../Header/Header";
import Main from "../Main/Main";
import MobileMenuPopup from "../MobileMenuPopup/MobileMenuPopup";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Error from "../Error/Error";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentuser] = useState({});
  const [headerHide, setHeaderHide] = useState(true);
  const [footerHide, setFooterHide] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allAuthRoutesHeader = ['/profile', '/movies', '/saved-movies'];
  const allRoutesHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const allRoutesFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {

    if (!allRoutesHeader.includes(location.pathname)) {
      setHeaderHide(true);
    } else {
      setHeaderHide(false);
    }
    if (!allRoutesFooter.includes(location.pathname)) {
      setFooterHide(true);
    } else {
      setFooterHide(false);
    }

    if (!allAuthRoutesHeader.includes(location.pathname)) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [location]);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onClickOverlay = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        {headerHide ? null : <Header loggedIn={loggedIn} clickOpenMenu={handleOpenMenu}/>}
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/movies" element={<Movies locPath={location.pathname} isLoading={isLoading}/>}/>
          <Route path="/saved-movies" element={<SavedMovies locPath={location.pathname}/>}/>
          <Route path="*" element={<Error code="404" description="Страница не найдена"/>}/>
        </Routes>
        {footerHide ? null : <Footer/>}
        {!loggedIn ? null : <MobileMenuPopup isOpen={isMenuOpen} onClose={handleOpenMenu} onClickOverlay={onClickOverlay}/>}
      </div>  
    </CurrentUser.Provider>
  );
};

export default App;
