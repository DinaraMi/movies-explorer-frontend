import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../hooks/useFormValidation';

function Profile({ onUpdateUser, onLogout, isSaveSuccess, submitError, setIsSaveSuccess, setSubmitError }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.name);
      values.name = currentUser.name;
      values.email = currentUser.email;
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setIsDataChanged(values.name !== currentUser.name || values.email !== currentUser.email);
    }
  }, [currentUser, values.name, values.email]);

  useEffect(() => {
    setIsButtonActive(isValid && values.name && values.email && isDataChanged);
  }, [isValid, values.name, values.email, isDataChanged]);

  const titleText = currentUser ? `Привет, ${displayName}!` : 'Привет';

  const handleEditClick = () => {
    setIsEditing(true);
    setIsSaveSuccess(false);
    setSubmitError('');
  };

  const handleSaveClick = (evt) => {
    evt.preventDefault();
    if (isValid && isButtonActive && isDataChanged) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
      setIsEditing(false);
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
        <div className="profile__messages-container">
          {submitError && <span className="profile__error-submit">{submitError}</span>}
          {isSaveSuccess && <span className="profile__success">Профиль успешно сохранен!</span>}
        </div>
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
