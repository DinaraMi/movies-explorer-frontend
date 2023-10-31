import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Header.css';
import logo from '../../images/logo.png';
import burger from '../../images/burger.png';
import accountIcon from '../../images/acount.png';
import PopupMenu from '../AuthProfile/PopupMenu/PopupMenu';

function Header({ loggedIn, currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery({ minWidth: 1280 });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isProfilePage = location.pathname === '/profile';
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isHomePage = location.pathname === '/';
  const isAuthenticated = loggedIn && currentUser && currentUser.name;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    navigate();
  };

  useEffect(() => {
    if ((isHomePage || isProfilePage || isMoviesPage || isSavedMoviesPage) && isLargeScreen) {
      setMenuOpen(false);
    }
  }, [isHomePage, isProfilePage, isMoviesPage, isSavedMoviesPage, isLargeScreen]);

  return (
    <header className={`header ${isProfilePage ? 'profile-header' : ''} 
    ${isMoviesPage ? 'movies-header' : ''} 
    ${isSavedMoviesPage ? 'saved-movies-header' : ''}`}
    >
      <div className='header__container'>
        <img className='header__logo' src={logo} alt="логотип" />
        <nav>
          {isLargeScreen ? (
            isHomePage ? (
              isAuthenticated ? (
                <div className='menu__buttons'>
                  <Link to="/movies" className='menu__list' onClick={handleLinkClick}>
                    Фильмы
                  </Link>
                  <Link to="/saved-movies" className='menu__list' onClick={handleLinkClick}>
                    Сохранённые фильмы
                  </Link>
                  <Link to="/profile" className='menu__list' onClick={handleLinkClick}>
                    Аккаунт&nbsp;&nbsp;&nbsp;
                    <img src={accountIcon} alt="Аккаунт" />
                  </Link>
                </div>
              ) : (
                <div className='menu__buttons'>
                  <Link to="/signup" className='menu__list' onClick={handleLinkClick}>
                    Регистрация
                  </Link>
                  <Link to="/signin" className='menu__list' onClick={handleLinkClick}>
                    Войти
                  </Link>
                </div>
              )
            ) : (
              <div className='menu__buttons'>
                <Link to="/movies" className='menu__list' onClick={handleLinkClick}>
                  Фильмы
                </Link>
                <Link to="/saved-movies" className='menu__list' onClick={handleLinkClick}>
                  Сохранённые фильмы
                </Link>
                <Link to="/profile" className='menu__list' onClick={handleLinkClick}>
                  Аккаунт&nbsp;&nbsp;&nbsp;
                  <img src={accountIcon} alt="Аккаунт" />
                </Link>
              </div>
            )
          ) : (
            <button
              className={`menu__button_active ${isMenuOpen ? 'menu__button' : ''}`}
              onClick={toggleMenu}
            >
              <img src={burger} alt="бургер" />
            </button>
          )}
          {isMenuOpen && isHomePage ? (
            <div className='menu__buttons'>
              <Link to="/signup" className='menu__list' onClick={handleLinkClick}>
                Регистрация
              </Link>
              <Link to="/signin" className='menu__list' onClick={handleLinkClick}>
                Войти
              </Link>
            </div>
          ) : null}
        </nav>
        {(isProfilePage || isMoviesPage || isSavedMoviesPage) && (
          <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />
        )}
      </div>
    </header>
  );
}

export default Header;