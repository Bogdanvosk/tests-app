import PropTypes from 'prop-types';

const Dropdown = ({ options }) => {
  return <div>Dropdown</div>;
};

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};
