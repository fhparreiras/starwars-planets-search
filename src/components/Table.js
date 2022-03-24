import React, { useContext } from 'react';
import filterContext from '../context/filterContext';
import FilterProvider from '../context/FilterProvider';

function Table() {
  const { data, filterByName, subFilters } = useContext(filterContext);
  const filteredName = filterByName.name.toLowerCase();
  let filteredTable = data.filter((e) => e.name.toLowerCase().includes(filteredName));

  // function handleFilters() {
  if (subFilters.length > 0) {
    subFilters.forEach((subFilter) => {
      const column = subFilter.split(' ')[0];
      const comparison = subFilter.split(' ')[1];
      const value = subFilter.split(' ')[3];
      // console.log('column: ', column, 'comparison: ', comparison, 'value: ', value);
      filteredTable = filteredTable.filter((filter) => {
        if (comparison === 'maior') {
          return filter[column] > Number(value);
        }
        if (comparison === 'menor') {
          return filter[column] < Number(value);
        }
        return Number(filter[column] === value);
      });
    });
  }
  // }

  return (
    <FilterProvider value={ { filterByName } }>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          {/* data.filter((e) => e.name.toLowerCase().includes(filteredName)) */}
          {filteredTable
            .map((el, index) => (
              <tr key={ index }>
                <td>{ el.name }</td>
                <td>{ el.rotation_period}</td>
                <td>{ el.orbital_period}</td>
                <td>{ el.diameter}</td>
                <td>{ el.climate}</td>
                <td>{ el.gravity}</td>
                <td>{ el.terrain}</td>
                <td>{ el.surface_water}</td>
                <td>{ el.population}</td>
                <td>{ el.films}</td>
                <td>{ el.created}</td>
                <td>{ el.edited}</td>
                <td>{ el.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </FilterProvider>
  );
}

export default Table;
