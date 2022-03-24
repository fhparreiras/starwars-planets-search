import React, { useContext } from 'react';
import filterContext from '../context/filterContext';

function SubFilters() {
  const { filterByNumericValues, setNumericFilters,
    subFilters, setSubFilters, options, setOptions } = useContext(filterContext);

  const { column, comparison, value } = filterByNumericValues;
  function onFilterChange(event) {
    event.persist();
    setNumericFilters((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFilterClick() {
    const optionsArray = options.concat();
    if (column === undefined || comparison === undefined || value === undefined) {
      setSubFilters(['population maior que 0']);
      const optionIndex = optionsArray.indexOf('population');
      optionsArray.splice(optionIndex, 1);
      setOptions(optionsArray);
    } else {
      setSubFilters((prevState) => (
        [...prevState, `${column} ${comparison} ${value}`]
      ));
      const optionIndex = optionsArray.indexOf(filterByNumericValues.column);
      optionsArray.splice(optionIndex, 1);
      setOptions(optionsArray);
    }
  }
  console.log('subfilters após o clique', subFilters);
  console.log(filterByNumericValues);

  function removeItem(e) {
    const newArray = subFilters.concat();
    const itemIndex = newArray.indexOf(e.target.name);
    newArray.splice(itemIndex, 1);
    setSubFilters(newArray);
    const itemBackToList = e.target.name.split(' ')[0];
    setOptions((prevState) => [...prevState, itemBackToList]);
  }

  return (
    <form className="sub-filters">
      <select
        defaultValue="population"
        onChange={ onFilterChange }
        name="column"
        data-testid="column-filter"
      >
        {options.map((op, id) => (
          <option key={ id } value={ op }>{ op }</option>
        ))}
      </select>
      <div>
        <label htmlFor="comparison">
          {'Operador: '}
          <select
            defaultValue="maior que"
            name="comparison"
            onChange={ onFilterChange }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
      </div>
      <input
        name="value"
        onChange={ onFilterChange }
        type="number"
        data-testid="value-filter"
        defaultValue="0"
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

export default SubFilters;
