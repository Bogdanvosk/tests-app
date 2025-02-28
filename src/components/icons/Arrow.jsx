import PropTypes from 'prop-types';

const Arrow = ({ className = '' }) => {
  return (
    <svg viewBox='0 0 25 25' className={className} fill='currentColor'>
      <path d='m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z' />
    </svg>
  );
};

export default Arrow;

Arrow.propTypes = {
  className: PropTypes.string
};
