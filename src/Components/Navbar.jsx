import React from 'react';
import CharacterSearch from './characters/CharacterSearch';

function Navbar() {
  return (
    <div className="header">
      <h1>Rick & Morty Search APP</h1>
      <CharacterSearch />
      <div>Favorite</div>
    </div>
  );
}

export default Navbar;
