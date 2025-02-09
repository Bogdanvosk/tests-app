import { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import useOutsideClick from '@/hooks/useOutsideClick';
import { useModalContext } from '../ModalProvider/ModalProvider';

import s from './Modal.module.scss';

const Modal = ({ children, className = '' }) => {
  const { hideModal } = useModalContext();
  const modalRef = useRef(null);

  const onCloseModal = (e) => {
    if (e.target.tagName === 'svg') return;

    hideModal();
  };

  useOutsideClick(modalRef, onCloseModal);

  return createPortal(
    <div className={s.wrapper}>
      <div className={cn(s.modal, className)} ref={modalRef}>
        {children}
        <span className={s.delete} onClick={onCloseModal}></span>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
