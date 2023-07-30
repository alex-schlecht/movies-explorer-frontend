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

  const [tooltipResponseType, setTooltipResponseType] = useState('');
  const [tooltipResponseText, setTooltipResponseText] = useState('');
  const [tooltipPopupOpen, setTootipPopupOpen] = useState(false);

  const [searchResultMovieList, setSearchResultMovieList] = useState([]);
  const [bookmarkMovieList, setBookmarkMovieList] = useState([]);
  const [searchResultBookmarkMovieList, setSearchResultBookmarkMovieList] = useState([]);
  const [isBookmarkSearchMovieList, setIsBookmarkSearchMovieList] = useState(false);

  const [profileEditButton, setProfileEditButton] = useState(false);
  const [isNewSearchAttempt, setIsNewSearchAttempt] = useState(false);

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

  const handleProfileEditButton = (state) => setProfileEditButton(state);

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

  const handleSignout = useCallback(() => {
    AppApi.signout()
      .then((res) => {
        setLoggedIn(false);
        setCurrentUser({});
        setSearchResultMovieList([]);
        setBookmarkMovieList([]);
        setSearchResultBookmarkMovieList([]);
        setIsBookmarkSearchMovieList(false);
        localStorage.clear();
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  }, []);

  const getMovies = () => {
    let localStorageBookmarkMovieList = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];
    const localStorageSearchResultMovieList = JSON.parse(localStorage.getItem("searchResultMovieList")) || [];
    setSearchResultMovieList(localStorageSearchResultMovieList);
    const parseInputValue = JSON.parse(localStorage.getItem("bookmarkInputValue")) || {};
    const checkboxValue = parseInputValue["shorts-checkbox__checkbox"] || false;
    const searchStringValue = parseInputValue["search-string__name"] || "";

    if (localStorageBookmarkMovieList.length === 0) {
      AppApi.getBookmarks()
        .then((res) => {
          localStorageBookmarkMovieList = res;
          localStorage.setItem("bookmarkMovieList", JSON.stringify(res));
          setBookmarkMovieList(res);
        })
          .catch(() => {
          setTooltipResponseType("error");
          setTooltipResponseText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
          setTootipPopupOpen(true);
        });
    } else {
      setBookmarkMovieList(localStorageBookmarkMovieList);
    };

    if (localStorageBookmarkMovieList.length > 0) {
      const localStorageSearchResultBookmarkList = JSON.parse(localStorage.getItem("searchResultBookmarkMovieList")) || [];
      if (localStorageSearchResultBookmarkList.length > 0 || (searchStringValue || checkboxValue > 0)) {
        setSearchResultBookmarkMovieList(localStorageSearchResultBookmarkList);
        setIsBookmarkSearchMovieList(true);
      };
    };
  };

  const handleBookmarkSearch = (stringValue, checkboxState) => {
    setIsLoading(true);
    const localStorageBookmarkMovieList = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];
    const localStorageSearchResultBookmarkList = searchMovies(localStorageBookmarkMovieList, stringValue, checkboxState);
    localStorage.setItem("searchResultBookmarkMovieList", JSON.stringify(localStorageSearchResultBookmarkList));
    setSearchResultBookmarkMovieList(localStorageSearchResultBookmarkList);
    if (stringValue.length === 0 && !checkboxState) {
      setIsBookmarkSearchMovieList(false);
    } else {
      setIsBookmarkSearchMovieList(true);
    }
    setIsLoading(false);
  };

  const handleResetBookmarkSearchForm = () => {
    localStorage.removeItem('bookmarkInputValue');
    localStorage.removeItem('searchResultBookmarkMovieList');
    setIsBookmarkSearchMovieList(false);
  };

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
      const localStorageMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
      const localStorageSearchResultMovieList = JSON.parse(localStorage.getItem("searchResultMovieList")) || [];
      const localStorageBookmarkMovieList = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];

      const localStorageConnectedBookmarkMoviesList = [...localStorageBookmarkMovieList, res];
      localStorage.setItem('bookmarkMovieList', JSON.stringify(localStorageConnectedBookmarkMoviesList));
      setBookmarkMovieList(localStorageConnectedBookmarkMoviesList);

      const localStorageResultBookmarkMovieList = activeBookmarkMovieList(localStorageSearchResultMovieList, localStorageConnectedBookmarkMoviesList);
      localStorage.setItem('searchResultMovieList', JSON.stringify(localStorageResultBookmarkMovieList));
      setSearchResultMovieList(localStorageResultBookmarkMovieList);

      const localStorageActiveBookmarkMovieList = activeBookmarkMovieList(localStorageMovieList, localStorageConnectedBookmarkMoviesList);
      localStorage.setItem('movieList', JSON.stringify(localStorageActiveBookmarkMovieList));
      if (isBookmarkSearchMovieList) {
        const parseInputValue = JSON.parse(localStorage.getItem("bookmarkInputValue")) || {};
        const searchStringValue = parseInputValue[ "search-string__name" ] || "";
        const checkboxValue = parseInputValue[ "shorts-checkbox__checkbox" ] || false;
        const localStorageSearchResultBookmarkMovie = searchMovies([res], searchStringValue, checkboxValue);
        if (localStorageSearchResultBookmarkMovie.length > 0) {
          const localStorageSearchResultBookmarkList = JSON.parse(localStorage.getItem('searchResultBookmarkMovieList')) || [];
          const localStorageResultConnectedBookmarkMoviesList = [...localStorageSearchResultBookmarkList, res];
          localStorage.setItem('searchResultBookmarkMovieList', JSON.stringify(localStorageResultConnectedBookmarkMoviesList));
          setSearchResultBookmarkMovieList(localStorageResultConnectedBookmarkMoviesList);
        }
      }
    })
      .catch((err) => {
        console.log(err);
        setTooltipResponseType("error");
        setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
        setTootipPopupOpen(true);
      });
    }, [bookmarkMovieList, searchResultMovieList]);

    const handleSearchMovies = (stringValue, checkboxState) => {
      if (stringValue.length === 0) {
        return;
      }

      setIsLoading(true);
      setIsNewSearchAttempt(true);
      const localStorageMovieList = JSON.parse(localStorage.getItem("movieList")) || [];

      if (localStorageMovieList.length === 0) {
        MoviesApi.getMovies()
          .then((res) => {
            const localStorageActiveBookmarkMovieList = activeBookmarkMovieList(res, bookmarkMovieList);
            localStorage.setItem('movieList', JSON.stringify(localStorageActiveBookmarkMovieList));
            const searchResultMovieList = searchMovies(localStorageActiveBookmarkMovieList, stringValue, checkboxState);
            localStorage.setItem('searchResultMovieList', JSON.stringify(searchResultMovieList));
            setSearchResultMovieList(searchResultMovieList);
          })
          .catch((err) => {
            setTooltipResponseType("error");
            setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
            setTootipPopupOpen(true);
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      } else {
        const localStorageSearchResultMovieList = searchMovies(localStorageMovieList, stringValue, checkboxState);
        localStorage.setItem('searchResultMovieList', JSON.stringify(localStorageSearchResultMovieList));
        setSearchResultMovieList(localStorageSearchResultMovieList);
        setIsLoading(false);
      };
    };

  const handleBookmarkDelete = useCallback((movie) => {
    const id = movie.id || movie.movieId;
    AppApi.deleteBookmark(movie._id).then(() => {
      const localStorageMovieList = JSON.parse(localStorage.getItem("movieList")) || [];
      const localStorageSearchResultMovieList = JSON.parse(localStorage.getItem("searchResultMovieList")) || [];
      const localStorageBookmarkMovieList = JSON.parse(localStorage.getItem("bookmarkMovieList")) || [];

      const localStorageConnectedBookmarkMoviesList = localStorageBookmarkMovieList.filter((movie) => {
        return movie.movieId !== id;
      });
      setBookmarkMovieList(localStorageConnectedBookmarkMoviesList);
      localStorage.setItem('bookmarkMovieList', JSON.stringify(localStorageConnectedBookmarkMoviesList));

      const localStorageActiveBookmarkMovieList = activeBookmarkMovieList(localStorageSearchResultMovieList, localStorageConnectedBookmarkMoviesList);
      localStorage.setItem('movieList', JSON.stringify(localStorageActiveBookmarkMovieList));

      const localMarkedResultSearchMovieList = activeBookmarkMovieList(localStorageMovieList, localStorageConnectedBookmarkMoviesList);
      localStorage.setItem('searchResultMovieList', JSON.stringify(localMarkedResultSearchMovieList));
      setSearchResultBookmarkMovieList(localStorageActiveBookmarkMovieList);
      const localStorageSearchResultBookmarkList = JSON.parse(localStorage.getItem("searchResultBookmarkMovieList")) || [];
      if (localStorageSearchResultBookmarkList) {
        const localConnectedSearchBookmarkMoviesList = localStorageSearchResultBookmarkList.filter((movie) => {
          return movie.movieId !== id;
        });
        setSearchResultBookmarkMovieList(localConnectedSearchBookmarkMoviesList);
        localStorage.setItem('searchResultBookmarkMovieList', JSON.stringify(localConnectedSearchBookmarkMoviesList));

      }
    }).catch((err) => {
      setTooltipResponseType("error");
      setTooltipResponseText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз!');
      setTootipPopupOpen(true);
    });
  }, [bookmarkMovieList, searchResultMovieList]);


  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        {!allRoutesHeader.includes(location.pathname) ? null : <Header loggedIn={loggedIn} clickOpenMenu={handleOpenMenu}/>}
        <Routes>
          <Route path="/" element={<Main/>}/>
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
          <Route 
            path="/movies" 
            element={<ProtectedRoute
              path="/movies"
              element={Movies}
              isLoading={isLoading}
              loggedIn={loggedIn}
              isNewSearchAttempt={isNewSearchAttempt}
              onSearchMovies={handleSearchMovies}
              onIsNewSearchAttempt={setIsNewSearchAttempt}
              isMovieList={searchResultMovieList}
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
              isMovieList={isBookmarkSearchMovieList ? searchResultBookmarkMovieList : bookmarkMovieList}
              isBookmarkSearchMovieList={isBookmarkSearchMovieList}
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
