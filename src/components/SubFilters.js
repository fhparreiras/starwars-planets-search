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
      <label htmlFor="column">
        Coluna:
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
      </label>
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
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          onChange={ onFilterChange }
          type="number"
          data-testid="value-filter"
          defaultValue="0"
        />
      </label>
      <button
        className="sub-filters-button"
        data-testid="button-filter"
        onClick={ handleFilterClick }
        type="button"
      >
        Filter
      </button>
      <div className="selected-filters">
        {subFilters.length > 0 && 'Filtros selecionados:'}
        {' '}
        {subFilters.length > 0 && subFilters.map((filter, id) => (
          <div
            key={ id }
            data-testid="filter"
          >
            {filter}
            {' '}
            <button
              name={ filter }
              className="btn-x"
              onClick={ removeItem }
              type="button"
            >
              X
            </button>
          </div>
        ))}
        { subFilters.length > 0 && (
          <button
            className="remove-all"
            data-testid="button-remove-filters"
            onClick={ () => {
              setSubFilters([]);
              setOptions(['population', 'orbital_period', 'diameter',
                'rotation_period', 'surface_water',
              ]);
            } }
            type="button"
          >
            Remover todas filtragens
          </button>
        )}
      </div>
    </form>
  );
}

export default SubFilters;
