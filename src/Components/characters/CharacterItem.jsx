import React from 'react';
import PropTypes from 'prop-types';

function CharacterItem({ character: { name, image }, handleDetail }) {
  return (
    <div className="character" onClick={handleDetail}>
      <div className="character__img">
        <img src={image} />
      </div>
      <div className="character__name">{name}</div>
    </div>
  );
}

CharacterItem.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterItem;
