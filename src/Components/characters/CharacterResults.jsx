import React from 'react';
import { useEffect, useState, useContext } from 'react';
import CharacterItem from './CharacterItem';
import RickMortyContext from '../../context/RickMortyContext';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

function Characters() {
  const { characters, loading, fetchCharacters } = useContext(RickMortyContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [characterDetail, setCharacterDetail] = useState();

  // Open / Close modal
  const openModal = (id) => {
    const [filteredCharacter] = characters.filter(
      (character) => character.id === id
    );

    setCharacterDetail(filteredCharacter);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

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
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {characterDetail && (
            <ul>
              <li>Name:{characterDetail.name}</li>
              <li>Status:{characterDetail.status}</li>
              <li>Species:{characterDetail.species}</li>
              <li>Gender:{characterDetail.gender}</li>
              <li>Origin:{characterDetail.origin.name}</li>
              <li>Location:{characterDetail.location.name}</li>
            </ul>
          )}
        </Modal>
      </div>
    );
  } else {
    return <h3 className="lds-dual-ring"></h3>;
  }
}

export default Characters;
