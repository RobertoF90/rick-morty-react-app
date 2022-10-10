import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import RickMortyContext from '../../context/RickMortyContext';

const customStyles = {
  content: {
    width: '60rem',
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
            <div className="modal">
              <div>
                <ul className="detail">
                  <img className="detail__img" src={characterDetail.image} />
                  <li className="detail__name">{characterDetail.name}</li>
                  <li>Status: {characterDetail.status}</li>
                  <li>Species: {characterDetail.species}</li>
                  <li>Gender: {characterDetail.gender}</li>
                  <li>Origin: {characterDetail.origin.name}</li>
                  <li>Location: {characterDetail.location.name}</li>
                </ul>

                <button
                  className="btn detail__btn"
                  onClick={() => {
                    setBookmark(characterDetail.id);
                  }}
                >
                  {bookmarks.includes(characterDetail) ? (
                    <p>REMOVE BOOKMARK</p>
                  ) : (
                    <p>ADD BOOKMARK </p>
                  )}
                </button>
              </div>

              <ul className="modal__episodes">
                <p>Appears in: </p>
                {episodes.length > 0 ? (
                  episodes.map((ep) => (
                    <li className="episode" key={ep.id}>
                      <p className="episode__name">
                        Episode: {ep.id} - {ep.name}
                      </p>
                      <p>{ep.air_date}</p>
                    </li>
                  ))
                ) : (
                  <li className="episode" key={episodes.id}>
                    <p className="episode__name">
                      Episode: {episodes.id} - {episodes.name}
                    </p>
                    <p>{episodes.air_date}</p>
                  </li>
                )}
              </ul>
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
