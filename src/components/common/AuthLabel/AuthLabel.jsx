import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './AuthLabel.module.scss';

const AuthLabel = ({ children, reversed = false, title = '', className = '' }) => {
  return (
    <label className={cn(s.label, className)}>
      {reversed ? (
        <>
          {children}
          <span className={s.title}>{title}</span>
        </>
      ) : (
        <>
          <span className={s.title}>{title}</span>
          {children}
        </>
      )}
    </label>
  );
};

export default AuthLabel;

AuthLabel.propTypes = {
  children: PropTypes.node,
  reversed: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string
};
