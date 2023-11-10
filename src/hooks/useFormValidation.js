import { useCallback, useState } from "react";
import { emailRegex } from '../utils/contants'


export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      setErrors({ ...errors, [name]: emailRegex.test(value) ? '' : 'Введите корректный email' });
    } else {
      setErrors({ ...errors, [name]: input.validationMessage });
    }
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid, setErrors };
}
