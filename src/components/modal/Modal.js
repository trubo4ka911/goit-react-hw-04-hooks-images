import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ onClose, data }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div>
      <ModalBackdrop onClick={handleBackdropClick}></ModalBackdrop>
      <ModalImg src={data} alt={'photo'} />
    </div>,
    modalRoot,
  );
};

export default Modal;
