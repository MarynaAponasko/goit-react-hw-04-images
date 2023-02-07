import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ info, closeModal }) => {
  const handleCloseModal = ({ target, currentTarget, code }) => {
    if (code === 'Escape' || currentTarget === target) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal);

    return () => document.removeEventListener('keydown', handleCloseModal);
  });

  return createPortal(
    <div className={s.overlay} onClick={handleCloseModal}>
      <div className={s.modal}>
        <img src={info.largeImageURL} alt={info.tags} />
      </div>
    </div>,
    modalRoot
  );
};
// {
//

export default Modal;

Modal.propTypes = {
  info: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
