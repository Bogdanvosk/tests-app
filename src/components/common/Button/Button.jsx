import cn from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

import s from './Button.module.scss';

const Button = ({
  children = null,
  variant = 'default',
  iconName = '',
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      className={cn(s.button, s[variant], className)}
      type={type}
      {...props}
    >
      {children}
      {iconName !== '' && <Icon className={s.icon} name={iconName} />}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
