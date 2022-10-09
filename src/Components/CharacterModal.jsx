import React, { useContext } from 'react';
import Modal from 'react-modal';
import RickMortyContext from '../context/RickMortyContext';
import Characters from './characters/CharacterResults';

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

function CharacterModal() {
  const { modalIsOpen, closeModal, characterDetail, bookmarks, setBookmark } =
    useContext(RickMortyContext);

  console.log(characterDetail);

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {characterDetail && (
          <div>
            <ul>
              <li>Name:{characterDetail.name}</li>
              <li>Status:{characterDetail.status}</li>
              <li>Species:{characterDetail.species}</li>
              <li>Gender:{characterDetail.gender}</li>
              <li>Origin:{characterDetail.origin.name}</li>
              <li>Location:{characterDetail.location.name}</li>
            </ul>

            <button
              onClick={() => {
                setBookmark(characterDetail.id);
              }}
            >
              {bookmarks.includes(characterDetail) ? (
                <p>REMOVE</p>
              ) : (
                <p>ADD </p>
              )}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default CharacterModal;
