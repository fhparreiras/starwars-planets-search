import React, { useContext } from 'react';
import filterContext from '../context/filterContext';

function MainFilter() {
  const { filterByNumericValues, setNumericFilters,
    subFilters, setSubFilters } = useContext(filterContext);

  const { column, comparison, value } = filterByNumericValues;
  function onFilterChange(event) {
    event.persist();
    setNumericFilters((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFilterClick() {
    setSubFilters((prevState) => (
      [...prevState, `${column} ${comparison} ${value}`]
    ));
  }
  console.log('subfilters após o clique', subFilters);

  function removeItem(e) {
    const newArray = subFilters.concat();
    const itemIndex = newArray.indexOf(e.target.name);
    newArray.splice(itemIndex, 1);
    setSubFilters(newArray);
    console.log('Subfilters após o splice:', newArray, 'subfilters antigo ', subFilters);
  }

  return (
    <form className="sub-filters">
      <select
        aria-invalid="false"
        onChange={ onFilterChange }
        name="column"
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <div>
        <label htmlFor="comparison">
          {'Operador: '}
          <select
            name="comparison"
            onChange={ onFilterChange }
            data-testid="comparison-filter"
          >
            <option value="menor que">menor que</option>
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
      </div>
      <input
        name="value"
        onChange={ onFilterChange }
        type="number"
        data-testid="value-filter"
      />
      <button
        data-testid="button-filter"
        onClick={ handleFilterClick }
        type="button"
      >
        Filter
      </button>
      <div data-testid="filter">
        <br />
        Filtros selecionados:
        {subFilters.length > 0 && subFilters.map((filter, id) => (
          <div key={ id }>
            {filter}
            <button name={ filter } onClick={ removeItem } type="button">X</button>
          </div>
        ))}
      </div>
    </form>
  );
}

export default MainFilter;
