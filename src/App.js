import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { getImages } from './api';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/searchbar/Searchbar';
import ImageGallery from './components/gallery/ImageGallery';
import Modal from './components/modal/Modal';
import LoadMoreBtn from './components/button/Button';

const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const fetchImages = useCallback(() => {
    setLoading(true);
    getImages(imgName, page)
      .then(newImages => {
        setImages(state => [...state, newImages.hits]);
        setTotal(newImages.total);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [imgName, page]);

  useEffect(() => {
    if (imgName !== '') fetchImages();
  }, [imgName, page, fetchImages]);

  const loadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const handleFormSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setImages([]);
    setTotal(0);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getItemContent = modalContent => {
    setModalContent(modalContent);
    setShowModal(true);
  };

  return (
    <>
      {showModal && <Modal onClose={toggleModal} data={modalContent} />}
      <Searchbar onSubmit={handleFormSubmit} />
      {!!images.length && (
        <ImageGallery items={images} getItemContent={getItemContent} />
      )}
      {loading && <div>Loading...</div>}
      {!!images.length && total >= page * 12 && (
        <LoadMoreBtn onLoadMore={loadMore} />
      )}
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </>
  );
};

export default App;
