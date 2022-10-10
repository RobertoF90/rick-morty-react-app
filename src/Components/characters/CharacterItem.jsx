import React from 'react';

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

export default CharacterItem;
