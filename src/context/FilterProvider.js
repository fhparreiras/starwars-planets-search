import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/getPlanetsAPI';
import filterContext from './filterContext';

function FilterProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues,
    setNumericFilters] = useState([{
    column: '', comparison: '', value: '' }]);
  const [subFilters, setSubFilters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getPlanets();
      setData(response);
    }
    fetchData();
  }, []);

  return (
    <filterContext.Provider
      value={ { data,
        setData,
        filterByName,
        setFilterByName,
        filterByNumericValues,
        setNumericFilters,
        subFilters,
        setSubFilters } }
    >
      { children }
    </filterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
