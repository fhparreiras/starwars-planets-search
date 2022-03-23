import React, { useContext } from 'react';
import filterContext from '../context/filterContext';

function MainFilter() {
  const { setFilterByName } = useContext(filterContext);

  function handleChanges(event) {
    setFilterByName({ [event.target.name]: event.target.value });
  }

  // console.log(filterByName.name);

  return (
    <form className="main-filter">
      <label htmlFor="name">
        { 'Filter by name: ' }
        <input
          data-testid="name-filter"
          name="name"
          type="text"
          onChange={ handleChanges }
        />
      </label>
    </form>
  );
}

export default MainFilter;
