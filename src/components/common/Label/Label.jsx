import cn from 'classnames';
import PropTypes from 'prop-types';

import { useFormContext } from 'react-hook-form';

import s from './Label.module.scss';

const Label = ({ children, reversed = false, title = '', className = '' }) => {
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

export default Label;

Label.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};
