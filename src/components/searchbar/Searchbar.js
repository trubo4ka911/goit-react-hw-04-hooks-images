import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { SearchForm, SearchInput, SearchBtn } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleNameChange = e => {
    setImgName(e.target.value.toString().toLowerCase());
  };
  const handleSubmit = e => {
    if (imgName.trim() === '') {
      return toast.error('Write name for searching image!');
    }

    onSubmit(imgName);
    setImgName('');
    e.preventDefault();
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <FcSearch />
        </SearchBtn>

        <SearchInput
          type="text"
          name="imgName"
          value={imgName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
