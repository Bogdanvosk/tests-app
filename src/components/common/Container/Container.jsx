import PropTypes from 'prop-types';
import cn from 'classnames'

import s from './Container.module.scss';

const Container = ({ children, className = '' }) => {
  return <div className={cn(s.container, className)}>{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
