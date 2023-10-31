import React from 'react';
import './AuthForm.css';
import logoAuthForm from '../../images/logoAuthForm.png'

function AuthForm({ name, title, children, ariaLabel, onSubmit, formType }) {
  const submitButtonClassName = formType === 'register' ? 'auth__submit-register' : 'auth__submit-login';

  return (
    <div className={`auth auth_type_${name}`}>
      <div className="auth__container">
        <img className='auth__logo' src={logoAuthForm} alt={title} />
        <h3 className="auth__title">{title}</h3>
        <form className={`auth__form-element auth__form-element_type_${name}`} name={`${name}-form`} onSubmit={onSubmit} >
          {children}
          <button
            className={submitButtonClassName}
            type="submit"
            aria-label={ariaLabel}
          >{ariaLabel}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm;