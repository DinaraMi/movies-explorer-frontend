import './Input.css';

function Input({ id, className, type, name, minLength, maxLength, label, placeholder, required, value, onChange, error }) {
  return (
    <div className="input-container">
      <div className='input__label'>{label}
        <input
          id={id}
          className={className}
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          value={value}
          onChange={onChange}
        />
        <span id={`${name}-error`} className="input__error">{error}</span>
      </div>
    </div>
  );
}
export default Input;