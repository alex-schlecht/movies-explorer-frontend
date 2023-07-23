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
  const loc = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuPopupOpen, setIsMobileMenuPopupOpen] = useState(false);
  const [currentUser, setCurrentuser] = useState({});

  const allowedRoutesIfAuthorized = ["/movies", "/saved-movies", "/profile"];
  const allowedRoutesHeader = ["/", "/movies", "/saved-movies", "/profile"];
  const allowedRoutesFooter = ['/', '/movies', '/saved-movies'];

  const onClickOverlay = () => {
    setIsMobileMenuPopupOpen(!isMobileMenuPopupOpen);
  };

  const handleMobileMenuPopupOpen = () => {
    setIsMobileMenuPopupOpen(!isMobileMenuPopupOpen);
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={setLoggedIn} isMobileMenuPopupOpen={setIsMobileMenuPopupOpen}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/signin" element={<Login loggedIn={setLoggedIn}/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/movies" element={<Movies isLoading={isLoading}/>}/>
          <Route path="/saved-movies" element={<SavedMovies isLoading={isLoading}/>}/>
          <Route path="*" element={<Error code="404" description="Страница не найдена"/>}/>
        </Routes>
        <Footer/>
      </div>  
    </CurrentUser.Provider>
  );
};

export default App;
