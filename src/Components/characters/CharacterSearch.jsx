import React from 'react';
import { useState, useContext } from 'react';
import RickMortyContext from '../../context/RickMortyContext';

function CharacterSearch() {
  const [text, setText] = useState('');
  const { characters, fetchCharacters } = useContext(RickMortyContext);

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
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={handleChange} />
          <button type="submit">Search!</button>
        </form>
      </div>
    </div>
  );
}

export default CharacterSearch;
