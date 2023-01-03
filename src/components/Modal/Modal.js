import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onCloseModal, currentImageUrl }) => {
  useEffect(() => {
    const keydownHandler = event => {
      if (event.keyCode === 27) {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  });

  return (
    <div className={css.Overlay} onClick={onCloseModal}>
      <div className={css.Modal}>
        <img src={currentImageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string.isRequired,
};

export default Modal;
