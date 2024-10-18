import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './Typography.module.scss';

const Typography = ({ tag = 'h1', className = '', children, ...props }) => {
  const Component = tag;

  return (
    <Component {...props} className={cn(s[tag], className)}>
      {children}
    </Component>
  );
};

export default Typography;

Typography.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
