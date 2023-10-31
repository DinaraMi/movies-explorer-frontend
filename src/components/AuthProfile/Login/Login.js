import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import AuthForm from '../AuthForm';
import Input from '../../Input/Input';
import { useForm } from '../../../hooks/useForm';

function Login({ onLogin }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const isLoading = true;

  const [message, setMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      setMessage('Необходимо заполнить все поля!');
      return;
    }
    onLogin(email, password);
  }

  return (
    <>
      <AuthForm
        title="Рады видеть!"
        name="login"
        isLoading={isLoading}
        ariaLabel="Войти"
        onSubmit={handleSubmit}
      >
        <Input
          id="email"
          name="email"
          className="login__input"
          type="email"
          label="Email"
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <Input
          id="password"
          className="login__input"
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
      <Link className="login__link" to="/signup">
        <span className='login__link_gray'>Ещё не зарегистрированы?</span>
        <span className='login__link_blue'> Регистрация</span>
      </Link>
    </>
  );
}

export default Login;