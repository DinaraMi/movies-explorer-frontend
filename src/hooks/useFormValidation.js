import { useCallback, useState } from "react";
import { emailRegex } from '../utils/contants';

export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    let newErrors = { ...errors };
    if (name === 'email') {
      newErrors[name] = emailRegex.test(value) ? '' : 'Введите корректный email';
    } else {
      newErrors[name] = input.validationMessage;
    }
    setErrors(newErrors);
    const isFormValid = Object.values(newErrors).every(error => error === '') && Object.values(values).every(val => val !== '');
    setIsValid(isFormValid);
  };

  const resetForm = useCallback(
    () => {
      setValues({});
      setErrors({});
      setIsValid(false);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid, setErrors };
}
