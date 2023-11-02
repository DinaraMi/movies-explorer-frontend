import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Header.css';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import accountIcon from '../../images/acount.svg';
import PopupMenu from '../PopupMenu/PopupMenu';

function Header({ loggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery({ minWidth: 1280 });
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isProfilePage = location.pathname === '/profile';
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isHomePage = location.pathname === '/';

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

  const renderMainMenu = () => {
    if (isHomePage) {
      if (loggedIn) {
        return (
          <>
            <Link to="/movies" className={`menu-list ${isMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>
              Фильмы
            </Link>
            <Link to="/saved-movies" className={`menu-list ${isSavedMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className={`menu-list ${isProfilePage ? 'active' : ''}`} onClick={handleLinkClick}>
              Аккаунт&nbsp;&nbsp;&nbsp;
              <img src={accountIcon} alt="Аккаунт" />
            </Link>
          </>
        );
      } else {
        return (
          <>
            <Link to="/signup" className='menu-list-auth' onClick={handleLinkClick}>
              Регистрация
            </Link>
            <Link to="/signin" className='menu-list-auth' onClick={handleLinkClick}>
              Войти
            </Link>
          </>
        );
      }
    } else {
      return (
        <>
          <Link to="/movies" className={`menu-list ${isMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>
            Фильмы
          </Link>
          <Link to="/saved-movies" className={`menu-list ${isSavedMoviesPage ? 'active' : ''}`} onClick={handleLinkClick}>
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className={`menu-list ${isProfilePage ? 'active' : ''}`} onClick={handleLinkClick}>
            Аккаунт&nbsp;&nbsp;&nbsp;
            <img src={accountIcon} alt="Аккаунт" />
          </Link>
        </>
      );
    }
  };

  return (
    <header className={`header ${isProfilePage ? 'profile-header' : ''} ${isMoviesPage ? 'movies-header' : ''} ${isSavedMoviesPage ? 'saved-movies-header' : ''}`}>
      <div className='header__container'>
        <Link className='header__logo' to="/"><img className='header__logo-img' src={logo} alt="логотип" /></Link>
        <nav>
          {isLargeScreen ? (
            <div className='menu'>
              {renderMainMenu()}
            </div>
          ) : (
            <button className={`menu-button-active ${isMenuOpen ? 'menu-button' : ''}`} onClick={toggleMenu}>
              <img src={burger} alt="бургер" />
            </button>
          )}
          {isMenuOpen && isHomePage && (
            <div className='menu'>
              {loggedIn ? (
                <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />
              ) : (
                <>
                  <Link to="/signup" className='menu__list-auth' onClick={handleLinkClick}>
                    Регистрация
                  </Link>
                  <Link to="/signin" className='menu__list-auth' onClick={handleLinkClick}>
                    Войти
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>
        {(isProfilePage || isMoviesPage || isSavedMoviesPage) && (
          <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />
        )}
      </div>
    </header>
  );
}

export default Header;
