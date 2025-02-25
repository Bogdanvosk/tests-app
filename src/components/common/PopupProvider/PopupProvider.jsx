import { ToastContainer, Slide } from 'react-toastify';
import PropTypes from 'prop-types';

const PopupProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover={false}
        autoClose={2000}
        transition={Slide}
        hideProgressBar
        closeOnClick
        newestOnTop={false}
      />
    </>
  );
};

export default PopupProvider;

PopupProvider.propTypes = {
  children: PropTypes.node
};
