import React from 'react';
import './App.css';
import logo from './Star_Wars-Logo.svg';
import Table from './components/Table';
import FilterProvider from './context/FilterProvider';
import MainFilter from './components/MainFilter';

function App() {
  return (
    <FilterProvider>
      <h1>
        <img src={ logo } alt="logo-star-wars" />
      </h1>
      <MainFilter />
      <Table />
    </FilterProvider>
  );
}

export default App;
