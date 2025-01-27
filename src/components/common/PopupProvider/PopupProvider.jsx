import { ToastContainer, Slide } from 'react-toastify';

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
