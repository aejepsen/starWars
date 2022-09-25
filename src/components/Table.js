import React, { useEffect, useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { dataFilterResults, getFetchAPI, comparison, setComparison,
    column, setColumn, filterNameInput, setFilterNameInput,
    filterByNumericValues, setFilterByNumericValues, value,
    dataResults, setDataFilteredResults, setNumberValue,
    setOrder, setSort, handleSortByColumn } = useContext(Context);
  useEffect(() => {
    getFetchAPI();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let filteredData = dataResults;
    filteredData = filteredData.filter((item) => item.name.toLowerCase()
      .includes(filterNameInput.filterByName.name.toLowerCase()));
    setDataFilteredResults(filteredData);// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterNameInput.filterByName.name, setFilterByNumericValues, dataResults]);
  function filterPlanetByName() {
    let filteredData = dataResults;
    const filterName = filterNameInput.filterByName.name;
    filteredData = filteredData
      .filter((planet) => planet.name.toLowerCase().includes(filterName.toLowerCase()));
    setDataFilteredResults(filteredData);
  }
  const handleFilterNameInput = (e) => {
    setFilterNameInput({ filterByName: { name: e.target.value } }); filterPlanetByName();
  };
  const handleChangeColumn = (e) => { setColumn(e); };
  const handleChangeComparison = (e) => { setComparison(e); };
  const handleChangeValue = (e) => { setNumberValue(Number(e)); };
  function filteredDataResults() {
    let filtered = dataFilterResults;
    if (comparison === 'maior que') {
      filtered = filtered.filter((index) => index[column] > Number(value));
    }
    if (comparison === 'menor que') {
      filtered = filtered.filter((index) => index[column] < Number(value));
    }
    if (comparison === 'igual a') {
      filtered = filtered.filter((index) => Number(index[column]) === Number(value));
    }
    setDataFilteredResults(filtered);
  }
  useEffect(() => {
    filteredDataResults();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFilterByFilterValues = () => {
    filteredDataResults();
    setFilterByNumericValues([...filterByNumericValues,
      { column,
        comparison,
        value,
      }]);
  };
  const removeAllFilter = () => {
    setFilterByNumericValues([]); setDataFilteredResults(dataResults);
  };
  const newFilteredDataResults = (newFilterByNumericValues) => {
    let filtered = dataResults;
    newFilterByNumericValues.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filtered = filtered
          .filter((index) => index[filter.column] > Number(filter.value));
      }
      if (filter.comparison === 'menor que') {
        filtered = filtered
          .filter((index) => index[filter.column] < Number(filter.value));
      }
      if (filter.comparison === 'igual a') {
        filtered = filtered
          .filter((index) => Number(index[filter.column]) === Number(filter.value));
      }
    });
    setDataFilteredResults(filtered); setFilterByNumericValues(newFilterByNumericValues);
  };
  const removeFilterByFilterByNumericValues = (target) => {
    const newFilterByNumericValues = filterByNumericValues
      .filter((item, index) => index !== Number(target.id));
    if (newFilterByNumericValues.length === 0) {
      filterPlanetByName(); setFilterByNumericValues([]);
    } else {
      newFilteredDataResults(newFilterByNumericValues);
    }
  };
  useEffect(() => {
    removeFilterByFilterByNumericValues(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tableTopic = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created', 'edited',
    'url'];
  const selectColumns = ['population',
    'rotation_period', 'diameter', 'orbital_period', 'surface_water'];
  const selectComparison = ['maior que', 'menor que', 'igual a'];
  useEffect(() => {
    handleSortByColumn();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Star Wars API</h1>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          value={ filterNameInput.filterByName.name }
          onChange={ handleFilterNameInput }
        />
        <select
          data-testid="column-filter"
          id={ filterByNumericValues.column }
          onChange={ ({ target }) => handleChangeColumn(target.value) }
        >
          { selectColumns
            .filter((item) => !filterByNumericValues.find((i) => i.column === item))
            .map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>)) }
        </select>
        <select
          data-testid="comparison-filter"
          id={ filterByNumericValues.comparison }
          onChange={ ({ target }) => handleChangeComparison(target.value) }
        >
          { selectComparison.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          )) }
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ value }
          onChange={ ({ target }) => handleChangeValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterByFilterValues }
        >
          Filtrar
        </button>
        <section>
          { filterByNumericValues.map((item, index) => (
            <div data-testid="filter" key={ index }>
              <span>{ item.column }</span>
              <span>{ item.comparison }</span>
              <span>{ item.value }</span>
              <button
                type="button"
                name={ item.column }
                id={ index }
                onClick={ ({ target }) => removeFilterByFilterByNumericValues(target) }
              >
                X
              </button>
            </div>
          )) }
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilter }
          >
            button-remove-filters
          </button>
        </section>
        <select
          data-testid="column-sort"
          id={ column }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          { selectColumns.map((item, index) => (
            <option key={ index } value={ item }>{ item }</option>
          )) }
        </select>
        <label htmlFor="column-sort-input-asc">
          <input
            data-testid="column-sort-input-asc"
            id="ASC"
            type="radio"
            name="select"
            value="ASC"
            onChange={ () => { setSort('ASC'); setOrder({ column, sort: 'ASC' }); } }
          />
          Ascendente
        </label>
        <label htmlFor="column-sort-input-desc">
          <input
            data-testid="column-sort-input-desc"
            id="DESC"
            type="radio"
            name="select"
            value="DESC"
            onChange={ () => { setSort('DESC'); setOrder({ column, sort: 'DESC' }); } }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSortByColumn }
        >
          Ordenar
        </button>
        <table className="estiloBordas">
          <thead>
            <tr>
              {tableTopic.map((topic) => <th key={ topic }>{topic}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              dataFilterResults
                .map((planet, index) => (
                  <tr key={ index }>
                    <td data-testid="planet-name">{planet.name}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.gravity}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.surface_water}</td>
                    <td>{planet.population}</td>
                    <td>{planet.films}</td>
                    <td>{planet.created}</td>
                    <td>{planet.edited}</td>
                    <td><a href={ planet.url }>{planet.url}</a></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </form>
    </>
  );
}

export default Table;
