import React from 'react';
import { useState, useContext } from 'react';
import RickMortyContext from '../../context/RickMortyContext';
import CharacterItem from '../characters/CharacterItem';
import CharacterModal from '../CharacterModal';

function Bookmark() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { bookmarks, openModal } = useContext(RickMortyContext);

  return (
    <div>
      <button className="btn" onClick={() => setShowBookmarks(!showBookmarks)}>
        Bookmarks
      </button>

      <div className="bookmarks">
        {showBookmarks &&
          bookmarks.map((character) => (
            <CharacterItem
              key={character.id}
              character={character}
              handleDetail={() => openModal(character.id)}
            />
          ))}
      </div>
      <CharacterModal />
    </div>
  );
}

export default Bookmark;
