import Image from 'next/image';
import PropTypes from 'prop-types';

const Logo = ({ imageSrc, className = '' }) => {
  return (
    <div>
      <Image
        width={200}
        height={45}
        className={className}
        src={imageSrc}
        alt='Logo'
      />
    </div>
  );
};

export default Logo;

Logo.propTypes = {
  imageSrc: PropTypes.object,
  className: PropTypes.string,
};
