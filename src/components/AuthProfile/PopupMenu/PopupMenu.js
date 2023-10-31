import { Link, useNavigate } from 'react-router-dom';
import './PopupMenu.css';
import close from '../../../images/close.svg';
import accountIcon from '../../../images/acount.png';

function PopupMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  
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
            <div className="popup__menu">
              <ul className='popup__menu_all'>
                <li className='popup-menu__list'>
                <Link to="/" className='popup-menu__list' onClick={() => handleLinkClick('/')}>
                  Главная
                </Link>
              </li>
              <li className='popup-menu__list'>
                <Link to="/movies" className='popup-menu__list' onClick={() => handleLinkClick('/movies')}>
                  Фильмы
                </Link>
              </li>
              <li className='popup-menu__list'>
                <Link to="/saved-movies" className='popup-menu__list' onClick={() => handleLinkClick('/saved-movies')}>
                  Сохранённые фильмы
                </Link>
              </li>
              <li className='popup-menu__list popup-menu__list_acount'>
                <Link to="/profile" className='popup-menu__list popup-menu__list_acount' onClick={() => handleLinkClick('/profile')}>
                  Аккаунт&nbsp;
                    <img src={accountIcon} alt="Аккаунт" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

export default PopupMenu;
