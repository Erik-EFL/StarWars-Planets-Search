/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [data, setData] = useState({});
  const [filterByName, setFilterByName] = useState({});
  const [filterData, setFilterData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const filtro = filterByNumericValues
      .map(({ column, value, comparison }) => data.filter((result) => {
        if (comparison === 'maior que') {
          return Number(result[column]) > +value;
        }
        if (comparison === 'menor que') {
          return Number(result[column]) < +value;
        }
        if (comparison === 'igual a') {
          return result[column] === value;
        }
        return true;
      }));
    console.log('provider', [...filtro]);
    setFilterData([...filtro][0]);
  }, [filterByNumericValues]);

  const context = {
    data,
    setData,
    filterData,
    setFilterData,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    sort,
    setSort,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
