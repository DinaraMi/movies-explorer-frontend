import React from 'react';
import './AuthForm.css';
import logoAuthForm from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function AuthForm({ name, title, children, ariaLabel, onSubmit, formType, gray, blue, link, isActive, errorMessageAuth }) {
  const submitButtonClassName = formType === 'register' ? 'auth__submit-register' : 'auth__submit-login';
  const errorButtonClassName = formType === 'register' ? 'auth__error-register' : 'auth__error-login';
  const buttonClasses = isActive ? submitButtonClassName : `${submitButtonClassName} auth__submit_inactive`;

  return (
    <div className={`auth auth_type_${name}`}>
      <div className="auth__container">
        <Link className='auth__logo' to="/"><img className='auth__logo-img' src={logoAuthForm} alt={title} /></Link>
        <h1 className="auth__title">{title}</h1>
        <form className={`auth__form-element auth__form-element_type_${name}`} name={`${name}-form`} onSubmit={onSubmit} >
          {children}
          {errorMessageAuth && <span className={errorButtonClassName}>{errorMessageAuth}</span>}
          <button
            className={`auth__submit ${buttonClasses}`}
            type="submit"
            aria-label={ariaLabel}
          >{ariaLabel}
          </button>
        </form>
        <Link className="auth__link" to={link}>
          <span className="auth__link-gray">{gray}</span>&nbsp;
          <span className="auth__link-blue">{blue}</span>
        </Link>
      </div>
    </div>
  )
}

export default AuthForm;