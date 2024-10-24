import cn from 'classnames';

import { useFormContext } from 'react-hook-form';

import s from './Input.module.scss';

const Input = ({
  type,
  className = '',
  placeholder = '',
  fieldName = null,
  ...props
}) => {
  const { register } = useFormContext();

  if (type === 'checkbox') {
    return (
      <label className={cn(s.checkbox, className)}>
        <input
          {...register(fieldName)}
          type={type}
          className={cn(s.hidden, s.checkInput)}
          {...props}
        />
        <span className={s.checkmark}></span>
      </label>
    );
  }

  return (
    <input
      {...register(fieldName)}
      className={cn(s.input, className)}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
