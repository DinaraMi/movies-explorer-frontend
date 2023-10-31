import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Register.css';
import AuthForm from '../AuthForm';
import Input from '../../Input/Input';
import { useForm } from '../../../hooks/useForm';

function Register({ onRegister }) {
  const location = useLocation();
  const isLoading = true;
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (location.pathname === '/signup') {
      setValues({
        name: '',
        email: '',
        password: '',
      });
    }
  }, [location.pathname, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = values;
    onRegister(name, email, password);
  };

  return (
    <>
      <AuthForm
        title="Добро пожаловать!"
        name="register"
        isLoading={isLoading}
        ariaLabel="Зарегистрироваться"
        onSubmit={handleSubmit}
        formType="register"
      >
        <Input
          id="name"
          name="name"
          className="register__input"
          type="text"
          label="Имя"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <Input
          id="email"
          name="email"
          className="register__input"
          type="email"
          label="Email"
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <Input
          id="password"
          className="register__input"
          type="password"
          label="Пароль"
          name="password"
          minLength="8"
          maxLength="20"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
      </AuthForm>
      <Link className="register__link" to="/signin">
        <span className='register__link_gray'>Уже зарегистрированы?</span>
        <span className='register__link_blue'> Войти</span>
      </Link>
    </>
  );
}

export default Register;