import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './FormInput.module.scss';

const FormInput = ({ type, className = '', placeholder = '', fieldName = null, ...props }) => {
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
      {...props}
    />
  );
};

export default FormInput;

FormInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string
};
