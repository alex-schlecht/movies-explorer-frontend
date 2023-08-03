import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
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
import AppApi from "../../utils/AppApi";
import Tooltip from "../Tooltip/Tooltip";
import MoviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { SIGNUP_ERROR_TEXT, SIGNIN_ERROR_TEXT, PROFILE_ERROR_TEXT } from "../../constants/errorResponseText";
import { searchMovies } from "../../utils/searchMovies";
import { activeBookmarkMovieList } from "../../utils/activeBookmarkMovieList";
import { formatImageUrl } from "../../utils/formatImageUrl";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookmarkMovieList, setBookmarkMovieList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultBookmark, setSearchResultBookmark] = useState([]);
  const [isBookmarkSearchMovieList, setIsBookmarkSearchMovieList] = useState(false);
  const [isNewSearchAttempt, setIsNewSearchAttempt] = useState(false);
  const [profileEditButton, setProfileEditButton] = useState(false);
  const [tooltipResponseType, setTooltipResponseType] = useState('');
  const [tooltipResponseText, setTooltipResponseText] = useState('');
  const [tooltipPopupOpen, setTootipPopupOpen] = useState(false);

  const allRoutesHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const allRoutesFooter = ['/', '/movies', '/saved-movies'];

  useEffect(() => {
    AppApi.getUserInfo()
      .then((res) => {
        if(res && res.email) {
          handleAuth(res.email, res.name, res._id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignin = (email, password) => {
    setIsLoading(true);
    AppApi.signin(email, password)
      .then((res) => {
        handleAuth(res.email, res.name, res._id);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        setTooltipResponseType("error");
        if (SIGNIN_ERROR_TEXT.hasOwnProperty(err.status)) {
          setTooltipResponseText(SIGNIN_ERROR_TEXT[err.status]);
        } else {
          setTooltipResponseText(SIGNIN_ERROR_TEXT[500]);
        }
        setTootipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAuth = (email, name, _id) => {
    setLoggedIn(true);
    setCurrentUser({ email, name, _id });
    getMovies();
  };

  const handleProfileUpdate = (name, email) => {
    AppApi.profileUpdate(name, email)
      .then((res) => {
        setCurrentUser({ email: res.email, name: res.name, _id: res._id });
        setTooltipResponseType("success");
        setTooltipResponseText('Вы успешно обновили профиль!');
        setProfileEditButton(false);
        navigate(location.pathname, { replace: true });
      })
      .catch((err) => {
        setTooltipResponseType("error");
        if (PROFILE_ERROR_TEXT.hasOwnProperty(err.status)) {
          setTooltipResponseText(PROFILE_ERROR_TEXT[ err.status ]);
        } else {
          setTooltipResponseText(PROFILE_ERROR_TEXT[500]);
        }
      }).finally(() => setTootipPopupOpen(true));
  };

  const handleProfileEditButton = (state) => setProfileEditButton(state);

  const handleSignout = useCallback(() => {
    AppApi.signout()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        setSearchResult([]);
        setBookmarkMovieList([]);
        setSearchResultBookmark([]);
        setIsBookmarkSearchMovieList(false);
        localStorage.clear();
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  }, []);

  const getMovies = () => {

    let bookmarkMovieListLocal = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];
    const searchResultLocal = JSON.parse(localStorage.getItem("searchResult")) || [];
    setSearchResult(searchResultLocal);
    if (bookmarkMovieListLocal.length === 0) {
      AppApi.getBookmarks()
        .then((res) => {
          bookmarkMovieListLocal = res;
          localStorage.setItem("bookmarkMovieList", JSON.stringify(res));
          setBookmarkMovieList(res);
        })
          .catch(() => {
          setTooltipResponseType("error");
          setTooltipResponseText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
          setTootipPopupOpen(true);
        });
    } else {
      setBookmarkMovieList(bookmarkMovieListLocal);
    }

    const parseInputValue = JSON.parse(localStorage.getItem("inputValueBookmark")) || {};
    const checkboxValue = parseInputValue["shorts-checkbox__checkbox"] || false;
    const searchStringValue = parseInputValue["search-string__name"] || "";

    if (bookmarkMovieListLocal.length > 0) {
      const searchResultBookmarkMovieListLocal = JSON.parse(localStorage.getItem("searchResultBookmark")) || [];
      if (searchResultBookmarkMovieListLocal.length > 0 || (searchStringValue || checkboxValue > 0)) {
        setSearchResultBookmark(searchResultBookmarkMovieListLocal);
        setIsBookmarkSearchMovieList(true);
      };
    };
  };

  const handleSearchMovies = (stringValue, checkboxState) => {
    if (stringValue.length === 0) {
      return;
    }
    setIsLoading(true);
    setIsNewSearchAttempt(true);
    const localMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
    if (localMovieList.length === 0) {
      MoviesApi.getMovies()
        .then((res) => {
          const editedMovieList = activeBookmarkMovieList(res, bookmarkMovieList);
          localStorage.setItem('movieList', JSON.stringify(editedMovieList));
          const filteredResult = searchMovies(editedMovieList, stringValue, checkboxState);
          localStorage.setItem('searchResult', JSON.stringify(filteredResult));
          setSearchResult(filteredResult);
        })
        .catch((err) => {
          setTooltipResponseType("error");
          setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
          setTootipPopupOpen(true);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      const localStorageSearchResultMovieList = searchMovies(localMovieList, stringValue, checkboxState);
      localStorage.setItem('searchResult', JSON.stringify(localStorageSearchResultMovieList));
      setSearchResult(localStorageSearchResultMovieList);
      setIsLoading(false);
    };
  };

  const handleBookmarkSearch = (stringValue, checkboxState) => {
    setIsLoading(true);
    const bookmarkMovieListLocal = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];
    const searchResultLocal = searchMovies(bookmarkMovieListLocal, stringValue, checkboxState);
    localStorage.setItem("searchResultBookmark", JSON.stringify(searchResultLocal));
    setSearchResultBookmark(searchResultLocal);

    if (stringValue.length === 0 && !checkboxState) {
      setIsBookmarkSearchMovieList(false);
    } else {
      setIsBookmarkSearchMovieList(true);
    };
    setIsLoading(false);
  };

  const handleResetBookmarkSearchForm = () => {
    localStorage.removeItem('inputValueBookmark');
    localStorage.removeItem('searchResultBookmark');
    setIsBookmarkSearchMovieList(false);
  };

  const handleBookmarkCreate = useCallback((movie) => {
    const bookmarkMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: formatImageUrl(movie.image.url),
      trailer: movie.trailerLink,
      thumbnail: formatImageUrl(movie.image.formats.thumbnail.url),
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    };
    
    AppApi.addBookmark(bookmarkMovie)
    .then((res) => {
      const movieListLocal = JSON.parse(localStorage.getItem("movieList")) || [];
      const searchResultLocal = JSON.parse(localStorage.getItem("searchResult")) || [];
      const bookmarkMovieListLocal = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];

      const connectedBookmarkMovieList = [...bookmarkMovieListLocal, res];
      localStorage.setItem('bookmarkMovieList', JSON.stringify(connectedBookmarkMovieList));
      setBookmarkMovieList(connectedBookmarkMovieList);

      const activeBookmark = activeBookmarkMovieList(searchResultLocal, connectedBookmarkMovieList);
      localStorage.setItem('searchResult', JSON.stringify(activeBookmark));
      setSearchResult(activeBookmark);

      const searchResultMovieList = activeBookmarkMovieList(movieListLocal, connectedBookmarkMovieList);
      localStorage.setItem('movieList', JSON.stringify(searchResultMovieList));

      setSearchResult(searchResultMovieList);
      if (isBookmarkSearchMovieList) {
        const parseInputValue = JSON.parse(localStorage.getItem("inputValueBookmark")) || {};
        const searchStringValue = parseInputValue[ "search-string__name" ] || "";
        const checkboxValue = parseInputValue[ "shorts-checkbox__checkbox" ] || false;
        const localStorageSearchResultBookmarkMovie = searchMovies([res], searchStringValue, checkboxValue);
        if (localStorageSearchResultBookmarkMovie.length > 0) {
          const searchResultBookmarkMovieListLocal = JSON.parse(localStorage.getItem('searchResultBookmark')) || [];
          const connectedBookmarkMovieList = [...searchResultBookmarkMovieListLocal, res];
          localStorage.setItem("searchResultBookmark", JSON.stringify(connectedBookmarkMovieList));
          setSearchResultBookmark(connectedBookmarkMovieList);
        }
      };
    })
    .catch((err) => {
      console.log(err);
      setTooltipResponseType("error");
      setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
      setTootipPopupOpen(true);
    });
  }, [bookmarkMovieList, searchResult]);

  const handleBookmarkDelete = useCallback((movie) => {
    const MovId = movie.id || movie.movieId;
    AppApi.deleteBookmark(movie._id)
      .then(() => {
        const movieListLocal = JSON.parse(localStorage.getItem("movieList")) || [];
        const bookmarkMovieListLocal = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];
        const searchResultMovieListLocal = JSON.parse(localStorage.getItem("searchResult")) || [];
        
        const connectedBookmarkMovieList = bookmarkMovieListLocal.filter((movie) => {
          return movie.movieId !== MovId;
        });

        setBookmarkMovieList(connectedBookmarkMovieList);
        localStorage.setItem("bookmarkMovieList", JSON.stringify(connectedBookmarkMovieList));
        const filteredBookmarkMovieList = activeBookmarkMovieList(movieListLocal, connectedBookmarkMovieList);
        localStorage.setItem("movieList", JSON.stringify(filteredBookmarkMovieList));
        const searchResultBookmarkMovieList = activeBookmarkMovieList(searchResultMovieListLocal, connectedBookmarkMovieList);
        localStorage.setItem("searchResult", JSON.stringify(searchResultBookmarkMovieList));
        setSearchResult(searchResultBookmarkMovieList);
        const searchResultBookmarkMovieListLocal = JSON.parse(localStorage.getItem("searchResultBookmark")) || [];
        if (searchResultBookmarkMovieListLocal) {
          const filteredSearchResultBookmark = searchResultBookmarkMovieListLocal.filter((movie) => {
            return movie.movieId !== MovId;
          });
          setSearchResultBookmark(filteredSearchResultBookmark);
          localStorage.setItem("searchResultBookmark", JSON.stringify(filteredSearchResultBookmark));
        };
      })
      .catch((err) => {
        setTooltipResponseType("error");
        setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
        setTootipPopupOpen(true);
      });
  }, [bookmarkMovieList, searchResult]);

  const handleSignup = (email, password, name) => {
    setIsLoading(true);
    AppApi.signup(email, password, name)
      .then((res) => {
        handleSignin(email, password);
        setTooltipResponseType("success");
        setTooltipResponseText('Успешная регистрация!')
      })
      .catch((err) => {
        setTooltipResponseType("error");
        if (SIGNUP_ERROR_TEXT.hasOwnProperty(err.status)) {
          setTooltipResponseText(SIGNUP_ERROR_TEXT[err.status]);
        } else {
          setTooltipResponseText(SIGNUP_ERROR_TEXT[500]);
        }
      })
      .finally(() => {
        setTootipPopupOpen(true);
        setIsLoading(false);
      });
  };

  function closeAllPopups() {
    setIsMenuOpen(false);
    setTootipPopupOpen(false);
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        {!allRoutesHeader.includes(location.pathname) ? null : <Header loggedIn={loggedIn} clickOpenMenu={handleOpenMenu}/>}
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route 
            path="/movies" 
            element={<ProtectedRoute
              path="/movies"
              element={Movies}
              isLoading={isLoading}
              loggedIn={loggedIn}
              isNewSearchAttempt={isNewSearchAttempt}
              onIsNewSearchAttempt={setIsNewSearchAttempt}
              onSearchMovies={handleSearchMovies}
              isMovieList={searchResult}
              onAddBookmark={handleBookmarkCreate}
              onDeleteBookmark={handleBookmarkDelete}
            />}
          />
          <Route 
            path="/saved-movies" 
            element={<ProtectedRoute
              path="/saved-movies"
              element={SavedMovies}
              isLoading={isLoading}
              loggedIn={loggedIn}
              onSearchMovies={handleBookmarkSearch}
              onDeleteBookmark={handleBookmarkDelete}
              onResetBookmarkSearchForm={handleResetBookmarkSearchForm}
              isMovieList={isBookmarkSearchMovieList ? searchResultBookmark : bookmarkMovieList}
              isBookmarkSearchMovieList={isBookmarkSearchMovieList}
            />}
          />
          <Route 
            path="/signup" 
            element={!loggedIn ? 
              <Register isLoading={isLoading} loggedIn={loggedIn} onSignup={handleSignup}/> 
              : 
              <Navigate to="/"/>}
          />
          <Route 
            path="/signin" 
            element={!loggedIn ? 
              <Login isLoading={isLoading} loggedIn={loggedIn} onSignin={handleSignin}/> 
              :
              <Navigate to="/movies"/>}
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute
              path="/profile"
              element={Profile}
              isLoading={isLoading}
              loggedIn={loggedIn}
              onSignOut={handleSignout}
              onProfileEditButton={handleProfileEditButton}
              onProfileUpdate={handleProfileUpdate}
              isProfileEditButton={profileEditButton}
            />}
          />
          <Route path="*" element={<Error code="404" description="Страница не найдена" loggedIn={loggedIn}/>}/>
        </Routes>
        {!allRoutesFooter.includes(location.pathname) ? null : <Footer/>}
        {!loggedIn ? null : <MobileMenuPopup isOpen={isMenuOpen} onClose={closeAllPopups} onClickOverlay={closeAllPopups}/>}
        <Tooltip
          isOpen={tooltipPopupOpen}
          onClose={closeAllPopups}
          onClickOverlay={closeAllPopups}
          responseType={tooltipResponseType}
          responseText={tooltipResponseText}
        />
      </div>  
    </CurrentUser.Provider>
  );
};

export default App;
