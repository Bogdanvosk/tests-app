import PropTypes from 'prop-types';

const User = ({ className = '' }) => {
  return (
    <svg
      width='44'
      height='50'
      viewBox='0 0 44 50'
      fill='none'
      className={className}
    >
      <path
        d='M21.875 25C28.7793 25 34.375 19.4043 34.375 12.5C34.375 5.5957 28.7793 0 21.875 0C14.9707 0 9.375 5.5957 9.375 12.5C9.375 19.4043 14.9707 25 21.875 25ZM31.2305 28.1836L26.5625 46.875L23.4375 33.5938L26.5625 28.125H17.1875L20.3125 33.5938L17.1875 46.875L12.5195 28.1836C5.55664 28.5156 0 34.209 0 41.25V45.3125C0 47.9004 2.09961 50 4.6875 50H39.0625C41.6504 50 43.75 47.9004 43.75 45.3125V41.25C43.75 34.209 38.1934 28.5156 31.2305 28.1836Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default User;

User.propTypes = {
  className: PropTypes.string,
};
