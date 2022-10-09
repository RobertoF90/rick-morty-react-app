import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import RickMortyContext from '../context/RickMortyContext';

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
  const {
    modalLoading,
    modalIsOpen,
    closeModal,
    characterDetail,
    episodes,
    bookmarks,
    setBookmark,
  } = useContext(RickMortyContext);

  if (!modalLoading) {
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

              <ul>
                {episodes.length > 0 ? (
                  episodes.map((ep) => (
                    <li key={ep.id}>
                      <p>{ep.id}</p>
                      <p>{ep.name}</p>
                      <p>{ep.air_date}</p>
                    </li>
                  ))
                ) : (
                  <li key={episodes.id}>
                    <p>{episodes.id}</p>
                    <p>{episodes.name}</p>
                    <p>{episodes.air_date}</p>
                  </li>
                )}
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
  } else {
    return <h3 className="lds-dual-ring"></h3>;
  }
}

export default CharacterModal;
