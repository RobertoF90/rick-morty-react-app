import React from 'react';
import './css/app.css';
import './css/queries.css';

import Dashboard from './Components/layout/Dashboard';
import Navbar from './Components/layout/Navbar';
import { RickMortyProvider } from './context/RickMortyContext';

function App() {
  return (
    <RickMortyProvider>
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    </RickMortyProvider>
  );
}

export default App;
