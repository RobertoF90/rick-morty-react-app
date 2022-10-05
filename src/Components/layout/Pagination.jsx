import React from 'react';
import { useState, useContext } from 'react';
import RickMortyContext from '../../context/RickMortyContext';

function Pagination() {
  const { page, changePage } = useContext(RickMortyContext);
  const { characters, fetchCharacters } = useContext(RickMortyContext);

  const handlePageChange = (e) => {
    if (e.target.value > 0) {
      changePage(+e.target.value);
      fetchCharacters();
    }
  };

  return (
    <div className="pagination">
      <button value={-1} onClick={handlePageChange}>
        &larr;
      </button>
      <p>{page}</p>
      <button value={1} onClick={handlePageChange}>
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;
