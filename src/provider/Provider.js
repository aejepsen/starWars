import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import fetchAPI from './api/fetchAPI';

function Provider({ children }) {
  const [dataResults, setDataResults] = useState([]);
  const [dataFilterResults, setDataFilteredResults] = useState([]);
  const [filterNameInput, setFilterNameInput] = useState({ filterByName: { name: '' } });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setNumberValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [selectColumns, setSelectColumns] = useState([]);
  const [sort, setSort] = useState('ASC');
  const [order, setOrder] = useState({});

  function getFetchAPI() {
    fetchAPI()
      .then((response) => {
        setDataResults(response);
      });
  }

  const handleSortByColumn = () => {
    let filteredData = dataFilterResults;
    if (order.sort === 'ASC') {
      filteredData = filteredData.sort((a, b) => a[column] - b[column]);
    } else {
      filteredData = filteredData.sort((a, b) => b[column] - a[column]);
    }
    if (order.column === 'population') {
      const newA = filteredData.filter((item) => item.population !== 'unknown');
      const newB = filteredData.filter((item) => item.population === 'unknown');
      filteredData = [...newA, ...newB];
    }
    setSort(order.sort === 'ASC' ? 'DESC' : 'ASC');
    setOrder({ sort: order.sort === 'ASC' ? 'DESC' : 'ASC', column });
    setDataFilteredResults(filteredData);
  };

  const data = {
    getFetchAPI,
    dataResults,
    setDataResults,
    filterNameInput,
    setFilterNameInput,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setNumberValue,
    filterByNumericValues,
    setFilterByNumericValues,
    selectColumns,
    setSelectColumns,
    dataFilterResults,
    setDataFilteredResults,
    sort,
    setSort,
    order,
    setOrder,
    handleSortByColumn,
  };

  return (
    <Context.Provider value={ data }>
      {children}
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
