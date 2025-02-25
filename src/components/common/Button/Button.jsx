import { useCallback } from 'react';
import Icon from '@/components/common/Icon/Icon';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './Button.module.scss';

const Button = ({
  children = null,
  variant = 'default',
  type = 'button',
  iconName = '',
  className = '',
  onClick,
  preventClick = false,
  disabled = false,
  ...props
}) => {
  const handleClick = useCallback(
    e => {
      e.stopPropagation();

      if (preventClick) e.preventDefault();
      if (onClick) onClick();
    },
    [onClick, preventClick]
  );

  return (
    <button
      onClick={handleClick}
      className={cn(s.button, s[variant], { [s.disabled]: disabled }, className)}
      type={type}
      disabled={disabled}
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
  variant: PropTypes.oneOf(['default', 'tabs']),
  iconName: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  preventClick: PropTypes.bool
};
