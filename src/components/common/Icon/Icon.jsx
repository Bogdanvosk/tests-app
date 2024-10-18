import PropTypes from 'prop-types';

import { getIcon } from '../../../utils/getIcon';

const Icon = ({ name, className = '', fill, ...props }) => {
  const SVGIcon = getIcon(name);
  return <SVGIcon className={className} fill={fill} {...props} />;
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
};
