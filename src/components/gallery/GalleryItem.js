import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGallery.styled';
const GalleryItem = ({ url, tags, id, largeImageURL, getItemContent }) => {
  return (
    <ImageItem key={id}>
      <Image
        src={url}
        alt={tags || 'photo'}
        id={id}
        onClick={() => getItemContent(largeImageURL)}
      />
    </ImageItem>
  );
};
GalleryItem.propTypes = {
  url: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.number,
  getItemContent: PropTypes.func,
};
export default GalleryItem;
