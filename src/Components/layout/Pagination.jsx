import React from 'react';
import { useState, useContext } from 'react';
import RickMortyContext from '../../context/RickMortyContext';

function Pagination() {
  const { page, changePage } = useContext(RickMortyContext);
  const { loading, searchActive, fetchCharacters } =
    useContext(RickMortyContext);

  const handlePageChange = (e) => {
    if (page > 1 || e.target.value > 0) {
      changePage(+e.target.value);
      fetchCharacters();
    }
  };

  if (!loading) {
    if (searchActive) {
      return (
        <div className="pagination">
          <button
            className="btn pagination__btn"
            value={1}
            onClick={handlePageChange}
          >
            BACK
          </button>
        </div>
      );
    } else {
      return (
        <div className="pagination">
          <button
            className="btn pagination__btn"
            value={-1}
            onClick={handlePageChange}
          >
            &larr;
          </button>
          <p>{page}</p>
          <button
            className="btn pagination__btn"
            value={1}
            onClick={handlePageChange}
          >
            &rarr;
          </button>
        </div>
      );
    }
  }
}

export default Pagination;
