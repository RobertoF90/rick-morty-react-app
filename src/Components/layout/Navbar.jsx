import React from 'react';
import CharacterSearch from '../characters/CharacterSearch';
import Bookmark from '../bookmarks/Bookmark';

function Navbar() {
  return (
    <div className="navbar">
      <h1>Rick & Morty Search APP</h1>
      <CharacterSearch />
      <Bookmark />
    </div>
  );
}

export default Navbar;
