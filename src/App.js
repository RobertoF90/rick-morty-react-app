import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
