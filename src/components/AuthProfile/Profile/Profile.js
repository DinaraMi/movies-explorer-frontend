import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Input from '../../Input/Input';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function Profile({ onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
  };

  return (
    <section className='profile'>
      <h2 className='profile__title'>{titleText}</h2>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__input-container'>
          <p className='profile__placeholder'>Имя</p>
          <Input
            id="name"
            name="name"
            className="profile__input"
            type="text"
            required
            value={name || ''}
            onChange={handleNameChange}
          />
        </div>
        <div className='profile__separator'></div>
        <div className='profile__input-container'>
          <p className='profile__placeholder'>Email</p>
          <Input
            id="email"
            name="email"
            className="profile__input"
            type="email"
            required
            value={email || ''}
            onChange={handleEmailChange}
          />
        </div>
        <button className='profile__submit' type="submit">Редактировать</button>
      </form>
      <Link className="profile__link" to="/">
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;