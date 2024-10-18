import PropTypes from 'prop-types';
import cn from 'classnames';

import { useFormContext } from 'react-hook-form';

import Icon from '../Icon/Icon';

import s from './Input.module.scss';

const Input = ({
  fieldName = null,
  type,
  placeholder,
  className = '',
  checkboxValue = false,
  handleCheckboxChange = () => {},
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const passwordValue = watch('password');

  const registerOptions = {
    username: { required: 'Логин обязателен' },
    password: { required: 'Пароль обязателен' },
    password_confirmation: {
      required: 'Подтвердите пароль',
      validate: (value) => value === passwordValue || 'Пароли должны совпадать',
    },
  };

  if (type === 'checkbox') {
    return (
      <div className={s.checkbox}>
        <input
          value={checkboxValue}
          onChange={handleCheckboxChange}
          type={type}
          className={cn(s.hidden, s.checkInput)}
        />
        <span className={s.checkmark}></span>
      </div>
    );
  }

  return (
    <>
      <div className={s.inputWrapper}>
        <Icon
          name={fieldName === 'password_confirmation' ? 'password' : fieldName}
          className={s.icon}
        />
        <input
          {...register(fieldName, registerOptions[fieldName])}
          type={type}
          placeholder={placeholder}
          className={cn(s.input, { [s.error]: errors[fieldName] }, className)}
        />
      </div>

      <p className={s.errorText}>{errors[fieldName]?.message}</p>
    </>
  );
};

export default Input;

Input.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  checkboxValue: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
};
