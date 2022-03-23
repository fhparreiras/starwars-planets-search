import React from 'react';
import './App.css';
import logo from './Star_Wars-Logo.svg';
import FilterContext from './context/FilterContext';

function App() {
  const INITIAL_STATE = {
    data: [],
  };

  return (
    <FilterContext.Provider value={ INITIAL_STATE }>
      <h1>
        <img src={ logo } alt="logo-star-wars" />
      </h1>
    </FilterContext.Provider>
  );
}

export default App;
