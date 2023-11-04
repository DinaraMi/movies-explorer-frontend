import React, { useState } from 'react';
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
    <main className='login'>
      <AuthForm
        title="Рады видеть!"
        name="login"
        isLoading={isLoading}
        ariaLabel="Войти"
        onSubmit={handleSubmit}
        gray="Ещё не зарегистрированы?"
        blue="Регистрация"
        link="/signup"
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
          placeholder="Email"
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
          placeholder="Пароль"
        />
      </AuthForm>
    </main>
  );
}

export default Login;