import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../hooks/useFormValidation';

function Profile({ onUpdateUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (currentUser) {
      values.name = currentUser.name;
      values.email = currentUser.email;
    }
  }, [currentUser]);

  const titleText = currentUser ? `Привет, ${values.name}!` : 'Привет';

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (evt) => {
    evt.preventDefault();
    if (isValid && isButtonActive) {
      try {
        await onUpdateUser({
          name: values.name,
          email: values.email,
        });
        setIsEditing(false);
        errors.name = '';
        errors.email = '';
        setSubmitError('');
      } catch (err) {
        setSubmitError(`При обновлении профиля произошла ошибка: ${err.message}`);
      }
    }
  };
  
  useEffect(() => {
    setIsButtonActive(isValid && values.name && values.email);
  }, [isValid, values.name, values.email]);

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
            minLength="2"
            required
            value={values.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {errors.name && <span className="profile__error">{errors.name}</span>}
        <div className='profile__separator'></div>
        <div className='profile__input-container'>
          <label className='profile__placeholder'>Email</label>
          <input
            id="email"
            name="email"
            className="profile__input"
            type="email"
            required
            value={values.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {errors.email && <span className="profile__error">{errors.email}</span>}
        {submitError && <span className="profile__error">{submitError}</span>}
        {isEditing ? (
          <button
            className={`profile__submit ${isButtonActive ? '' : 'profile__submit_inactive'}`}
            type="button"
            onClick={handleSaveClick}
          >
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
