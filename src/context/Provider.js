import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [data, setData] = useState({});
  const [filterData, setFilterData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [sort, setSort] = useState({});

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
