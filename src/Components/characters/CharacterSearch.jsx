import React from 'react';
import { useState, useContext } from 'react';
import RickMortyContext from '../../context/RickMortyContext';

function CharacterSearch() {
  const [text, setText] = useState('');
  const { fetchCharacters } = useContext(RickMortyContext);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      fetchCharacters();
    } else {
      fetchCharacters(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <button className="btn btn--search" type="submit">
          Search!
        </button>
      </form>
    </div>
  );
}

export default CharacterSearch;
