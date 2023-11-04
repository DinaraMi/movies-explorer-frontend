import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';
import AuthForm from '../AuthForm';
import Input from '../../Input/Input';
import { useFormValidation } from '../../../hooks/useFormValidation';

function Register({ onRegister }) {
  const location = useLocation();
  const isLoading = true;

  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (location.pathname === '/signup') {
      resetForm();
    }
  }, [location.pathname, resetForm]);

  useEffect(() => {
    setIsButtonActive(isValid);
  }, [isValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isButtonActive) {
      const { name, email, password } = values;
      onRegister(name, email, password);
    }
  };

  return (
    <main className="register">
      <AuthForm
        title="Добро пожаловать!"
        name="register"
        isLoading={isLoading}
        ariaLabel="Зарегистрироваться"
        onSubmit={handleSubmit}
        formType="register"
        gray="Уже зарегистрированы?"
        blue="Войти"
        link="/signin"
      >
        <Input
          id="name"
          name="name"
          className="register__input"
          type="text"
          label="Имя"
          minLength="2"
          required
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Имя"
          error={errors.name}
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
          placeholder="Email"
          error={errors.email}
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
          placeholder="Пароль"
          error={errors.password}
        />
        <button
          className={`auth__submit-register ${isButtonActive ? '' : 'auth__submit-register_inactive'}`}
          type="submit"
          aria-label="Зарегистрироваться"
          disabled={!isButtonActive}
        >
          Зарегистрироваться
        </button>
      </AuthForm>
    </main>
  );
}

export default Register;
