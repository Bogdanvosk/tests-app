import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getModalContent } from '@/utils/getModalContent';

import Modal from '../Modal/Modal';

import s from './ModalProvider.module.scss';

const initialStore = {
  modalType: null,
  modalProps: {},
};

const ModalContext = createContext(initialStore);
export const useModalContext = () => useContext(ModalContext);

const ModalPovider = ({ children }) => {
  const [store, setStore] = useState(initialStore);
  const { modalType, modalProps } = store || {};

  useEffect(() => {
    document.body.style.overflow = modalType !== null ? 'hidden' : 'auto';
  }, [modalType]);

  const showModal = (modalType, modalProps) => {
    setStore({ ...store, modalType, modalProps });
  };

  const hideModal = () => {
    setStore({ ...store, modalType: null, modalProps: {} });
  };

  const renderComponent = () => {
    if (!modalType) return null;

    const ModalComponent = getModalContent(modalType);

    return (
      <Modal className={s[modalType]}>
        <ModalComponent {...modalProps} />
      </Modal>
    );
  };

  return (
    <ModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalPovider;

ModalPovider.propTypes = {
  children: PropTypes.node,
};
