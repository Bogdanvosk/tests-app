import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './Input.module.scss';

const Input = ({ type, value, onChange, placeholder = '', className = '', ...props }) => {
  return (
    <input
      type={type}
      className={cn(s.input, s.className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
