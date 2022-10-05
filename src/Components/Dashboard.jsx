import React from 'react';
import Characters from './characters/CharacterResults';
import Pagination from './layout/Pagination';

function Dashboard() {
  return (
    <div>
      <Characters />

      <Pagination />
    </div>
  );
}

export default Dashboard;
