import React from 'react';
import './App.css';
import logo from './Star_Wars-Logo.svg';
// import getPlanets from './services/getPlanetsAPI';
import Table from './components/Table';
import FilterProvider from './context/FilterProvider';

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getPlanets();
  //     setData(response);
  //   }
  //   fetchData();
  // }, []);

  return (
    <FilterProvider>
      <h1>
        <img src={ logo } alt="logo-star-wars" />
      </h1>
      <Table />
    </FilterProvider>
  );
}

export default App;
