import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { useState } from 'react';

const ImageGallery = ({ articles }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const clickImage = event => {
    if (event.target.tagName === 'IMG') {
      let currentImgObj = articles.find(function (element) {
        return element.id === Number(event.target.id);
      });
      setCurrentImageUrl(currentImgObj.largeImageURL);
      setOpenModal(true);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ul className={css.ImageGallery} onClick={clickImage}>
        {articles.map(article => {
          return (
            <ImageGalleryItem id={article.id} article={article.webformatURL} />
          );
        })}
      </ul>
      {openModal && (
        <Modal onCloseModal={onCloseModal} currentImageUrl={currentImageUrl} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
