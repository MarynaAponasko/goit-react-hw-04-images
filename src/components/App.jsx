import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from 'services/fetch-api';

import s from '../components/App-module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [totalImage, setTotalImages] = useState('');
  const [infoForModal, setInfoForModal] = useState('');

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const { data } = await fetchImages(searchValue, page);
        setImages(images => [...images, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, [searchValue, page]);

  const handlerSubmit = ({ search }) => {
    setSearchValue(search);
    setImages([]);
    setPage(1);
    setTotalImages(null);
  };

  const handlerLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = ({ largeImageURL, tags }) => {
    setInfoForModal({ largeImageURL, tags });
  };

  const closeModal = () => {
    setInfoForModal('');
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handlerSubmit} />

      {infoForModal && <Modal info={infoForModal} closeModal={closeModal} />}
      {images.length >= 1 && (
        <ImageGallery images={images} onClick={openModal} />
      )}
      {error && <p className={s.errorMessage}>{error}</p>}
      {loading && <Loader />}
      {images.length < totalImage && !loading && (
        <Button onClick={handlerLoadMore} />
      )}
      {/* {images.length  === totalImages && (
          <p>
            We don't have more images for showing. Please enter the other search
            word.
          </p>
        )} */}
    </div>
  );
};

export default App;
