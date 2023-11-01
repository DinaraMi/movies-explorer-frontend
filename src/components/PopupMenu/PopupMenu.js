import { Link, useNavigate, useLocation } from 'react-router-dom';
import './PopupMenu.css';
import close from '../../images/close.svg';

function PopupMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const isHomePage = location.pathname === '/';

  const handleLinkClick = (url) => {
    if (isOpen) {
      onClose();
    }
    navigate(url);
  };

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose}>
          <img src={close} alt="Крестик" />
        </button>
        <nav className="popup__menu">
          <ul className='popup__menu-all'>
            <li className={`popup-menu-list ${isHomePage ? 'active' : ''}`}>
              <Link to="/" className="popup-menu-list__item" onClick={() => handleLinkClick('/')}>
                Главная
              </Link>
            </li>
            <li className={`popup-menu-list ${isMoviesPage ? 'active' : ''}`}>
              <Link to="/movies" className="popup-menu-list__item" onClick={() => handleLinkClick('/movies')}>
                Фильмы
              </Link>
            </li>
            <li className={`popup-menu-list ${isSavedMoviesPage ? 'active' : ''}`}>
              <Link to="/saved-movies" className="popup-menu-list__item" onClick={() => handleLinkClick('/saved-movies')}>
                Сохранённые фильмы
              </Link>
            </li>
            <li className={`popup-menu-list ${isProfilePage ? 'active' : ''}`}>
              <Link to="/profile" className="popup-menu-list__item popup-menu-list__item_acount" onClick={() => handleLinkClick('/profile')}>
                Аккаунт&nbsp;
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default PopupMenu;
