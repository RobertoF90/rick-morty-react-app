import React from 'react';
import Characters from '../characters/CharacterResults';
import Pagination from './Pagination';

function Dashboard() {
  return (
    <div className="dashboard">
      <Characters />

      <Pagination />
    </div>
  );
}

export default Dashboard;
