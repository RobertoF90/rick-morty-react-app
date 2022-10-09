import React from 'react';
import { useEffect, useContext } from 'react';
import CharacterItem from './CharacterItem';
import CharacterModal from '../CharacterModal';
import RickMortyContext from '../../context/RickMortyContext';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function Characters() {
  const { characters, loading, fetchCharacters, openModal } =
    useContext(RickMortyContext);

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (!loading) {
    return (
      <div className="characters">
        {characters.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}
            handleDetail={() => openModal(character.id)}
          />
        ))}
        <CharacterModal />
      </div>
    );
  } else {
    return <h3 className="lds-dual-ring"></h3>;
  }
}

export default Characters;
