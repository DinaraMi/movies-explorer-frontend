import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const titleText = currentUser ? `Привет, ${name}!` : 'Привет';

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (evt) => {
    evt.preventDefault();
    try {
      await onUpdateUser({
        name: name,
        email: email,
      });
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('При обновлении профиля произошла ошибка.: ' + err.message);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <main className='profile'>
      <h1 className='profile__title'>{titleText}</h1>
      <form className='profile__form' name='profile__form' onSubmit={handleSaveClick}>
        <div className='profile__input-container'>
          <label className='profile__placeholder'>Имя</label>
          <input
            id="name"
            name="name"
            className="profile__input"
            type="text"
            required
            value={name || ''}
            onChange={handleNameChange}
            disabled={!isEditing}
          />
        </div>
        <div className='profile__separator'></div>
        <div className='profile__input-container'>
          <label className='profile__placeholder'>Email</label>
          <input
            id="email"
            name="email"
            className="profile__input"
            type="email"
            required
            value={email || ''}
            onChange={handleEmailChange}
            disabled={!isEditing}
          />
        </div>
        {error && <span className='profile__error'>{error}</span>}
        {isEditing ? (
          <button className='profile__submit' type="button" onClick={handleSaveClick}>
            Сохранить
          </button>
        ) : (
          <button className='profile__edit' type="button" onClick={handleEditClick}>
            Редактировать
          </button>
        )}
      </form>
      <Link className="profile__link" to="/" onClick={handleLogoutClick}>
        Выйти из аккаунта
      </Link>
    </main>
  );
}

export default Profile;
