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
import { useOpenPopup } from "../../hooks/useOpenPopup";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentuser] = useState({});
  const [headerType, setHeaderType] = useState('default');
  const {open, close, isOpen} = useOpenPopup();

  useEffect(() => {
    const width = window.innerWidth;
  
    if (width < 768) {
      setHeaderType('mobile');
    } else {
      if (location.pathname === '/') {
        setHeaderType('main');
      }
  
      if (loggedIn) {
        setHeaderType('authorized');
      } else {
        setHeaderType('non-authorized');
      }
    }
  }, [location, loggedIn]);

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        <Header headerType={headerType}/>
        {isOpen && (
          <MobileMenuPopup open={open} close={close}/>
        )}
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
